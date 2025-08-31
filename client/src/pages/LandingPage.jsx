import { useNavigate } from "react-router-dom";
import React from "react";

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="bg-white text-gray-800">
            {/* ====== Navbar ======= */}
            <nav className="sticky top-0 z-50 bg-white shadow px-6 py-4 flex items-center justify-between">
  <h1 className="text-2xl font-bold text-indigo-600">LevelUp</h1>

  <div className="flex items-center space-x-6">
    <ul className="hidden md:flex space-x-6">
      <li><a href="#features" className="hover:text-indigo-600">Features</a></li>
      <li><a href="/blog" className="hover:text-indigo-600">Blog</a></li>
    </ul>
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
                        className="w-full h-full object-cover" 
                    />
                    </div>

            </section>

            {/* ====== What is LevelUp? ======= */}
            <section id="what-is" className="py-16 px-6 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">What is LevelUp?</h2>
                    <p className="text-lg text-gray-600">
                        LevelUp is a smart, community-powered habit tracking app built to help you build daily routines,
                        stay motivated, and grow consistently — one small action at a time. It's not just about checking boxes;
                        it's about evolving into the best version of yourself.
                    </p>
                </div>
            </section>

            {/* ====== Who is it for? ======= */}
            <section id="who-for" className="py-16 px-6 bg-gray-50">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-10">Who is LevelUp for?</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                        <li className="flex items-start gap-3">
                            <span>•</span>
                            <span>Students managing time, study routines, or exam prep</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span>•</span>
                            <span>Professionals mastering new skills or staying organized</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span>•</span>
                            <span>Fitness & wellness enthusiasts building physical and mental strength</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span>•</span>
                            <span>Anyone on a self-improvement journey</span>
                        </li>
                    </ul>
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
                        <img src="./mockups/laptop.png" alt="Laptop Mockup" className="w-24" />
                        <img src="./mockups/tablet.png" alt="Tablet Mockup" className="w-20" />
                        <img src="./mockups/phone.png" alt="Phone Mockup" className="w-16" />
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
                            <a href="https://www.linkedin.com/in/dhayanithi-anandan-69199a322/"  target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a>
                            <a href="https://github.com/Dhayanithi-545"  target="_blank" rel="noopener noreferrer" className="hover:text-white">GitHub</a>
                            <a href="https://x.com/Dhayanithi545"  target="_blank" rel="noopener noreferrer" className="hover:text-white">Twitter</a>
                            <a href="https://www.instagram.com/dhaya_545"  target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a>
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