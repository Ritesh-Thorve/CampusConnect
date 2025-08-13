import prisma from "../config/db.js";
import { uploadFile } from "../utils/upload.js";
import Joi from "joi";

// Joi Schema (improved graduation year validation)
const profileSchema = Joi.object({
  fullName: Joi.string().required(),
  collegeName: Joi.string().required(),
  collegeAddress: Joi.string().required(),
  fieldOfStudy: Joi.string().required(),
  graduationYear: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear() + 10)
    .required(),
  bio: Joi.string().optional(),
  linkedIn: Joi.string().uri().optional(),
  twitter: Joi.string().uri().optional(),
  github: Joi.string().uri().optional(),
  instagram: Joi.string().uri().optional(),
});

// Create or Update Profile
export const createOrUpdateProfile = async (req, res) => {
  try {
    const userId = Number(req.user?.userId);
    if (!userId || Number.isNaN(userId)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (req.body.graduationYear) {
      req.body.graduationYear = Number(req.body.graduationYear);
    }

    // Validate request body
    const { error } = profileSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        error: error.details.map((d) => d.message).join(", "),
      });
    }

    const uploadedFiles = {};
    const uploadTasks = [
      req.files?.profileImg?.[0] &&
        uploadFile("profile-images", req.files.profileImg[0]).then(
          (url) => (uploadedFiles.profileImg = url)
        ),
      req.files?.collegeImage?.[0] &&
        uploadFile("college-images", req.files.collegeImage[0]).then(
          (url) => (uploadedFiles.collegeImage = url)
        ),
      req.files?.collegeIdCard?.[0] &&
        uploadFile("college-id-cards", req.files.collegeIdCard[0]).then(
          (url) => (uploadedFiles.collegeIdCard = url)
        ),
    ].filter(Boolean);

    // handle failed uploads gracefully
    await Promise.all(
      uploadTasks.map((task) =>
        task.catch((err) => {
          console.error("File upload failed:", err);
        })
      )
    );

    // sanitize data to avoid overwriting with undefined
    const sanitizedData = Object.fromEntries(
      Object.entries({ ...req.body, ...uploadedFiles }).filter(
        ([, v]) => v !== undefined
      )
    );

    const profile = await prisma.profile.upsert({
      where: { userId },
      update: sanitizedData,
      create: { userId, ...sanitizedData },
    });

    res.json({ message: "Profile saved successfully", profile });
  } catch (err) {
    console.error("Error saving profile:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get My Profile
export const getMyProfile = async (req, res) => {
  try {
    const userId = Number(req.user?.userId);
    if (!userId || Number.isNaN(userId)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

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

// Get All Profiles with pagination + filtering
export const getAllProfiles = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const { collegeName, graduationYear } = req.query;

    const where = {};
    if (collegeName) where.collegeName = collegeName;
    if (!isNaN(parseInt(graduationYear, 10))) {
      where.graduationYear = parseInt(graduationYear, 10);
    }

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

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      profiles,
    });
  } catch (error) {
    console.error("Error in getAllProfiles:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
