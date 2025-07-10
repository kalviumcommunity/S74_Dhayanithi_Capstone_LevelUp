import React from 'react';
import axios from '../services/axios';

const ArchivedHabits = ({ habits, refresh }) => {
  const handleUnarchive = async (id) => {
    try {
      await axios.put(`/habits/archive/${id}`, { unarchive: true });
      refresh();
    } catch (err) {
      console.error("Failed to unarchive habit:", err);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Archived Habits</h2> 
      <div className="grid gap-4">
        {habits.map(habit => (
          <div key={habit._id} className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-700">{habit.title}</h3>
            <p className="text-gray-600">{habit.description}</p>
            <p className="text-sm text-gray-500 mt-1">Current Streak: <span className="font-medium text-blue-600">{habit.currentStreak}</span></p>
            <button
              onClick={() => handleUnarchive(habit._id)}
              className="mt-3 px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition"
            >
              Unarchive
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchivedHabits;