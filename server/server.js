import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import habitRoutes from "./routes/habitRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();

const isProduction = process.env.NODE_ENV === "production";
const clientURL = process.env.CLIENT_URL || "http://localhost:5173";


const allowedOrigins = clientURL.split(",")
  .map(url => url.trim())
  .filter(url => url.length > 0);


if (!allowedOrigins.includes("http://localhost:5173")) {
  allowedOrigins.push("http://localhost:5173");
}
if (!allowedOrigins.includes("https://levelup-habits.netlify.app")) {
  allowedOrigins.push("https://levelup-habits.netlify.app");
}

console.log("🌐 Allowed CORS origins:", allowedOrigins);

// 🌐 Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `CORS policy does not allow access from origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));


app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);


app.get('/', (req, res) => res.send("Lol....this is levelup"));


connectDB()

const port = process.env.PORT || 5455
app.listen(port, () => {
  console.log(` Server running on http://localhost:${port}`);
});

