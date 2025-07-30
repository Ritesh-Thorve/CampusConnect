import { supabase } from "../config/supabase.js";
import prisma from "../config/db.js";
import { validate } from "../utils/validator.js";
import { generateToken } from "../utils/jwt.js"
import Joi from "joi";

// Schemas
const signupSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

// Sign up with email/password
export const signUp = async (req, res, next) => {
  try {
    validate(signupSchema, req.body);
    const { fullname, email, password } = req.body;

    // Create user in Supabase
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return res.status(400).json({ error: error.message });

    // Sync with Prisma
    let user = await prisma.user.create({
      data: { fullname, email, provider: "local" }
    });

    const token = generateToken(user.id);
    res.json({ message: "Signup successful", token, user });
  } catch (err) {
    next(err);
  }
};

// Login with email/password
export const login = async (req, res, next) => {
  try {
    validate(loginSchema, req.body);
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return res.status(400).json({ error: error.message });

    // Get user from Prisma
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: { fullname: "User", email, provider: "local" }
      });
    }

    const token = generateToken(user.id);
    res.json({ message: "Login successful", token, user });
  } catch (err) {
    next(err);
  }
};

// Google user sync after OAuth login
export const syncGoogleUser = async (req, res) => {
  try {
    const { token } = req.body; // Supabase access token
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) return res.status(401).json({ error: "Invalid token" });

    let existingUser = await prisma.user.findUnique({ where: { email: user.email } });
    if (!existingUser) {
      existingUser = await prisma.user.create({
        data: {
          fullname: user.user_metadata.full_name || "Google User",
          email: user.email,
          googleId: user.id,
          provider: "google"
        }
      });
    }

    const appToken = generateToken(existingUser.id);
    res.json({ message: "Google user synced", token: appToken, user: existingUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
