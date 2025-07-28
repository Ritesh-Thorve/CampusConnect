import prisma from '../config/db.js';
import { uploadFile } from '../utils/upload.js';
import Joi from 'joi';
import { validate } from '../utils/validator.js';

const profileSchema = Joi.object({
  fullName: Joi.string().required(),
  collegeName: Joi.string().required(),
  collegeAddress: Joi.string().required(),
  fieldOfStudy: Joi.string().required(),
  graduationYear: Joi.number().integer().required(),
  bio: Joi.string().optional(),
  linkedIn: Joi.string().uri().optional(),
  twitter: Joi.string().uri().optional(),
  github: Joi.string().uri().optional()
});

export const createOrUpdateProfile = async (req, res, next) => {
  try {
    validate(profileSchema, req.body);
    const userId = req.user.userId;

    let profileImg, collegeImage, collegeIdCard;

    if (req.files?.profileImg) {
      profileImg = await uploadFile('profile-images', req.files.profileImg[0]);
    }
    if (req.files?.collegeImage) {
      collegeImage = await uploadFile('college-images', req.files.collegeImage[0]);
    }
    if (req.files?.collegeIdCard) {
      collegeIdCard = await uploadFile('id-cards', req.files.collegeIdCard[0]);
    }

    const profileData = {
      ...req.body,
      profileImg,
      collegeImage,
      collegeIdCard
    };

    const profile = await prisma.profile.upsert({
      where: { userId },
      update: profileData,
      create: { userId, ...profileData }
    });

    res.json({ message: 'Profile saved successfully', profile });
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const profile = await prisma.profile.findUnique({ where: { userId } });
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    next(err);
  }
};