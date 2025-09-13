import { useNavigate } from "react-router-dom";
import React from "react";
import { useState } from "react";
import levelupIcon from "../assets/levelup-icon.png";
import { TrendingUp,  Rocket,  Bot,
        CheckCircle2,  BrainCircuit, LayoutGrid, Flame, Laptop, Tablet, Smartphone, Globe, Download, ExternalLink, Heart,
        ArrowUp,  FileText, BookOpen, Linkedin, Github,Twitter, Instagram, Target,   Lightbulb,
          ArrowRight, Play, Sparkles, Award, Users, BarChart3, Shield, Zap, Star, ChevronRight

 } from 'lucide-react';



function LandingPage({ user = [] }) {

    const navigate = (path) => {
        window.location.href = path;
    };

    const getCookie = (name) => {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : null;
};

    // const isLoggedIn = getCookie("token") != null;
    const isLoggedIn = user && user._id;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

 

    // Fix: Add scrollToSection function for smooth scrolling to sections
    const scrollToSection = (id) => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
      const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false); // Close menu after clicking a link
        }
    };

    const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
    return (
        <div className="bg-white text-gray-800">
            
            <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl shadow-sm px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between border-b border-white/20">
            
            {/* Logo and Mobile Toggle */}
            <div className="flex items-center justify-between w-full md:w-auto">
                <div
                    className="flex items-center space-x-2 cursor-pointer group"
                    onClick={() => navigate("/")}
                >
                    <div className="perspective-container">
                        <div className="flipper">
                            <img
                                src={levelupIcon}
                                alt="LevelUp"
                                className="w-12 h-12"
                            />
                        </div>
                    </div>
                    <span className="text-3xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent transition-all duration-300 group-hover:tracking-wider">
                        LevelUp
                    </span>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden text-gray-700 hover:text-indigo-600 focus:outline-none"
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="mobile-menu"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                    </svg>
                </button>
            </div>

            {/* Desktop and Mobile Menu Container */}
            <div
                id="mobile-menu"
                className={`md:flex flex-col md:flex-row md:items-center md:space-x-6 w-full md:w-auto mt-4 md:mt-0 ${isMobileMenuOpen ? 'block' : 'hidden'}`}
            >
                {/* Navigation Links */}
                <ul className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 text-gray-700 font-medium">
                    {['Features', 'How It Works', 'Why LevelUp'].map((item) => (
                        <li key={item} className="w-full md:w-auto text-center">
                            <a
                                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                                onClick={(e) => { e.preventDefault(); scrollToSection(item.toLowerCase().replace(/\s+/g, '-')); }}
                                className="relative py-1 block transition-colors hover:text-indigo-600 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full"
                            >
                                {item}
                            </a>
                        </li>
                    ))}
                    <li className="w-full md:w-auto text-center">
                        <a
                            href="https://chat.whatsapp.com/J4hU9HJOAWx54Iv8DBI685"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold transition-all duration-300 hover:bg-green-200 hover:shadow-md hover:-translate-y-0.5 animate-pulse-slow"
                        >
                            <span>@Community</span>
                        </a>
                    </li>
                </ul>

                {/* Login/Signup/Dashboard Buttons */}
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto mt-4 md:mt-0">
                    {user && user._id ? (
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="group relative px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg overflow-hidden transition-all duration-300 ease-out hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 w-full"
                        >
                            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                            <span className="relative">Dashboard</span>
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => navigate("/login")}
                                className="px-6 py-2.5 font-semibold text-indigo-600 bg-transparent border-2 border-indigo-600 rounded-lg transition-all duration-300 ease-out hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-700 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 w-full"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => navigate("/signup")}
                                className="group relative px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg overflow-hidden transition-all duration-300 ease-out hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 w-full"
                            >
                                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                                <span className="relative">Get Started</span>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>

             {/* // Hero Section  */}
        <section className="min-h-screen flex items-center  justify-center px-6 md:px-12 xl:px-24 py-24 bg-gradient-to-br from-indigo-50 via-white to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-200 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-200 rounded-full blur-3xl opacity-10 animate-pulse delay-500"></div>
      </div>

      {/* Main Grid Container */}
      <div className="mt-[-6rem] w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
        
        {/* Left Content Block */}
        <div className="text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-indigo-200 px-4 py-2 rounded-full text-sm font-semibold text-indigo-700 mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            Start Your Growth Journey Today
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold mb-6 leading-tight text-gray-800">
            Track habits.
            <br />
            Grow Daily.
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-500 mb-10 leading-relaxed max-w-xl">
            Your AI-powered coach for building habits and achieving goals.
          </p>

          {/* CTA Button */}
          <div className="flex justify-start mb-10">
            <button
              onClick={() => navigate("/signup")}
              className="group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-indigo-500/30 hover:scale-105 flex items-center justify-center gap-3"
            >
              Get Started
              <Rocket className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-6" />
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                <img className="w-9 h-9 rounded-full border-2 border-white shadow-sm" src="https://i.pravatar.cc/40?img=1" alt="User avatar 1" />
                <img className="w-9 h-9 rounded-full border-2 border-white shadow-sm" src="https://i.pravatar.cc/40?img=2" alt="User avatar 2" />
                <img className="w-9 h-9 rounded-full border-2 border-white shadow-sm" src="https://i.pravatar.cc/40?img=3" alt="User avatar 3" />
                <img className="w-9 h-9 rounded-full border-2 border-white shadow-sm" src="https://i.pravatar.cc/40?img=4" alt="User avatar 4" />
              </div>
              <span className="font-semibold">Trusted by 80+ users</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 font-semibold text-gray-700">4.9/5 Rating</span>
            </div>
          </div>
        </div>
        {/* Right Content Block: Dashboard Preview */}
        <div className="relative">
          <div className="relative group">
            {/* The blurred background glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>

            {/* The main card container */}
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
              {/* The macOS-style window header */}
              <div className="p-4 bg-gray-100 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="ml-4 text-gray-600 text-sm font-medium">LevelUp Dashboard</span>
                </div>
              </div>
              {/* The Image Preview */}
              <div className="bg-gray-50">
                <img
                  src="/dashboard-preview-levelup.png"
                  alt="A preview of the LevelUp application dashboard showing charts and habit tracking."
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-20 px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.03),transparent_70%)]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Zap className="w-4 h-4" />
              Powerful Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              LevelUp combines proven habit-building strategies with modern technology to help you achieve your goals faster than ever.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            {[
              {
                icon: Target,
                title: "Goal-Oriented Design",
                description: "Set clear, achievable goals and track your progress with intelligent insights and recommendations.",
                color: "from-blue-500 to-indigo-600",
                bgColor: "bg-blue-50"
              },
              {
                icon: TrendingUp,
                title: "Data-Driven Insights",
                description: "Visualize your progress with beautiful, real-time dashboards and actionable analytics.",
                color: "from-green-500 to-teal-600",
                bgColor: "bg-green-50"
              },
              {
                icon: Users,
                title: "Supportive Community",
                description: "Connect with like-minded individuals and share your journey in a positive, encouraging environment.",
                color: "from-purple-500 to-pink-600",
                bgColor: "bg-purple-50"
              },
              {
                icon: Rocket,
                title: "Gamified Journey",
                description: "Earn XP, build streaks, unlock achievements, and level up as you progress towards your goals.",
                color: "from-orange-500 to-red-600",
                bgColor: "bg-orange-50"
              },
              {
                icon: Smartphone,
                title: "Anywhere Access",
                description: "Track habits on the go with a fully responsive web app that syncs across all your devices.",
                color: "from-cyan-500 to-blue-600",
                bgColor: "bg-cyan-50"
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description: "Your data is protected with enterprise-grade security and complete privacy controls.",
                color: "from-gray-600 to-gray-800",
                bgColor: "bg-gray-50"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-20 rounded-2xl blur transition-opacity"></div>
                <div className={`relative ${feature.bgColor} border border-gray-200 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 h-full`}>
                  <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-7 h-7 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  
                  <div className="mt-6 flex items-center text-indigo-600 font-semibold group-hover:gap-2 transition-all">
                    <span>Learn more</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Tony AI Section */}
      <section id="tony-ai" className="py-20 px-6 bg-gradient-to-br from-indigo-50 to-purple-50 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-2xl opacity-30"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-indigo-200 px-4 py-2 rounded-full text-sm font-semibold text-indigo-700 mb-6">
              <Bot className="w-4 h-4" />
              AI-Powered Coach
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Meet Tony, Your AI Coach
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Tony is more than just a chatbot; he's an intelligent coach that understands your journey. With real-time access to your habits and progress, Tony provides personalized motivation and actionable guidance.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Tony Features */}
            <div className="space-y-6">
              {[
                {
                  icon: Lightbulb,
                  title: "Context-Aware Motivation",
                  description: "Based on your streaks and progress, Tony knows exactly what to say to keep you motivated and moving forward.",
                  color: "text-yellow-600",
                  bg: "bg-yellow-50"
                },
                {
                  icon: BookOpen,
                  title: "Actionable Tips",
                  description: "Receive personalized, science-backed strategies tailored specifically to the habits you're building.",
                  color: "text-blue-600",
                  bg: "bg-blue-50"
                },
                {
                  icon: BrainCircuit,
                  title: "Intelligent Insights",
                  description: "Tony analyzes your patterns and provides smart recommendations to optimize your habit-building journey.",
                  color: "text-purple-600",
                  bg: "bg-purple-50"
                }
              ].map((item, index) => (
                <div key={index} className="group flex gap-4">
                  <div className={`${item.bg} p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-gray-800">{item.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Interface Mockup */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Tony AI Coach</p>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-white/80 text-sm">Online</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-4 h-80 overflow-y-auto">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl p-3 max-w-xs">
                      <p className="text-sm">Great job on your 7-day streak! 🔥 Ready to push for 14 days?</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 justify-end">
                    <div className="bg-indigo-500 text-white rounded-2xl p-3 max-w-xs">
                      <p className="text-sm">Yes! What should I focus on next?</p>
                    </div>
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs">You</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl p-3 max-w-xs">
                      <p className="text-sm">I noticed you struggle with evening workouts. Try morning sessions - studies show 92% better consistency!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              How LevelUp Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in minutes with our simple, proven 4-step process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "Set Habits",
                description: "Define clear, achievable habits that align with your goals and values",
                icon: Target,
                color: "from-blue-500 to-indigo-600"
              },
              {
                step: 2,
                title: "Track Daily",
                description: "Log your progress with simple check-offs and smart reminders",
                icon: CheckCircle2,
                color: "from-green-500 to-teal-600"
              },
              {
                step: 3,
                title: "Join Community",
                description: "Connect with others, share victories, and stay accountable together",
                icon: Users,
                color: "from-purple-500 to-pink-600"
              },
              {
                step: 4,
                title: "Level Up",
                description: "Earn XP, unlock achievements, and celebrate your transformation",
                icon: Award,
                color: "from-orange-500 to-red-600"
              }
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} text-white font-bold text-xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {item.step}
                  </div>
                  
                  <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300`}>
                    <item.icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
                
                {/* Connecting Line */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-gray-200 to-transparent -translate-y-1/2 z-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Why Choose LevelUp Section */}
      <section id="why-levelup" className="py-20 px-6 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800">
                Why Choose LevelUp?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                LevelUp isn't just another habit tracker. It's a complete ecosystem designed to accelerate your personal growth.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: BarChart3, text: "Real-Time Habit Dashboard", color: "text-blue-600" },
                  { icon: Bot, text: "AI-Powered Chat Coach", color: "text-purple-600" },
                  { icon: Sparkles, text: "Gamified Experience (XP, Streaks, Levels)", color: "text-orange-600" },
                  { icon: Users, text: "Supportive Community Feed", color: "text-green-600" },
                  { icon: Shield, text: "Secure & Personalized", color: "text-gray-600" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <item.icon className={`w-5 h-5 ${item.color}`} strokeWidth={2} />
                    </div>
                    <span className="text-lg font-semibold text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur-lg opacity-20"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-2xl">
                <div className="text-center">
                  <Sparkles className="w-16 h-16 text-indigo-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">Join the Revolution</h3>
                  <p className="text-gray-600 mb-6">
                    Be part of a community that's redefining personal growth through technology and human connection.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-3xl font-bold text-indigo-600">80+</div>
                      <div className="text-sm text-gray-600">Active Users</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-green-600">85%</div>
                      <div className="text-sm text-gray-600">Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Benefits Section */}
      <section id="benefits" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Transform Your Life
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what you'll achieve when you make LevelUp part of your daily routine
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Build Unshakeable Consistency",
                description: "Develop the discipline and routine that successful people rely on every single day",
                color: "from-blue-500 to-indigo-600",
                bg: "bg-blue-50"
              },
              {
                icon: TrendingUp,
                title: "See Measurable Growth",
                description: "Track your progress with detailed analytics and celebrate every milestone along the way",
                color: "from-green-500 to-teal-600",
                bg: "bg-green-50"
              },
              {
                icon: BrainCircuit,
                title: "Stay Focused with AI Support",
                description: "Get personalized guidance and motivation exactly when you need it most",
                color: "from-purple-500 to-pink-600",
                bg: "bg-purple-50"
              },
              {
                icon: LayoutGrid,
                title: "Track Progress Across Life",
                description: "Monitor fitness, productivity, relationships, and personal development in one place",
                color: "from-orange-500 to-red-600",
                bg: "bg-orange-50"
              },
              {
                icon: Flame,
                title: "Feel Motivated Every Day",
                description: "Join a supportive community and never feel alone in your personal growth journey",
                color: "from-red-500 to-pink-600",
                bg: "bg-red-50"
              },
              {
                icon: Award,
                title: "Celebrate Every Victory",
                description: "Unlock achievements, build streaks, and level up as you transform into your best self",
                color: "from-yellow-500 to-orange-600",
                bg: "bg-yellow-50"
              }
            ].map((benefit, index) => (
              <div key={index} className="group">
                <div className={`${benefit.bg} border border-gray-200 p-8 rounded-2xl h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2`}>
                  <div className={`w-14 h-14 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon className="w-7 h-7 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

            
            <section id="platforms" className="py-20 px-6 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-600 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Globe className="w-4 h-4" />
            Cross-Platform Experience
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Access LevelUp Anywhere
          </h2>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Take your habits with you. LevelUp works seamlessly across all your devices with real-time sync.
          </p>

          {/* Platform Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Web App Card */}
            <div className="group bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-6 transition-transform duration-300">
                <Laptop className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Web Application</h3>
              <p className="text-gray-600 mb-4">Full-featured web app that works perfectly on any browser</p>
              <div className="flex items-center justify-center gap-2 text-green-600 text-sm font-semibold">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Available Now
              </div>
            </div>

            {/* Mobile Browser Card */}
            <div className="group bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-6 transition-transform duration-300">
                <Tablet className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Mobile Browser</h3>
              <p className="text-gray-600 mb-4">Responsive design optimized for mobile browsers</p>
              <div className="flex items-center justify-center gap-2 text-green-600 text-sm font-semibold">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Available Now
              </div>
            </div>

            {/* Native Apps Card */}
            <div className="group bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-6 transition-transform duration-300">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Native Apps</h3>
              <p className="text-gray-600 mb-4">Android & iOS apps with native performance</p>
              <div className="flex items-center justify-center gap-2 text-amber-600 text-sm font-semibold">
                <Download className="w-4 h-4" />
                Coming Soon
              </div>
            </div>
          </div>

          {/* Device Mockups */}
          <div className="flex justify-center items-end gap-6 mt-8">
            <div className="group cursor-pointer">
              <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <Laptop className="w-16 h-16 text-white" />
              </div>
              <p className="text-sm text-gray-600 mt-3 font-medium">Desktop</p>
            </div>
            
            <div className="group cursor-pointer">
              <div className="w-28 h-28 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <Tablet className="w-12 h-12 text-white" />
              </div>
              <p className="text-sm text-gray-600 mt-3 font-medium">Tablet</p>
            </div>
            
            <div className="group cursor-pointer">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm text-gray-600 mt-3 font-medium">Mobile</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Join Section */}
      <section id="join" className="py-20 px-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div
          className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-8 cursor-pointer"
          onClick={() => window.open('https://chat.whatsapp.com/J4hU9HJOAWx54Iv8DBI685', '_blank')}>
            <Heart className="w-4 h-4 text-pink-300" />
            Join Our Community
          </div>

          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Join the Movement
          </h2>

          <p className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed text-indigo-100">
            People are already transforming their lives with LevelUp. 
            <span className="block mt-2 text-white font-semibold">Are you ready to level up too?</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate("/signup")}
              className="group bg-white text-indigo-600 hover:bg-gray-50 px-10 py-4 rounded-2xl text-lg font-bold transition-all duration-300 shadow-2xl hover:shadow-white/25 hover:scale-105 flex items-center gap-3">
              Get Started
              <ExternalLink className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
            </button>
            <button
              type="button"
              onClick={() => window.open("https://chat.whatsapp.com/J4hU9HJOAWx54Iv8DBI685", "_blank")}
              className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold transition-all duration-300 hover:bg-green-200 hover:shadow-md hover:-translate-y-0.5 animate-pulse-slow cursor-pointer">
            
              <span>@Community</span>
            </button>

            <div className="flex items-center gap-2 text-indigo-200">
              <div className="flex -space-x-2">
                {/* <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-6 text-sm text-gray-600"> */}
            
              <div className="flex -space-x-3">
                <img className="w-9 h-9 rounded-full border-2 border-white shadow-sm" src="https://i.pravatar.cc/40?img=1" alt="User avatar 1" />
                <img className="w-9 h-9 rounded-full border-2 border-white shadow-sm" src="https://i.pravatar.cc/40?img=2" alt="User avatar 2" />
                <img className="w-9 h-9 rounded-full border-2 border-white shadow-sm" src="https://i.pravatar.cc/40?img=3" alt="User avatar 3" />
                <img className="w-9 h-9 rounded-full border-2 border-white shadow-sm" src="https://i.pravatar.cc/40?img=4" alt="User avatar 4" />
              </div>
              </div>
              <span className="text-sm">80+ happy users</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-300 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        </div>
        
        <div className="relative z-10">
          {/* Main Footer Content */}
          <div className="py-16 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
              {/* About Section */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">LevelUp</h3>
                </div>
                
                <p className="text-gray-400 mb-6 text-lg leading-relaxed max-w-md">
                  Your personal habit tracker and growth buddy. Transform your daily routines into meaningful progress.
                </p>
                
                <div className="flex flex-wrap gap-3">
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Habit Tracking
                  </span>
                  <span className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Progress Analytics
                  </span>
                  <span className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Goal Achievement
                  </span>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-400" />
                  Quick Links
                </h3>
                <ul className="space-y-4">
                  <li>
                    <a href="/blog" className="group flex items-center gap-2 hover:text-white transition-colors duration-200">
                      <FileText className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300" />
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="group flex items-center gap-2 hover:text-white transition-colors duration-200">
                      <Shield className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300" />
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="group flex items-center gap-2 hover:text-white transition-colors duration-200">
                      <FileText className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300" />
                      Terms & Conditions
                    </a>
                  </li>
                </ul>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-bold mb-6 text-white">Connect With Us</h3>
                
                <div className="grid grid-cols-2 gap-3 mb-8">
                  <a 
                    href="https://www.linkedin.com/in/dhayanithi-anandan-69199a322/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group flex items-center gap-2 p-3 bg-gray-800 hover:bg-blue-600 rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    <Linkedin className="w-5 h-5 text-blue-400 group-hover:text-white" />
                    <span className="text-sm group-hover:text-white">LinkedIn</span>
                  </a>
                  
                  <a 
                    href="https://github.com/Dhayanithi-545" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group flex items-center gap-2 p-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    <Github className="w-5 h-5 text-gray-400 group-hover:text-white" />
                    <span className="text-sm group-hover:text-white">GitHub</span>
                  </a>
                  
                  <a 
                    href="https://x.com/Dhayanithi545" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group flex items-center gap-2 p-3 bg-gray-800 hover:bg-blue-500 rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    <Twitter className="w-5 h-5 text-blue-400 group-hover:text-white" />
                    <span className="text-sm group-hover:text-white">Twitter</span>
                  </a>
                  
                  <a 
                    href="https://www.instagram.com/dhaya_545" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group flex items-center gap-2 p-3 bg-gray-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    <Instagram className="w-5 h-5 text-pink-400 group-hover:text-white" />
                    <span className="text-sm group-hover:text-white">Instagram</span>
                  </a>
                </div>

                {/* Creator Info */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-4 rounded-xl border border-gray-600">
                  <p className="text-sm text-gray-300 flex items-center gap-2">
                    © 2025 LevelUp
                  </p>
                  <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                    Built with <Heart className="w-4 h-4 text-red-500 animate-pulse" /> by 
                    <span className="text-indigo-400 font-semibold ml-1">Dhaya</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-800 py-8 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>Made with passion in India</span>
                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                <span>Building better habits, one day at a time</span>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  All systems operational
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Enhanced Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white p-4 rounded-2xl shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-110 z-50"
      >
        <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300" />
      </button>
        </div>
    );
}


export default LandingPage;