import prisma from "../config/db.js";
import { uploadFile } from "../utils/upload.js";
import Joi from "joi";
import { validate } from "../utils/validator.js";

// Joi Schema
const profileSchema = Joi.object({
  fullName: Joi.string().required(),
  collegeName: Joi.string().required(),
  collegeAddress: Joi.string().required(),
  fieldOfStudy: Joi.string().required(),
  graduationYear: Joi.number().integer().min(1900).max(2100).required(),
  bio: Joi.string().optional(),
  linkedIn: Joi.string().uri().optional(),
});

// Create or Update Profile
export const createOrUpdateProfile = async (req, res) => {
  try {
    // Extract userId from middleware
    const userId = req.user.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Validate request body
    const { error } = validate(profileSchema, req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // ✅ Uploaded file URLs
    const uploadedFiles = {};
    const fileUploads = [];

    if (req.files?.profileImg) {
      fileUploads.push(
        uploadFile("profile-images", req.files.profileImg[0])
          .then(url => (uploadedFiles.profileImg = url))
      );
    }
    if (req.files?.collegeImage) {
      fileUploads.push(
        uploadFile("college-images", req.files.collegeImage[0])
          .then(url => (uploadedFiles.collegeImage = url))
      );
    }
    if (req.files?.collegeIdCard) {
      fileUploads.push(
        uploadFile("college-id-cards", req.files.collegeIdCard[0])
          .then(url => (uploadedFiles.collegeIdCard = url))
      );
    }

    // ✅ Wait for all uploads
    await Promise.all(fileUploads);

    // ✅ Create or update profile in DB
    const profile = await prisma.profile.upsert({
      where: { userId },
      update: {
        ...req.body,
        ...uploadedFiles,
      },
      create: {
        userId,
        ...req.body,
        ...uploadedFiles,
      },
    });

    res.json({ message: "Profile saved successfully", profile });
  } catch (err) {
    console.error("Error saving profile:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get current user profile
export const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const profile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(profile);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: "Internal server error" });
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