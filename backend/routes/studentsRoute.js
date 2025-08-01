import express from 'express';
import { getAllProfiles } from '../controllers/profileController.js'

const router = express.Router();

router.get('/students', getAllProfiles)

export default router