
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/UserModel.js";

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.userId,
      name: user.name,
      email: user.email,
      phone: user.phone
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export const register = async (req, res) => {
  const { name, userId, email, phone, password } = req.body;

  if (!name || !userId || !email || !phone || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  try {
    const existingUser = await userModel.findOne({
      $or: [{ userId }, { email }, { phone }]
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      userId,
      email,
      phone,
      password: hashedPassword
    });

    const token = generateToken(newUser);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const login = async (req, res) => {
  const { userOrEmail, password } = req.body;

  if (!userOrEmail || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  try {
    const isEmail = userOrEmail.includes("@");

    const user = await userModel.findOne(
      isEmail ? { email: userOrEmail } : { userId: userOrEmail }
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password"
      }); 
    }

    const token = generateToken(user);  

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        name: user.name,
        userId: user.userId,
        email: user.email,
        phone: user.phone
      }
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    });

    return res.status(200).json({
      success: true,
      message: "User logged out successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
