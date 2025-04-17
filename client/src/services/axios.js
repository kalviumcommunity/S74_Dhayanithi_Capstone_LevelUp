import axios from "axios";

console.log("✅ Backend URL:", import.meta.env.VITE_BACKEND_URL); // ← this must log correctly

const API = axios.create({
    baseURL: "http://localhost:5454/api",
    withCredentials: true,
});

export default API;
