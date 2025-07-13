// src/pages/Signup.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
// import API from "../services/axios";
import { toast } from "react-toastify";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const isProduction = process.env.NODE_ENV === "production";
  const backendURL = isProduction ? process.env.VITE_BACKEND_URL : "http://localhost:5454";
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post( `${backendURL}/api/auth/register`, {
        name,
        userId,
        email,
        phone,
        password,
      });

      console.log("✅ Signup Success:", response.data);
      setUser(response.data.user);
      toast.success("Signup successful! 🎉 Redirecting to dashboard...");
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Signup Error:", err);
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
      setError(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-white to-[#f1f5f9] text-gray-800">
      <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg w-full max-w-sm transition-all duration-500 ease-in-out hover:shadow-[0_0_30px_#c7d2fe]">
        <h2 className="text-3xl font-bold text-center mb-4 text-indigo-600">
          Create your <span className="text-indigo-700">LevelUp</span> account 🚀
        </h2>
        <p className="text-center text-sm mb-4 text-gray-500">
          Join the community and grow every day!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your full name"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">User ID</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              placeholder="Unique user ID"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@email.com"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="10-digit phone number"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Choose a strong password"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-gray-500 hover:text-indigo-600 transition-all"
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm font-medium transition-all duration-300">
              ⚠️ {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl text-lg font-semibold transition-all shadow-md"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <span
            className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline cursor-pointer transition-all duration-200"
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </div>
      </div>
    </div>
  );
}

export default Signup;
