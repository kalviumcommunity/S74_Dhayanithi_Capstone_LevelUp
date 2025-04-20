import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import habitRoutes from "./routes/habitRoutes.js";

dotenv.config();
const app = express();

// 🌐 Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  credentials: true
}));

// 📦 Routes
app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);

// Root route
app.get('/', (req, res) => res.send("Lol....this is levelup"));

// 🧠 DB + Server Start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.log("❌ MongoDB Error:", err));
