import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="w-full flex justify-between items-center py-4 px-6 bg-white shadow-md fixed top-0 z-50">
      <div className="text-2xl font-bold text-indigo-600">LevelUp</div>
      <div className="flex gap-6 items-center text-gray-700">
        <a href="#home" className="hover:text-indigo-600">Home</a>
        <a href="#features" className="hover:text-indigo-600">Features</a>
        <a href="#how" className="hover:text-indigo-600">How it Works</a>
        <button
          className="bg-transparent border border-indigo-600 px-4 py-1 rounded-md text-indigo-600 hover:bg-indigo-50"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className="bg-indigo-600 text-white px-4 py-1 rounded-md hover:bg-indigo-700"
          onClick={() => navigate("/signup")}
        >
          Get Started
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
