import React, { useEffect, useState } from 'react';
import HabitCard from '../components/HabitCard.jsx';
import FilterBar from '../components/FilterBar.jsx';
import ArchivedHabits from '../components/ArchivedHabits.jsx';
import EditHabitModal from '../components/EditHabitModal.jsx';
import axios from '../services/axios';

const MyHabits = () => {
  const [habits, setHabits] = useState([]);
  const [archivedHabits, setArchivedHabits] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
  const [filterType, setFilterType] = useState('latest');
  const [editingHabit, setEditingHabit] = useState(null);

  const fetchHabits = async () => {
    try {
      const res = await axios.get('/habits/all-habits');
      const all = res.data.habits || [];

      const active = all.filter(h => !h.isArchived); // Updated to use isArchived
      const archived = all.filter(h => h.isArchived); // Updated to use isArchived

      setHabits(active);
      setArchivedHabits(archived);
    } catch (err) {
      console.error('Error fetching habits', err);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const openEdit = (habit) => {
    setEditingHabit(habit);
  };

  const filteredHabits = habits.sort((a, b) => {
    switch (filterType) {
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'completed':
        return b.completedToday - a.completedToday;
      case 'notCompleted':
        return a.completedToday - b.completedToday;
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Habits</h1>
        <button
          onClick={() => setShowArchived(!showArchived)}
          className="bg-gray-100 px-4 py-2 rounded-xl hover:bg-gray-200"
        >
          {showArchived ? 'Hide Archived' : 'Show Archived'}
        </button>
      </div>

      <FilterBar filterType={filterType} setFilterType={setFilterType} />

      <div className="grid gap-4 mt-4">
        {filteredHabits.map(habit => (
          <HabitCard
            key={habit._id}
            habit={habit}
            refresh={fetchHabits}
            openEdit={openEdit}
          />
        ))}
      </div>

      {showArchived && (
        <ArchivedHabits habits={archivedHabits} refresh={fetchHabits} />
      )}

      {editingHabit && (
        <EditHabitModal
          habit={editingHabit}
          onClose={() => setEditingHabit(null)}
          refresh={fetchHabits}
        />
      )}
    </div>
  );
};

export default MyHabits;