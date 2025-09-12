import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { 
  HiOutlineUserCircle, 
  HiOutlineHome, 
  HiOutlineChartBar, 
  HiOutlineUserGroup, 
  HiOutlineLogout,
  HiOutlineCog,
  HiOutlineMenu,
  HiOutlineX
} from "react-icons/hi";
import { FiAward } from "react-icons/fi"; // Using trophy/award icon from Feather icons
import levelupIcon from "../assets/levelup-icon.png";

const Navbar = () => {
  const { user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    // Delete cookie by setting it to expire in the past
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
  };

  if (!user) return null;

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { 
      name: "Dashboard", 
      path: "/dashboard", 
      icon: <HiOutlineHome className="w-5 h-5" /> 
    },
    { 
      name: "My Habits", 
      path: "/myhabits", 
      icon: <HiOutlineChartBar className="w-5 h-5" /> 
    },
    // { 
    //   name: "Community", 
    //   path: "/community", 
    //   icon: <HiOutlineUserGroup className="w-5 h-5" /> 
    // },
    // { 
    //   name: "Leaderboard", 
    //   path: "/leaderboard", 
    //   icon: <FiAward className="w-5 h-5" /> 
    // },
  ];

  return (
    <nav className="w-full bg-white shadow-lg py-4 px-4 md:px-8 border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
  {/* The 'group' class is added here to allow child elements to react on hover */}
  <div
    className="flex items-center space-x-2 cursor-pointer group"
    onClick={() => navigate("/dashboard")}
  >
    {/* The icon now scales and rotates slightly on hover for a playful effect */}

    {/* Add perspective to the parent container */}
<div className="perspective-container">
    <div className="flipper"> {/* This element will do the flipping */}
        <img
            src={levelupIcon}
            alt="LevelUp"
            className="w-15 h-15 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6  transform-style-preserve-3d"
        />
    </div>
</div>
    {/* <img
      src={levelupIcon}
      alt="LevelUp"
        className="w-15 h-15 shake-on-hover"
      // className="w-15 h-15 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-1"
      // className="w-15 h-15 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
    /> */}
    
    {/* The text now has a gradient, a bolder font, and its letters spread out on hover */}
    <span className="text-3xl font-black bg-gradient-to-r from-indigo-600 via-purple-900 to-pink-500 bg-clip-text text-transparent transition-all duration-300 group-hover:tracking-wider">
      LevelUp
    </span>
  </div>
</div>

          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-indigo-100 text-indigo-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none p-2"
            >
              {mobileMenuOpen ? (
                <HiOutlineX className="h-6 w-6" />
              ) : (
                <HiOutlineMenu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Profile Dropdown */}
          <div className="hidden md:block relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 focus:outline-none p-2"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-medium">
                {user.name ? user.name.charAt(0).toUpperCase() : <HiOutlineUserCircle className="w-6 h-6" />}
              </div>
              <span className="font-medium">{user.name ? user.name.split(' ')[0] : 'Account'}</span>
            </button>
            
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50 transition-all duration-200 transform origin-top-right">
                <div className="p-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition flex items-center space-x-2"
                  >
                    <HiOutlineUserCircle className="w-5 h-5" />
                    <span>View Profile</span>
                  </button>
                  
                </div>
                <div className="py-1 border-t border-gray-200">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition flex items-center space-x-2"
                  >
                    <HiOutlineLogout className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-4 pb-3 border-t border-gray-200 mt-3">
          <div className="space-y-1 px-2">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path)
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            ))}
            <div className="border-t border-gray-200 pt-2 mt-2">
              <button
                onClick={() => navigate("/profile")}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                <HiOutlineUserCircle className="w-5 h-5" />
                <span>Profile</span>
              </button>
              <button
                onClick={() => navigate("/settings")}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                <HiOutlineCog className="w-5 h-5" />
                <span>Settings</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-100"
              >
                <HiOutlineLogout className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;