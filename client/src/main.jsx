import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import { LoaderProvider } from "./context/loaderContext.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom"; // 🚨 MISSING!

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter> {/* 🔥 Wrap everything inside this */}
      <AuthProvider>
        <LoaderProvider>
          <App />
        </LoaderProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
