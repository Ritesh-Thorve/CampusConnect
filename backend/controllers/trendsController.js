import prisma from '../config/db.js';
import Joi from 'joi';
import { validate } from '../utils/validator.js';

const trendSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  tag: Joi.string().required()
});

export const createTrend = async (req, res, next) => {
  try {
    validate(trendSchema, req.body);
    const trend = await prisma.trend.create({ data: req.body });
    res.json({ message: 'Trend created', trend });
  } catch (err) {
    next(err);
  }
};

export const getTrends = async (req, res, next) => {
  try {
    const trends = await prisma.trend.findMany();
    res.json(trends);
  } catch (err) {
    next(err);
  }
};
