import prisma from "../config/db.js";
import { uploadFile } from "../utils/upload.js";
import Joi from "joi";
import { validate } from "../utils/validator.js";

// Profile Validation Schema using Joi

const profileSchema = Joi.object({
  fullName: Joi.string().required(),
  collegeName: Joi.string().required(),
  collegeAddress: Joi.string().required(),
  fieldOfStudy: Joi.string().required(),
  graduationYear: Joi.number().integer().min(2000).max(2100).required(),
  bio: Joi.string().max(300).optional(),
  linkedIn: Joi.string().uri().optional(),
  twitter: Joi.string().uri().optional(),
  github: Joi.string().uri().optional()
});

/**
 * @desc Create or update user profile
 * @route POST /profile
 * @access Private (JWT Required)
 */

export const createOrUpdateProfile = async (req, res) => {
  try {
    // Validate incoming request body
    validate(profileSchema, req.body);

    const userId = req.user.userId;
    const uploadedFiles = {};

    //  Upload images if provided
    if (req.files?.profileImg) {
      uploadedFiles.profileImg = await uploadFile(
        "profile-images",
        req.files.profileImg[0]
      );
    }
    if (req.files?.collegeImage) {
      uploadedFiles.collegeImage = await uploadFile(
        "college-images",
        req.files.collegeImage[0]
      );
    }
    if (req.files?.collegeIdCard) {
      uploadedFiles.collegeIdCard = await uploadFile(
        "id-cards",
        req.files.collegeIdCard[0]
      );
    }

    //  Merge body data with uploaded file URLs
    const profileData = {
      ...req.body,
      ...uploadedFiles
    };

    //  Upsert profile: Update if exists, else create
    const profile = await prisma.profile.upsert({
      where: { userId },
      update: profileData,
      create: { userId, ...profileData }
    });

    return res.json({
      message: "Profile saved successfully",
      profile
    });
  } catch (err) {
    console.error("Error in createOrUpdateProfile:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * @desc Get user profile
 * @route GET /profile
 * @access Private (JWT Required)
 */
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const profile = await prisma.profile.findUnique({
      where: { userId },
      include: {
        user: { select: { fullname: true, email: true } } // Include basic user info
      }
    });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    return res.json(profile);
  } catch (err) {
    console.error("Error in getProfile:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
