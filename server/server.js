import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import habitRoutes from "./routes/habitRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();

// 🌐 Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL, // Frontend URL
  credentials: true
}));

// 📦 Routes
app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);

// Root route
app.get('/', (req, res) => res.send("Lol....this is levelup"));


connectDB()

const port = process.env.PORT || 5455
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

