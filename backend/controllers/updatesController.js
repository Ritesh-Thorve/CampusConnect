import prisma from '../config/db.js';
import Joi from 'joi';
import { validate } from '../utils/validator.js';

// Joi schema for validation
const updateSchema = Joi.object({
  title: Joi.string().required(),
  type: Joi.string().required(),
  details: Joi.string().required(),
  link: Joi.string().uri().optional()
});

// Create an update (linked to user)
export const createUpdate = async (req, res, next) => {
  try {
    validate(updateSchema, req.body);
    const userId = req.user.userId;

    const update = await prisma.update.create({
      data: {
        ...req.body,
        userId
      }
    });

    res.status(201).json({ message: 'Update created', update });
  } catch (err) {
    next(err);
  }
};

// Get all updates
export const getAllUpdates = async (req, res, next) => {
  try {
    const updates = await prisma.update.findMany({
      include: {
        user: {
          select: {
            fullname: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({
      count: updates.length,
      updates
    });
  } catch (err) {
    next(err);
  }
};

