import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import habitRoutes from "./routes/habitRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();

// const isProduction = process.env.NODE_ENV === "production";

// 🌐 Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "https://levelup-habits.netlify.app", // Frontend URL
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

