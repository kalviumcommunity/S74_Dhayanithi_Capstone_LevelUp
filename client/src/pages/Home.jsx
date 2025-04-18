import { useNavigate } from "react-router-dom";
import React from "react";

function Home() {
    const navigate = useNavigate();

    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-teal-100 px-4">
            <div className="max-w-2xl text-center">
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-4">
                    Welcome to <span className="text-indigo-600">LevelUp</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8">
                    Track your Habits. Build your Future.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        onClick={() => navigate("/login")}
                        className="px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl text-lg font-semibold transition-all shadow-md"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => navigate("/signup")}
                        className="px-6 py-3 text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-100 rounded-xl text-lg font-semibold transition-all shadow-sm"
                    >
                        Signup
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Home;
