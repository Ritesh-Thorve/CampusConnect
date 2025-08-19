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
    if (!req.user?.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    validate(updateSchema, req.body);
    const userId = req.user.userId;

    const update = await prisma.update.create({
      data: {
        ...req.body,
        userId
      }
    });

    res.status(201).json({ message: 'Update created successfully', update });
  } catch (err) {
    next(err);
  }
};

// Get all updates (with pagination)
export const getAllUpdates = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const [updates, total] = await Promise.all([
      prisma.update.findMany({
        skip,
        take: limit,
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
      }),
      prisma.update.count()
    ]);

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      updates
    });
  } catch (err) {
    next(err);
  }
};

// Get a single update by ID
export const getUpdateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = await prisma.update.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            fullname: true,
            email: true
          }
        }
      }
    });

    if (!update) {
      return res.status(404).json({ error: "Update not found" });
    }

    res.json(update);
  } catch (err) {
    next(err);
  }
};
