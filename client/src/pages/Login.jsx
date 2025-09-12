// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../services/axios";
import { useAuth } from "../context/authContext.jsx";
import { EyeIcon, EyeOffIcon } from "lucide-react"; // make sure you have lucide-react or use any icon lib
import "react-toastify/dist/ReactToastify.css";


function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // No need for backendURL as it's configured in axios instance

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "/auth/login",
        {
          userOrEmail: identifier,
          password,
        }
      );

      setUser(res.data.user);
      toast.success(
  <div>
    Login Successful! 🎉 Would you like to join our community?
    <a 
      href="https://chat.whatsapp.com/J4hU9HJOAWx54Iv8DBI685" 
      target="_blank" 
      rel="noopener noreferrer"
      className="font-bold underline text-blue-600 hover:text-blue-800 ml-1"
    >
      Join on WhatsApp!
    </a>
  </div>,
  {
    // Optional: Make the toast stay longer so users have time to click
    autoClose: 8000, 
  }
);
      // toast.success("Login Successfull 🎉 Would you like to Join in our whatsapp Community https://chat.whatsapp.com/J4hU9HJOAWx54Iv8DBI685 ");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-white to-[#f1f5f9] text-gray-800">
      <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-lg w-full max-w-md transition-all duration-500 ease-in-out hover:shadow-[0_0_30px_#c7d2fe]">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          Welcome Back to <span className="text-indigo-700">LevelUp</span> 
        </h2>
        <p className="text-center text-sm mb-6 text-gray-500">
          Track better. Build faster. Grow forever.
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Email or User ID
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              placeholder="Enter your email or userId"
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
              placeholder="••••••••"
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
            Login
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-600">
          New here?{" "}
          <span
            className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline cursor-pointer transition-all duration-200"
            onClick={() => navigate("/signup")}
          >
            Create an account
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
