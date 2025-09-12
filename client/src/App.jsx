import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import axios from './services/axios';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MyHabits from "./pages/MyHabits";
import PrivateRoute from "./routes/PrivateRoute";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import GlobalLoader from "./components/GlobalLoader";
import { useLoader } from "./context/loaderContext";
import { useAuth } from "./context/authContext";
import Profile from "./pages/Profile";
import { useState } from "react";

const App = () => {
  const { setLoading } = useLoader();
  const location = useLocation();
  const { user } = useAuth();
  const [habits, setHabits] = useState([]);
  // 🌐 Loader on route change
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

    useEffect(() => {
    if (user) {
      axios
        .get('/habits/all-habits', { withCredentials: true })
        .then(res => setHabits(res.data.habits || []))
        .catch(() => setHabits([]));
    } else {
      setHabits([]);
    }
  }, [user]);

  // 🔁 Daily Reset useEffect
  useEffect(() => {
    const lastReset = localStorage.getItem("lastReset");
    const today = new Date().toISOString().split('T')[0];

    if (lastReset !== today) {
      axios
        .put('/habits/daily-reset', {}, { withCredentials: true })
        .then(() => {
          localStorage.setItem("lastReset", today);
          console.log("✅ Daily reset done");
        })
        .catch((err) => console.log("❌ Reset failed", err));
    }
  }, []);

  return (
    <>
      <GlobalLoader />
      {location.pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<LandingPage user={user} />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/myhabits"
          element={
            <PrivateRoute>
              <MyHabits />
            </PrivateRoute>
          }
        />
        <Route path="/profile" element={<Profile user={user} habits={habits} />} />
      </Routes>
      <ToastContainer position="top-center" />
    </>
  );
};

export default App;
