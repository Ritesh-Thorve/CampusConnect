import { supabase } from '../config/supabase.js';
import jwt from 'jsonwebtoken';
import { validate } from '../utils/validator.js';
import Joi from 'joi';

const authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const signUp = async (req, res, next) => {
  try {
    validate(authSchema, req.body);
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: 'Signup successful', user: data.user });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    validate(authSchema, req.body);
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return res.status(400).json({ error: error.message });

    const token = generateToken(data.user.id);
    res.json({ message: 'Login successful', token, user: data.user });
  } catch (err) {
    next(err);
  }
};