// src/pages/Dashboard.jsx
import React from "react";
import { useAuth } from "../context/authContext.jsx";
import axios from "../services/axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="dashboard">
      <h1>Welcome {user?.name} 🌟</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
