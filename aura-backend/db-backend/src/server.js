import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js"; // ✅ import profile routes

dotenv.config();

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------- ROUTES ---------- */
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes); // ✅ mount profile routes

/* ---------- HEALTH CHECK ---------- */
app.get("/", (req, res) => {
  res.json({ message: "Aura backend running 🚀" });
});

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
