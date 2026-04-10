import { supabase, supabaseAdmin } from "../config/supabase.js";
import prisma from "../config/db.js";
import { validate } from "../utils/validator.js";
import { generateToken } from "../utils/jwt.js";
import Joi from "joi";

// Joi Schemas
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
    if (error || !data?.user) {
      return res.status(400).json({ error: error?.message || "Signup failed" });
    }

    // Save in Prisma
    const user = await prisma.user.create({
      data: {
        fullname,
        email,
        provider: "local",
        supabaseId: data.user.id
      }
    });

    // Generate JWT
    const token = generateToken(user.id);

    return res.json({
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

    // Authenticate with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data?.session) {
      return res.status(400).json({ error: error?.message || "Login failed" });
    }

    // Find or create user in Prisma
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

    const token = generateToken(user.id);

    return res.json({
      message: "Login successful",
      token,
      user
    });
  } catch (err) {
    next(err);
  }
};

// Google OAuth
export const googleAuth = async (req, res, next) => {
  try {
    const schema = Joi.object({
      access_token: Joi.string().required(),
    });
    validate(schema, req.body);

    const { access_token } = req.body;

    // Verify token with Supabase
    const { data: userData, error } = await supabaseAdmin.auth.getUser(access_token);
    if (error || !userData?.user) {
      return res.status(401).json({ error: "Invalid or expired access token" });
    }

    const { email, user_metadata, id: supabaseId } = userData.user;

    // Guard: email must exist
    if (!email) {
      return res.status(400).json({ error: "Email not found in Google account" });
    }

    const fullname = user_metadata?.full_name || "Google User";
    const avatar = user_metadata?.avatar_url || null;

    // Check if user is new
    const existingUser = await prisma.user.findUnique({ where: { email } });

    // Upsert into Prisma
    const user = await prisma.user.upsert({
      where: { email },
      update: { fullname, provider: "google", supabaseId, avatar },
      create: { email, fullname, provider: "google", supabaseId, avatar }
    });

    const token = generateToken(user.id);

    return res.status(existingUser ? 200 : 201).json({
      message: "Google OAuth successful",
      user: {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
        provider: user.provider,
        avatar: user.avatar,
      },
      token
    });

  } catch (err) {
    console.error("Google Auth Error:", err.message);
    next(err);
  }
};