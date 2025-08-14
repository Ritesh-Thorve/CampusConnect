import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getMyProfile, createOrUpdateProfile } from "../controllers/profileController.js";
import { profileUpload, handleMulterError } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Single route for both GET and POST
router
  .route("/")
  .get(authMiddleware, getMyProfile)
  .post(authMiddleware, profileUpload, handleMulterError, createOrUpdateProfile);

export default router;
