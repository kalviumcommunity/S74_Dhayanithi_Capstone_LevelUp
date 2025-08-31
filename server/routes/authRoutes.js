
import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// For my reference EXAMPLE
// router.get("/protected", protect, (req, res) => {
//   res.json({ message: `Hello ${req.user.name}, you are authenticated!` });
// });

// GET /me - fetch logged-in user's data
router.get("/me", protect, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user, // this comes from protect middleware
  });
});

router.get('/profile', protect, (req, res) => {
  res.status(200).json({ user: req.user });
});


export default router;
