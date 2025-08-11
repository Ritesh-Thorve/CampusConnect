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
    // Ensure userId exists and is an integer
    const userId = parseInt(req.user?.userId, 10);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Use findFirst for safety (works whether userId is unique or not)
    const profile = await prisma.profile.findFirst({
      where: { userId },
      include: {
        user: { select: { fullname: true, email: true } },
      },
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
    // Parse pagination params safely
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    // Extract filters
    const { collegeName, graduationYear } = req.query;

    // Build where clause dynamically
    const where = {
      ...(collegeName && { collegeName }),
      ...(graduationYear && { graduationYear: parseInt(graduationYear, 10) }),
    };

    // Fetch paginated results and total count in parallel
    const [profiles, total] = await Promise.all([
      prisma.profile.findMany({
        where,
        include: {
          user: { select: { fullname: true, email: true } },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.profile.count({ where }),
    ]);

    return res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      profiles,
    });
  } catch (error) {
    console.error("Error in getAllProfiles:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

  