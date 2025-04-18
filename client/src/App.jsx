// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";  // Import Navbar
import { ToastContainer } from "react-toastify";
import GlobalLoader from "./components/GlobalLoader";
import { useLoader } from "./context/loaderContext";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./context/authContext"; // Import useAuth to check authentication status

const App = () => {
  const { setLoading } = useLoader();
  const location = useLocation();
  const { user } = useAuth();  // Access user data from context

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 300); // simulate slight loading effect
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      <GlobalLoader />
      {user && <Navbar />} {/* Only render Navbar if the user is logged in */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/' element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-center" />
    </>
  );
};

export default App;
