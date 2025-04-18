import React, { useEffect, useState } from 'react';
import axios from '../services/axios';
import DashboardGreetingCard from '../components/DashboardGreetingCard';
import QuoteBox from '../components/QuoteBox';
import HabitCard from '../components/HabitCard';
import AddHabitModal from '../components/AddHabitModal'; // yet to create

const Dashboard = () => {
  const [user, setUser] = useState({ name: '' });
  const [streak, setStreak] = useState(0);
  const [badge, setBadge] = useState('none');
  const [habits, setHabits] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchHabits = async () => {
    try {
      const res = await axios.get('/api/habits'); // adjust endpoint
      const habits = res.data.habits || [];
      setHabits(habits.slice(0, 3));
      if (habits.length > 0) {
        setBadge(habits[0].badge);
      }
    } catch (err) {
      console.log("Error loading habits:", err);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get('/user/profile'); // This hits: http://localhost:5454/api/user/profile
      if (res.data?.user) {
        setUser(res.data.user);
      } else {
        console.error("User not found in response:", res.data);
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };
  

  const fetchStreak = async () => {
    const res = await axios.get('/api/habits/streak');
    setStreak(res.data.totalStreak);
  };

  useEffect(() => {
    fetchUser();
    fetchHabits();
    fetchStreak();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <DashboardGreetingCard name={user?.name || ''} streak={streak} badge={badge} />
      <QuoteBox />
      <button
        className="px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl text-lg font-semibold transition-all shadow-md mb-4"
        onClick={() => setShowModal(true)}
      >
        ➕ Add Habit
      </button>

      {habits.map((habit) => (
        <HabitCard key={habit._id} habit={habit} />
      ))}

      {showModal && <AddHabitModal onClose={() => setShowModal(false)} onHabitAdded={fetchHabits} />}
    </div>
  );
};

export default Dashboard;
