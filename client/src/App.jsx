// src/App.jsx
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MyHabits from "./pages/MyHabits"; // ⬅️ New import
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import GlobalLoader from "./components/GlobalLoader";
import { useLoader } from "./context/loaderContext";
import { useAuth } from "./context/authContext";

const App = () => {
  const { setLoading } = useLoader();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      <GlobalLoader />
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        {/* ✅ New MyHabits route (Protected) */}
        <Route
          path="/myhabits"
          element={
            <PrivateRoute>
              <MyHabits />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-center" />
    </>
  );
};

export default App;
