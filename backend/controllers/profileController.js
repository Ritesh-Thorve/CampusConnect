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
  graduationYear: Joi.number().integer().min(4).required(),
  bio: Joi.string().optional(),

  // Social media links
  linkedIn: Joi.string().uri().optional(),
  twitter: Joi.string().uri().optional(),
  github: Joi.string().uri().optional(),
  instagram: Joi.string().uri().optional(),
});

// Create or Update Profile
export const createOrUpdateProfile = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Convert graduationYear to an integer if present (form-data sends strings)
    if (req.body.graduationYear) {
      req.body.graduationYear = parseInt(req.body.graduationYear, 10);
    }

    // Validate request body (allow Joi to handle types)
    validate(profileSchema, req.body);

    const uploadedFiles = {};
    const fileUploads = [];

    // Profile Image Upload
    if (req.files?.profileImg?.[0]) {
      fileUploads.push(
        uploadFile("profile-images", req.files.profileImg[0])
          .then(url => (uploadedFiles.profileImg = url))
      );
    }

    // College Image Upload
    if (req.files?.collegeImage?.[0]) {
      fileUploads.push(
        uploadFile("college-images", req.files.collegeImage[0])
          .then(url => (uploadedFiles.collegeImage = url))
      );
    }

    // College ID Card Upload
    if (req.files?.collegeIdCard?.[0]) {
      fileUploads.push(
        uploadFile("college-id-cards", req.files.collegeIdCard[0])
          .then(url => (uploadedFiles.collegeIdCard = url))
      );
    }

    // Wait for all uploads to complete
    await Promise.all(fileUploads);

    // Save profile in DB (create if not exists, else update)
    const profile = await prisma.profile.upsert({
      where: { userId },
      update: { ...req.body, ...uploadedFiles },
      create: { userId, ...req.body, ...uploadedFiles },
    });

    res.json({ message: "Profile saved successfully", profile });
  } catch (err) {
    console.error("Error saving profile:", err);

    if (err.isJoi) {
      return res.status(400).json({ error: err.message });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

// Get My Profile 
export const getMyProfile = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

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

// Get All Profiles 
export const getAllProfiles = async (req, res) => {
  try {
    const { collegeName, graduationYear, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const profiles = await prisma.profile.findMany({
      where: {
        ...(collegeName && { collegeName }),
        ...(graduationYear && { graduationYear: parseInt(graduationYear) }),
      },
      include: {
        user: { select: { fullname: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: parseInt(skip),
      take: parseInt(limit),
    });

    return res.json({
      count: profiles.length,
      profiles,
    });
  } catch (error) {
    console.error("Error in getAllProfiles:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
  