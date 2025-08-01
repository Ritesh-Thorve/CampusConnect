import prisma from "../config/db.js";
import { uploadFile } from "../utils/upload.js";
import Joi from "joi";
import { validate } from "../utils/validator.js";

// Joi Schema for Profile Validation
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

// Create or Update Profile
export const createOrUpdateProfile = async (req, res) => {
  try {
    // Validate request body
    validate(profileSchema, req.body);

    const userId = req.user.userId;
    const uploadedFiles = {};

    // Handle file uploads in parallel
    const fileUploads= [];

    if (req.files?.profileImg) {
      uploadTasks.push(
        uploadFile("profile-images", req.files.profileImg[0])
          .then(url => uploadedFiles.profileImg = url)
      );
    }

    if (req.files?.collegeImage) {
      uploadTasks.push(
        uploadFile("college-images", req.files.collegeImage[0])
          .then(url => uploadedFiles.collegeImage = url)
      );
    }

    if (req.files?.collegeIdCard) {
      uploadTasks.push(
        uploadFile("id-cards", req.files.collegeIdCard[0])
          .then(url => uploadedFiles.collegeIdCard = url)
      );
    }

    await Promise.all(uploadTasks);

    const profileData = { ...req.body, ...uploadedFiles };

    // Upsert profile (Create if not exists, else update)
    const profile = await prisma.profile.upsert({
      where: { userId },
      update: profileData,
      create: { userId, ...profileData }
    });

    return res.json({ message: "Profile saved successfully", profile });
  } catch (error) {
    console.error("Error in createOrUpdateProfile:", error);
    return res.status(500).json({ error: "Unable to save profile" });
  }
};

//Get Single User Profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const profile = await prisma.profile.findUnique({
      where: { userId },
      include: {
        user: { select: { fullname: true, email: true } }
      }
    });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    return res.json(profile);
  } catch (error) {
    console.error("Error in getProfile:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// All Profiles (With Filters & Pagination)
export const getAllProfiles = async (req, res) => {
  try {
    const {
      collegeName,
      graduationYear,
      page = 1,
      limit = 10
    } = req.query;

    const skip = (page - 1) * limit;

    const profiles = await prisma.profile.findMany({
      where: {
        ...(collegeName && { collegeName }),
        ...(graduationYear && { graduationYear: parseInt(graduationYear) })
      },
      include: {
        user: { select: { fullname: true, email: true } }
      },
      orderBy: { createdAt: "desc" },
      skip: parseInt(skip),
      take: parseInt(limit)
    });

    return res.json({
      count: profiles.length,
      profiles
    });
  } catch (error) {
    console.error("Error in getAllProfiles:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
