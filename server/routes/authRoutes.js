import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// 💡 Example protected route:
router.get("/protected", protect, (req, res) => {
  res.json({ message: `Hello ${req.user.name}, you are authenticated!` });
});

export default router;
