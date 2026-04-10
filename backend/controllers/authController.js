import { supabase, supabaseAdmin } from "../config/supabase.js";
import prisma from "../config/db.js";
import { validate } from "../utils/validator.js";
import { generateToken } from "../utils/jwt.js";
import Joi from "joi";

// Joi Schemas 

const signupSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

//  Sign Up 

export const signUp = async (req, res, next) => {
  try {
    validate(signupSchema, req.body);
    const { fullname, email, password } = req.body;

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error || !data?.user) {
      return res.status(400).json({ error: error?.message || "Signup failed" });
    }

    const user = await prisma.user.create({
      data: {
        fullname,
        email,
        provider: "local",
        supabaseId: data.user.id,
      },
    });

    const token = generateToken(user.id);
    return res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
        provider: user.provider,
      },
    });
  } catch (err) {
    console.error("SignUp Error:", err);
    next(err);
  }
};

//  Login 

export const login = async (req, res, next) => {
  try {
    validate(loginSchema, req.body);
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data?.session) {
      return res.status(400).json({ error: error?.message || "Login failed" });
    }

    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          fullname: "User",
          email,
          provider: "local",
          supabaseId: data.user.id,
        },
      });
    }

    const token = generateToken(user.id);
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
        provider: user.provider,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
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

    // Step 1: Verify token with Supabase Admin
    const { data: userData, error } = await supabaseAdmin.auth.getUser(access_token);
    if (error || !userData?.user) {
      console.error("Supabase token verification failed:", error?.message);
      return res.status(401).json({ error: "Invalid or expired access token" });
    }

    const { email, user_metadata, id: supabaseId } = userData.user;

    // Step 2: Email guard
    if (!email) {
      return res.status(400).json({ error: "Email not found in Google account" });
    }

    const fullname = user_metadata?.full_name || "Google User";
    const avatar = user_metadata?.avatar_url || null;

    // Step 3: Check if new user
    const existingUser = await prisma.user.findUnique({ where: { email } });

    // Step 4: Upsert user
    const user = await prisma.user.upsert({
      where: { email },
      update: { fullname, provider: "google", supabaseId, avatar },
      create: { email, fullname, provider: "google", supabaseId, avatar },
    });

    // Step 5: Generate JWT
    const token = generateToken(user.id);

    return res.status(existingUser ? 200 : 201).json({
      message: "Google OAuth successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
        provider: user.provider,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    // Log full error (not just message) to catch Prisma/schema issues
    console.error("Google Auth Error:", err);
    next(err);
  }
};