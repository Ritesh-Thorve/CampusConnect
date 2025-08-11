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

// Get updates created by the logged-in user
export const getUserUpdates = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const updates = await prisma.update.findMany({
      where: { userId },
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

// Delete an update (only by the creator)
export const deleteUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Ensure the update belongs to the logged-in user
    const update = await prisma.update.findUnique({ where: { id } });

    if (!update) {
      return res.status(404).json({ message: 'Update not found' });
    }

    if (update.userId !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this update' });
    }

    await prisma.update.delete({ where: { id } });

    res.json({ message: 'Update deleted successfully' });
  } catch (err) {
    next(err);
  }
};
