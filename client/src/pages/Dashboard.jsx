import React, { useEffect, useState } from 'react';
import axios from '../services/axios';
import DashboardGreetingCard from '../components/DashboardGreetingCard';
import QuoteBox from '../components/QuoteBox';
import HabitCard from '../components/HabitCard';
import AddHabitModal from '../components/AddHabitModal';

const Dashboard = () => {
  const [user, setUser] = useState({ name: '' });
  const [streak, setStreak] = useState(0);
  const [badge, setBadge] = useState('none');
  const [habits, setHabits] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filterType, setFilterType] = useState('today'); // Default to today's habits
  const [activeFilter, setActiveFilter] = useState('');
  const [averageProgress, setAverageProgress] = useState(0);

  const fetchHabits = async () => {
    try {
      const res = await axios.get('/habits/all-habits');
      const fetchedHabits = res.data.habits || [];

      const sortedHabits = fetchedHabits
        .filter(h => !h.isArchived)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setHabits(sortedHabits);

      if (sortedHabits.length > 0) {
        setBadge(sortedHabits[0].badge);
      }
    } catch (err) {
      console.log("Error loading habits:", err);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get('/auth/profile');
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
    try {
      const res = await axios.get('/habits/total-streak');
      setStreak(res.data.totalStreak);
      setAverageProgress(parseFloat(res.data.averageProgress) || 0);
    } catch (err) {
      console.error("Error fetching streak:", err);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchHabits();
    fetchStreak();
  }, []);

  const getCurrentTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    return 'evening';
  };

  const isToday = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);

    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Get filtered habits based on current filter
  const getFilteredHabits = () => {
    if (filterType === 'all') return habits;
    if (filterType === 'today') {
      return habits.filter(habit => isToday(habit.createdAt));
    }
    if (filterType === 'category') {
      return habits.filter(habit => habit.category === activeFilter);
    }
    if (filterType === 'time') {
      return habits.filter(habit => habit.preferredTime === activeFilter);
    }
    return habits;
  };

  const handleFilter = (type, value) => {
    // If clicking on the same filter, do nothing
    if (filterType === type && activeFilter === value) {
      return;
    }
    
    setFilterType(type);
    setActiveFilter(value);
  };

  const categories = [...new Set(habits.map(habit => habit.category))];
  const filteredHabits = getFilteredHabits();
  const hasHabitsToShow = filteredHabits.length > 0;

  // Function to check if there are any habits added today
  const hasTodaysHabits = habits.some(habit => isToday(habit.createdAt));

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <DashboardGreetingCard name={user?.name || ''} streak={streak} badge={badge} progress={averageProgress} />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <QuoteBox />
        <button
          className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-xl text-lg font-semibold transition-all shadow-md flex items-center"
          onClick={() => setShowModal(true)}
        >
          Add New Habit
        </button>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Filter Habits</h3>

        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => handleFilter('today', '')}
            className={`px-4 py-2 rounded-xl text-sm transition ${
              filterType === 'today' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Today's Habits
          </button>

          <button
            onClick={() => handleFilter('all', '')}
            className={`px-4 py-2 rounded-xl text-sm transition ${
              filterType === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Habits
          </button>

          {/* Time filters */}
          <button
            onClick={() => handleFilter('time', 'morning')}
            className={`px-4 py-2 rounded-xl text-sm transition flex items-center ${
              filterType === 'time' && activeFilter === 'morning'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } ${getCurrentTimeOfDay() === 'morning' ? 'ring-2 ring-orange-300' : ''}`}
          >
            🌅 Morning
          </button>

          <button
            onClick={() => handleFilter('time', 'afternoon')}
            className={`px-4 py-2 rounded-xl text-sm transition flex items-center ${
              filterType === 'time' && activeFilter === 'afternoon'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } ${getCurrentTimeOfDay() === 'afternoon' ? 'ring-2 ring-orange-300' : ''}`}
          >
            ☀️ Afternoon
          </button>

          <button
            onClick={() => handleFilter('time', 'evening')}
            className={`px-4 py-2 rounded-xl text-sm transition flex items-center ${
              filterType === 'time' && activeFilter === 'evening'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } ${getCurrentTimeOfDay() === 'evening' ? 'ring-2 ring-orange-300' : ''}`}
          >
            🌙 Evening
          </button>
        </div>

        {/* Category filters */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilter('category', category)}
                className={`px-4 py-2 rounded-xl text-sm transition ${
                  filterType === 'category' && activeFilter === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                #{category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Habits Grid or Empty State */}
      {hasHabitsToShow ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {filteredHabits.map((habit) => (
            <HabitCard key={habit._id} habit={habit} refresh={fetchHabits} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {filterType === 'today' ? "No habits added today" : "No habits found"}
            </h3>
            <p className="text-gray-600">
              {filterType === 'today' 
                ? "Start your day right by adding a new habit to track" 
                : "Try a different filter or add your first habit"}
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all shadow-md"
          >
            Add Your First Habit
          </button>
        </div>
      )}

      {showModal && (
        <AddHabitModal onClose={() => setShowModal(false)} onHabitAdded={fetchHabits} />
      )}
    </div>
  );
};

export default Dashboard;