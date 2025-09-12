import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Edit,
  Save,
  XCircle,
  Linkedin,
  Instagram,
  Twitter,
  Youtube,
  Github,
  CheckCircle,
  ListTodo,
  Camera,
} from "lucide-react";

const LOCAL_KEY = "profile_extra";

// --- Configuration for Animal Avatars ---
const animalAvatars = [
    { name: 'Lion', url: 'https://img.icons8.com/color/96/lion.png' },
    { name: 'Tiger', url: 'https://static.vecteezy.com/system/resources/previews/058/464/447/non_2x/closeup-portrait-of-a-tigers-face-fierce-feline-wildlife-animal-big-cat-orange-and-black-png.png' },
    { name: 'Bear', url: 'https://img.icons8.com/color/96/bear.png' },
    { name: 'Eagle', url: 'https://static.vecteezy.com/system/resources/previews/057/350/767/non_2x/side-profile-of-a-majestic-bald-eagle-free-png.png' },
    { name: 'Wolf', url: 'https://img.icons8.com/color/96/wolf.png' },
    { name: 'Fox', url: 'https://img.icons8.com/color/96/fox.png' },
    { name: 'Gorilla', url: 'https://img.icons8.com/color/96/gorilla.png' },
    { name: 'Bison', url: 'https://static.vecteezy.com/system/resources/previews/042/410/694/non_2x/collection-of-american-bison-bull-head-logo-designs-isolated-png.png   ' },
    { name: 'Rhinoceros', url: 'https://img.icons8.com/color/96/rhinoceros.png' },
    { name: 'Leopard', url: 'https://img.icons8.com/color/96/leopard.png' },
    { name: 'Falcon', url: 'https://img.icons8.com/color/96/falcon.png' },
    { name: 'Panda', url: 'https://img.icons8.com/color/96/panda.png' },
    { name: 'Koala', url: 'https://pngimg.com/d/koala_PNG114252.png' },
    { name: 'Sloth', url: 'https://img.icons8.com/color/96/sloth.png' },
    { name: 'Penguin', url: 'https://pngimg.com/d/madagascar_penguins_PNG35.png' },
    { name: 'Dolphin', url: 'https://img.icons8.com/color/96/dolphin.png' },
    { name: 'Shark', url: 'https://cdn.pixabay.com/photo/2022/12/04/01/04/shark-7633574_640.png' },
    { name: 'Turtle', url: 'https://img.icons8.com/color/96/turtle.png' },
    { name: 'Dragon', url: 'https://img.icons8.com/color/96/dragon.png' },
    { name: 'Phoenix', url: 'https://static.vecteezy.com/system/resources/thumbnails/022/246/411/small_2x/mystical-mythical-character-phoenix-phoenix-bird-on-a-transparent-background-phoenix-logo-generative-ai-png.png' },
    { name: 'Griffin', url: 'https://png.pngtree.com/png-clipart/20240907/original/pngtree-griffin-mythology-creature-with-eagle-head-lion-png-image_15954643.png' },
    { name: 'Unicorn', url: 'https://img.icons8.com/color/96/unicorn.png' },
    { name: 'Snake', url: 'https://img.icons8.com/color/96/snake.png' },
    { name: 'Parrot', url: 'https://img.icons8.com/color/96/parrot.png' },
    { name: 'Peacock', url: 'https://img.icons8.com/color/96/peacock.png' }
];

// --- Social Media Configuration ---
const socialLinksConfig = [
  { key: "linkedin", icon: <Linkedin size={22} />, color: "text-blue-700", placeholder: "LinkedIn profile URL" },
  { key: "instagram", icon: <Instagram size={22} />, color: "text-pink-500", placeholder: "Instagram profile URL" },
  { key: "x", icon: <Twitter size={22} />, color: "text-gray-800", placeholder: "X (Twitter) profile URL" },
  { key: "youtube", icon: <Youtube size={22} />, color: "text-red-600", placeholder: "YouTube channel URL" },
  { key: "github", icon: <Github size={22} />, color: "text-gray-900", placeholder: "GitHub profile URL" },
];

// --- Avatar Selection Modal ---
const AvatarModal = ({ isOpen, onClose, onSelect, currentAvatar }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Choose Your Spirit Animal</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    {animalAvatars.map((avatar) => (
                        <div key={avatar.name} onClick={() => onSelect(avatar.url)} className="cursor-pointer group aspect-square">
                            <img
                                src={avatar.url}
                                alt={avatar.name}
                                className={`w-full h-full object-cover rounded-xl border-4 transition-all duration-300 ${currentAvatar === avatar.url ? 'border-indigo-500 scale-105 shadow-lg' : 'border-transparent group-hover:border-indigo-300 group-hover:scale-105'}`}
                            />
                            <p className="text-center text-sm font-semibold mt-2 text-gray-600 group-hover:text-indigo-600">{avatar.name}</p>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-6">
                    <button onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">Close</button>
                </div>
            </div>
        </div>
    );
};

// --- Helper function to format URLs correctly ---
const formatUrl = (url) => {
  if (!url) return '#';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `https://${url}`;
};

const Profile = ({ user, habits = [] }) => {
  const [showCompleted, setShowCompleted] = useState(true);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  // --- State Management ---
  const [editMode, setEditMode] = useState(false);
  const [extra, setExtra] = useState({
    description: "", avatar: "", linkedin: "", instagram: "", x: "", youtube: "", github: "",
  });
  const [tempExtra, setTempExtra] = useState(extra);

  // --- LocalStorage Effects ---
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LOCAL_KEY + (user?.userId || ""));
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setExtra(parsed);
          setTempExtra(parsed);
        } catch (error) { console.error("Failed to parse profile data", error); }
      }
    }
  }, [user]);

  const handleSave = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_KEY + (user?.userId || ""), JSON.stringify(tempExtra));
      setExtra(tempExtra);
      setEditMode(false);
    }
  };

  
  const handleCancel = () => { setTempExtra(extra); setEditMode(false); };
  const handleEdit = () => { setTempExtra(extra); setEditMode(true); };
  const handleInputChange = (key, value) => setTempExtra(prev => ({ ...prev, [key]: value }));
  const handleAvatarSelect = (avatarUrl) => {
      setTempExtra(prev => ({...prev, avatar: avatarUrl}));
      setIsAvatarModalOpen(false);
  }

  
  if (!user) {
    return (
      <div className="bg-slate-100 min-h-screen flex items-center justify-center">
          <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl text-center">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Profile</h2>
              <p className="text-gray-500">No user data available. Please log in.</p>
          </div>
      </div>
    );
  }

  
  const totalHabits = habits.length;
  const completedHabits = habits.filter(h => h.completedToday);
  const completionPercentage = totalHabits > 0 ? (completedHabits.length / totalHabits) * 100 : 0;

  return (
    <>
      <AvatarModal isOpen={isAvatarModalOpen} onClose={() => setIsAvatarModalOpen(false)} onSelect={handleAvatarSelect} currentAvatar={tempExtra.avatar} />
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Profile & About */}
          <div className="lg:col-span-1 space-y-8">
            {/* --- Profile Header Card --- */}
            <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/50 text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                    {editMode ? (
                        <div className="relative group">
                            <img src={tempExtra.avatar || `https://placehold.co/128x128/E0E7FF/4F46E5?text=${user.name ? user.name.charAt(0).toUpperCase() : "U"}`} alt="Profile" className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-white"/>
                            <button onClick={() => setIsAvatarModalOpen(true)} className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera size={24} />
                            </button>
                        </div>
                    ) : (
                        <img src={extra.avatar || `https://placehold.co/128x128/E0E7FF/4F46E5?text=${user.name ? user.name.charAt(0).toUpperCase() : "U"}`} alt="Profile" className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-white"/>
                    )}
                </div>
                <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                <p className="text-gray-500 mt-1">{user.email}</p>
                {!editMode && <div className="mt-6 flex justify-center items-center space-x-5">
                    {socialLinksConfig.map(social => extra[social.key] ? (
                        <a key={social.key} href={formatUrl(extra[social.key])} target="_blank" rel="noopener noreferrer" className={`${social.color} hover:scale-125 transition-transform`} title={social.key}>
                            {social.icon}
                        </a>) : null
                    )}
                </div>}
            </div>

            {/* --- About Section Card --- */}
            <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/50">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">About Me</h2>
                    {!editMode && <button onClick={handleEdit} className="flex items-center space-x-2 px-3 py-1.5 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"><Edit size={14} /><span>Edit Profile</span></button>}
                </div>

                {editMode ? (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
                            <textarea className="w-full border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 transition" rows={4} value={tempExtra.description} onChange={e => handleInputChange("description", e.target.value)} />
                        </div>
                        {socialLinksConfig.map(social => (
                            <div key={social.key}>
                                <label className="block text-sm font-medium text-gray-600 mb-1">{social.placeholder}</label>
                                <input className="w-full border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 transition" type="url" value={tempExtra[social.key]} onChange={e => handleInputChange(social.key, e.target.value)} />
                            </div>
                        ))}
                        <div className="flex items-center space-x-3 pt-2">
                            <button onClick={handleSave} className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-sm hover:shadow-md"><Save size={16} /><span>Save</span></button>
                            <button onClick={handleCancel} className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"><XCircle size={16} /><span>Cancel</span></button>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-700 min-h-[6rem]">{extra.description || <span className="text-gray-400 italic">No description.</span>}</p>
                )}
            </div>
          </div>
          
          {/* Right Column: Habits */}
          <div className="lg:col-span-2 bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/50">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Today's Habits</h2>
            <div>
                <div className="flex justify-between items-center mb-1 text-sm font-medium">
                    <span className="text-gray-600">Daily Progress</span>
                    <span className="text-indigo-600 font-semibold">{`${completedHabits.length} / ${totalHabits} completed`}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-gradient-to-r from-green-400 to-teal-500 h-3 rounded-full transition-all duration-500 ease-out" style={{ width: `${completionPercentage}%` }}></div></div>
            </div>
            <div className="mt-6">
                <div className="border-b border-gray-200"><nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    <button onClick={() => setShowCompleted(true)} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${showCompleted ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Completed ({completedHabits.length})</button>
                    <button onClick={() => setShowCompleted(false)} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${!showCompleted ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Incomplete ({habits.length - completedHabits.length})</button>
                </nav></div>
                <div className="mt-4 space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                    {showCompleted ? (completedHabits.length > 0 ? (completedHabits.map((h, i) => (<div key={i} className="flex items-center space-x-4 p-3 rounded-lg bg-green-50/50"><CheckCircle size={20} className="text-green-500 flex-shrink-0" /><span>{h.title}</span></div>))) : (<p className="text-gray-400 italic text-sm p-3">No habits completed yet.</p>)) : (habits.length - completedHabits.length > 0 ? (habits.filter(h=>!h.completedToday).map((h, i) => (<div key={i} className="flex items-center space-x-4 p-3 rounded-lg bg-orange-50/50"><ListTodo size={20} className="text-orange-500 flex-shrink-0" /><span>{h.title}</span></div>))) : (<p className="text-gray-400 italic text-sm p-3">All habits are completed! Great job! 🎉</p>))}
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
