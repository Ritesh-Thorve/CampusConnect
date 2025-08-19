import { supabase, supabaseAdmin } from "../config/supabase.js";
import prisma from "../config/db.js";
import { validate } from "../utils/validator.js";
import { generateToken } from "../utils/jwt.js";
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

// Sign Up
export const signUp = async (req, res, next) => {
  try {
    validate(signupSchema, req.body);
    const { fullname, email, password } = req.body;

    // Create user in Supabase
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error || !data.user) {
      return res.status(400).json({ error: error?.message || "Signup failed" });
    }

    // Save user in Prisma with supabaseId
    const user = await prisma.user.create({
      data: {
        fullname,
        email,
        provider: "local",
        supabaseId: data.user.id
      }
    });

    // Generate custom JWT
    const token = generateToken(user.id);

    res.json({
      message: "Signup successful",
      token,
      user
    });
  } catch (err) {
    next(err);
  }
};

// Login
export const login = async (req, res, next) => {
  try {
    validate(loginSchema, req.body);
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.session) {
      return res.status(400).json({ error: error?.message || "Login failed" });
    }

    // Check if user exists in Prisma, if not create
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          fullname: "User",
          email,
          provider: "local",
          supabaseId: data.user.id
        }
      });
    }

    // Generate custom JWT
    const token = generateToken(user.id);

    res.json({
      message: "Login successful",
      token,
      user
    });
  } catch (err) {
    next(err);
  }
};

// Google OAuth Sync
export const googleAuth = async (req, res, next) => {
  try {
    const schema = Joi.object({
      access_token: Joi.string().required(),
    });
    validate(schema, req.body);

    const { access_token } = req.body;

    // Verify token with Supabase (service role client required)
    const { data: userData, error } = await supabaseAdmin.auth.getUser(access_token);
    if (error || !userData?.user) {
      return res.status(401).json({ error: "Invalid or expired access token" });
    }

    const { email, user_metadata, id: supabaseId } = userData.user;
    const fullname = user_metadata?.full_name || "Google User";

    // Upsert user in Prisma
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          fullname,
          provider: "google",
          supabaseId,
        },
      });
    } else {
      user = await prisma.user.update({
        where: { email },
        data: {
          fullname,
          provider: "google",
          supabaseId,
        },
      });
    }

    const token = generateToken(user.id);

    res.json({
      message: "Google OAuth successful",
      user,
      token,
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({ error: error.message || "Google login failed" });
  }
};



