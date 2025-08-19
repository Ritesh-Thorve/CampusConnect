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
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const [trends, total] = await Promise.all([
      prisma.trend.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.trend.count(),
    ]);

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      trends,
    });
  } catch (err) {
    next(err);
  }
};



