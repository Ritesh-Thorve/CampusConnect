import prisma from '../config/db.js';
import Joi from 'joi';
import { validate } from '../utils/validator.js';

const updateSchema = Joi.object({
  title: Joi.string().required(),
  type: Joi.string().required(),
  details: Joi.string().required(),
  link: Joi.string().uri().optional()
});

export const createUpdate = async (req, res, next) => {
  try {
    validate(updateSchema, req.body);
    const update = await prisma.update.create({ data: req.body });
    res.json({ message: 'Update created', update });
  } catch (err) {
    next(err);
  }
};

export const getUpdates = async (req, res, next) => {
  try {
    const updates = await prisma.update.findMany();
    res.json(updates);
  } catch (err) {
    next(err);
  }
};

export const deleteUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.update.delete({ where: { id } });
    res.json({ message: 'Update deleted' });
  } catch (err) {
    next(err);
  }
};