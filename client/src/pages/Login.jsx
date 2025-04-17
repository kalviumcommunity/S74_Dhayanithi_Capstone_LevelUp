// src/pages/Login.jsx
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/axios"; // 🔁 our axios instance
import { useAuth } from "../context/authContext.jsx"; // 💡 access context

function Login() {
  const [identifier, setIdentifier] = useState(""); // can be email or userId
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // reset error before new request

    try {
      const res = await axios.post("/auth/login", {
        userOrEmail : identifier, // this can be email or userId (we’ll handle this in backend)
        password,
      });

      setUser(res.data.user); // 🔐 set the user in global state
      navigate("/dashboard"); // 🚀 move to dashboard
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Login to LevelUp 🚀</h2>

      <form onSubmit={handleLogin}>
        <label>
          Email or User ID:
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit">Login</button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
