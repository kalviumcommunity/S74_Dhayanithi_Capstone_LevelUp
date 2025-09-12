import { useNavigate } from "react-router-dom";
import React from "react";
import levelupIcon from "../assets/levelup-icon.png";



function LandingPage() {
    // Replaced useNavigate with a simple function for single-file navigation
    const navigate = (path) => {
        window.location.href = path;
    };

    // A placeholder for checking if a user is logged in.
    // In a real app, this would be a state or context variable checking for a JWT or similar token.
    const isLoggedIn = localStorage.getItem("userToken") !== null;

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-white text-gray-800">
            {/* ====== Navbar ======= */}
            <nav className="sticky top-0 z-50 bg-white/50 backdrop-blur-md shadow-md px-6 py-4 flex items-center justify-between transition-colors duration-300">
                <div
                    className="flex items-center space-x-2 cursor-pointer group"
                    onClick={() => navigate("/")}
                  >
                    {/* The icon now scales and rotates slightly on hover for a playful effect */}
                    <div className="perspective-container">
                        <div className="flipper"> {/* This element will do the flipping */}
                            <img
                                src={levelupIcon}
                                alt="LevelUp"
                                className="w-15 h-15 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6  transform-style-preserve-3d"
                            />
                        </div>
                    </div>
                    {/* The text now has a gradient, a bolder font, and its letters spread out on hover */}
                    <span className="text-4xl font-black bg-gradient-to-r from-indigo-700 via-purple-900 to-pink-500 bg-clip-text text-transparent transition-all duration-300 group-hover:tracking-wider">
                      LevelUp
                    </span>
                  </div>

                <div className="flex items-center space-x-6">
                    <ul className="hidden md:flex space-x-6">
                        <li>
                            <a 
                                href="#features"
                                onClick={(e) => { e.preventDefault(); scrollToSection("features"); }}
                                className="hover:text-indigo-600 transition-colors"
                            >
                                Features
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#how-it-works"
                                onClick={(e) => { e.preventDefault(); scrollToSection("how-it-works"); }}
                                className="hover:text-indigo-600 transition-colors"
                            >
                                How It Works
                            </a>
                        </li>
                         <li>
                            <a 
                                href="#why-levelup"
                                onClick={(e) => { e.preventDefault(); scrollToSection("why-levelup"); }}
                                className="hover:text-indigo-600 transition-colors"
                            >
                                Why LevelUp?
                            </a>
                        </li>
                    </ul>
                    {isLoggedIn ? (
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="group relative px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 
                             text-white rounded-lg overflow-hidden
                             transition-all duration-300 ease-out
                             hover:from-indigo-700 hover:to-indigo-800 
                             hover:shadow-xl hover:shadow-indigo-500/25 hover:-translate-y-0.5
                             active:translate-y-0 active:transition-transform active:duration-75
                             before:absolute before:inset-0 before:bg-gradient-to-r 
                             before:from-transparent before:via-white/20 before:to-transparent
                             before:-translate-x-full before:transition-transform before:duration-700
                             hover:before:translate-x-full"
                        >
                            <span className="relative z-10">Dashboard</span>
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => navigate("/login")}
                                className="group relative px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg 
                             overflow-hidden transition-all duration-300 ease-out
                             hover:bg-indigo-50 hover:border-indigo-700 hover:text-indigo-700 
                             hover:shadow-lg hover:-translate-y-0.5 
                             active:translate-y-0 active:transition-transform active:duration-75
                             before:absolute before:inset-0 before:bg-gradient-to-r 
                             before:from-transparent before:via-white/20 before:to-transparent
                             before:-translate-x-full before:transition-transform before:duration-700
                             hover:before:translate-x-full"
                            >
                                <span className="relative z-10">Login</span>
                            </button>

                            <button
                                onClick={() => navigate("/signup")}
                                className="group relative px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 
                             text-white rounded-lg overflow-hidden
                             transition-all duration-300 ease-out
                             hover:from-indigo-700 hover:to-indigo-800 
                             hover:shadow-xl hover:shadow-indigo-500/25 hover:-translate-y-0.5
                             active:translate-y-0 active:transition-transform active:duration-75
                             before:absolute before:inset-0 before:bg-gradient-to-r 
                             before:from-transparent before:via-white/20 before:to-transparent
                             before:-translate-x-full before:transition-transform before:duration-700
                             hover:before:translate-x-full"
                            >
                                <span className="relative z-10">Get Started</span>
                            </button>
                        </>
                    )}
                </div>
            </nav>

            {/* ====== Hero Section ======= */}
            <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-10 px-6 py-16 bg-gradient-to-br from-indigo-50 via-white to-teal-50">
                <div className="max-w-xl text-center lg:text-left">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
                        Track habits. <br /> Grow daily.
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8">
                        LevelUp is your personal habit tracker and growth buddy in one place.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                        <button
                            onClick={() => navigate("/signup")}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all shadow-md"
                        >
                            Get Started Free
                        </button>
                        <a
                            href="#features"
                            onClick={(e) => { e.preventDefault(); scrollToSection("features"); }}
                            className="border border-indigo-600 text-indigo-600 hover:bg-indigo-100 px-6 py-3 rounded-lg text-lg font-semibold transition-all shadow-sm"
                        >
                            Learn More
                        </a>
                    </div>
                </div>
                
                <div className="w-full lg:w-1/2 hidden lg:block">
                    <img 
                        src="dashboard-preview-levelup.png"
                        alt="Dashboard Preview" 
                        className="w-full h-full object-cover rounded-xl shadow-lg" 
                    />
                </div>
            </section>

            {/* ====== Features Section ======= */}
            <section id="features" className="py-16 px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-10">Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white/30 backdrop-blur-md p-6 rounded-lg text-center border border-white/50 shadow-lg transition-all hover:scale-105 duration-300">
                            <span className="text-4xl">🎯</span>
                            <h3 className="text-xl font-semibold mb-2 mt-4">Goal-Oriented Design</h3>
                            <p className="text-gray-600">Set clear, achievable goals and track your progress with ease.</p>
                        </div>
                        <div className="bg-white/30 backdrop-blur-md p-6 rounded-lg text-center border border-white/50 shadow-lg transition-all hover:scale-105 duration-300">
                            <span className="text-4xl">📈</span>
                            <h3 className="text-xl font-semibold mb-2 mt-4">Data-Driven Insights</h3>
                            <p className="text-gray-600">Visualize your progress with beautiful, real-time dashboards and charts.</p>
                        </div>
                        <div className="bg-white/30 backdrop-blur-md p-6 rounded-lg text-center border border-white/50 shadow-lg transition-all hover:scale-105 duration-300">
                            <span className="text-4xl">🤝</span>
                            <h3 className="text-xl font-semibold mb-2 mt-4">Supportive Community</h3>
                            <p className="text-gray-600">Connect with others and share your journey in a positive, supportive space.</p>
                        </div>
                        <div className="bg-white/30 backdrop-blur-md p-6 rounded-lg text-center border border-white/50 shadow-lg transition-all hover:scale-105 duration-300">
                            <span className="text-4xl">🚀</span>
                            <h3 className="text-xl font-semibold mb-2 mt-4">Gamified Journey</h3>
                            <p className="text-gray-600">Earn XP, build streaks, and unlock new levels as you progress towards your goals.</p>
                        </div>
                        <div className="bg-white/30 backdrop-blur-md p-6 rounded-lg text-center border border-white/50 shadow-lg transition-all hover:scale-105 duration-300">
                            <span className="text-4xl">📱</span>
                            <h3 className="text-xl font-semibold mb-2 mt-4">Anywhere Access</h3>
                            <p className="text-gray-600">Track habits on the go with a fully responsive web app that works on all devices.</p>
                        </div>
                         <div className="bg-white/30 backdrop-blur-md p-6 rounded-lg text-center border border-white/50 shadow-lg transition-all hover:scale-105 duration-300">
                            <span className="text-4xl">🔒</span>
                            <h3 className="text-xl font-semibold mb-2 mt-4">Secure & Personalized</h3>
                            <p className="text-gray-600">Your data is yours. LevelUp is built to be secure and tailored to your unique needs.</p>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* ====== Tony AI Section ======= */}
            <section id="tony-ai" className="py-16 px-6 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">Meet Tony, Your AI Coach</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Tony is more than just a chatbot; he's an intelligent coach that understands your journey. With real-time access to your habits and progress, Tony provides personalized motivation, actionable tips, and insightful guidance to help you stay on track and overcome challenges.
                    </p>
                    <div className="mt-8 flex justify-center">
                        <div className="bg-white/30 backdrop-blur-md p-8 rounded-lg border border-white/50 shadow-lg max-w-md text-left">
                            <h3 className="text-2xl font-bold mb-4">How Tony Helps You</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <span className="text-lg">💡</span>
                                    <div>
                                        <h4 className="font-semibold">Context-Aware Motivation</h4>
                                        <p className="text-gray-600 text-sm">Based on your streaks and progress, Tony knows exactly what to say to keep you going.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-lg">📚</span>
                                    <div>
                                        <h4 className="font-semibold">Actionable Tips</h4>
                                        <p className="text-gray-600 text-sm">Tony provides simple, effective tips tailored to the habits you're trying to build.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-lg">🤖</span>
                                    <div>
                                        <h4 className="font-semibold">Your Personal Sounding Board</h4>
                                        <p className="text-gray-600 text-sm">Ask Tony anything about your habits and get a smart, friendly response instantly.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ====== How It Works ======= */}
            <section id="how-it-works" className="py-16 px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-10">How does LevelUp work?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            "Set Habits – Define what you want to achieve",
                            "Track Daily – Check off your progress",
                            "Join Community – Share and stay accountable",
                            "Level Up – Earn rewards and grow your profile",
                        ].map((step, index) => (
                            <div key={index} className="bg-gray-100 p-6 rounded-lg text-center">
                                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 font-bold mb-4">{index + 1}</div>
                                <p>{step}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== Why Choose LevelUp ======= */}
            <section id="why-levelup" className="py-16 px-6 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">Why LevelUp?</h2>
                    <ul className="space-y-4 text-left max-w-md mx-auto text-gray-700">
                        <li className="flex items-center gap-2"><span>✅</span> Real-Time Habit Dashboard</li>
                        <li className="flex items-center gap-2"><span>✅</span> AI-Powered Chat Coach</li>
                        <li className="flex items-center gap-2"><span>✅</span> Gamified Experience (XP, Streaks, Levels)</li>
                        <li className="flex items-center gap-2"><span>✅</span> Supportive Community Feed</li>
                        <li className="flex items-center gap-2"><span>✅</span> Secure & Personalized</li>
                    </ul>
                </div>
            </section>

            
            <section id="benefits" className="py-16 px-6 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">What you’ll gain from using LevelUp</h2>
                    <ul className="space-y-4 text-left max-w-md mx-auto text-gray-700">
                        <li className="flex items-center gap-2"><span>🎯</span> Build consistency and discipline</li>
                        <li className="flex items-center gap-2"><span>📈</span> See measurable growth every week</li>
                        <li className="flex items-center gap-2"><span>🧠</span> Stay focused with AI support</li>
                        <li className="flex items-center gap-2"><span>📊</span> Track progress across life categories</li>
                        <li className="flex items-center gap-2"><span>🔥</span> Feel motivated and never alone in your journey</li>
                    </ul>
                </div>
            </section>

            
            <section id="platforms" className="py-16 px-6 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">Access LevelUp anywhere</h2>
                    <p className="text-lg text-gray-600 mb-6">
                        🌐 Web app (responsive) <br />
                        📱 Mobile browser support <br />
                        🚀 Android & iOS apps (coming soon)
                    </p>
                    <div className="flex justify-center gap-4 mt-6">
                        <img src="https://placehold.co/96x96/E5E7EB/4B5563?text=Laptop" alt="Laptop Mockup" className="w-24" />
                        <img src="https://placehold.co/80x80/E5E7EB/4B5563?text=Tablet" alt="Tablet Mockup" className="w-20" />
                        <img src="https://placehold.co/64x64/E5E7EB/4B5563?text=Phone" alt="Phone Mockup" className="w-16" />
                    </div>
                </div>
            </section>

            
            <section id="join" className="py-16 px-6 bg-indigo-600 text-white">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Join the Movement</h2>
                    <p className="text-lg mb-8">
                        Thousands are already transforming their lives with LevelUp. Are you ready to level up too?
                    </p>
                    <button
                        onClick={() => navigate("/signup")}
                        className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-semibold transition shadow-lg"
                    >
                        Get Started – It’s Free
                    </button>
                </div>
            </section>

            <footer className="bg-gray-900 text-gray-300 py-10 px-6">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4">About LevelUp</h3>
                        <p className="text-sm">Your personal habit tracker and growth buddy.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/blog" className="hover:text-white">Blog</a></li>
                            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Follow Us</h3>
                        <div className="flex gap-4">
                            <a href="https://www.linkedin.com/in/dhayanithi-anandan-69199a322/" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a>
                            <a href="https://github.com/Dhayanithi-545" target="_blank" rel="noopener noreferrer" className="hover:text-white">GitHub</a>
                            <a href="https://x.com/Dhayanithi545" target="_blank" rel="noopener noreferrer" className="hover:text-white">Twitter</a>
                            <a href="https://www.instagram.com/dhaya_545" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a>
                        </div>
                        <p className="mt-4 text-sm">© 2025 LevelUp<br />Built with ❤️ by Dhaya</p>
                    </div>
                </div>
            </footer>

            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-6 right-6 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition"
            >
                ↑
            </button>
        </div>
    );
}


export default LandingPage;