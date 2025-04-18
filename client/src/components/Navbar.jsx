// src/components/Navbar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { HiOutlineUserCircle } from "react-icons/hi";

const Navbar = () => {
  const { user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) return null; // ✅ Don't show navbar if not logged in

  return (
    <nav className="w-full bg-white shadow-md py-4 px-8 flex items-center justify-between z-50">
      {/* Logo Section */}
      <div
        className="text-2xl font-bold text-indigo-600 cursor-pointer"
        onClick={() => navigate("/")}
      >
        LevelUp
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center space-x-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-lg font-medium text-gray-700 hover:text-indigo-600 transition"
        >
          Dashboard
        </button>
        <button
          onClick={() => navigate("/myhabits")}
          className="text-lg font-medium text-gray-700 hover:text-indigo-600 transition"
        >
          My Habits
        </button>
        <button
          onClick={() => navigate("/community")}
          className="text-lg font-medium text-gray-700 hover:text-indigo-600 transition"
        >
          Community
        </button>
        <button
          onClick={() => navigate("/leaderboard")}
          className="text-lg font-medium text-gray-700 hover:text-indigo-600 transition"
        >
          Leaderboard
        </button>
      </div>

      {/* Profile Dropdown */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="text-indigo-600 hover:bg-gray-100 p-2 rounded-full transition"
        >
          <HiOutlineUserCircle size={32} />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50">
            <button
              onClick={() => navigate("/profile")}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              View Profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
