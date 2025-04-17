// src/context/authContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "../services/axios"; // using our axios instance
import React from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null initially
  const [loading, setLoading] = useState(true); // ⏳ to wait before checking

  // 🔁 Auto-login when app loads
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/auth/me"); // this hits the cookie-protected route
        setUser(res.data.user); // update global state
      } catch (error) {
        setUser(null); // no valid cookie or expired
      } finally {
        setLoading(false); // done checking
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {/* ⏳ Optional: prevent rendering until check is done */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
