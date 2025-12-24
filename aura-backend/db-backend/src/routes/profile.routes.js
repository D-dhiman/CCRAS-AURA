// src/routes/profile.routes.js
import express from "express";
import { upsertProfile, getProfile } from "../controllers/profile.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// 1️⃣ Get the logged-in user's profile
// GET /api/profile/me
router.get("/me", authMiddleware, getProfile);

// 2️⃣ Create or update profile (multi-page save)
// POST /api/profile
router.post("/", authMiddleware, upsertProfile);

export default router;
