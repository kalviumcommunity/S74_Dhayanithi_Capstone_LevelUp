import React from 'react';
import axios from '../services/axios';

const HabitCard = ({ habit, refresh, openEdit }) => {
  const percentage = Math.min(100, Math.floor((habit.completedToday / habit.targetPerDay) * 100));

  const handleComplete = async () => {
    try {
      await axios.put(`/habits/complete/${habit._id}`);
      refresh();
    } catch (err) {
      console.error("Failed to mark complete:", err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this habit?")) return;
    try {
      await axios.delete(`/habits/delete/${habit._id}`);
      refresh();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleArchive = async () => {
    try {
      await axios.put(`/habits/archive/${habit._id}`);
      refresh();
    } catch (err) {
      console.error("Archive failed:", err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 transition hover:shadow-lg border border-gray-100">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{habit.title}</h3>
          <p className="text-gray-600">{habit.description}</p>
          <p className="text-sm text-gray-500 mt-1">Streak: <span className="text-blue-600 font-medium">{habit.currentStreak}</span></p>
        </div>
        <div className="space-x-2">
          <button onClick={() => openEdit(habit)} className="text-sm text-blue-600 hover:underline">Edit</button>
          <button onClick={handleDelete} className="text-sm text-red-500 hover:underline">Delete</button>
        </div>
      </div>

      <div className="mt-4">
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            style={{ width: `${percentage}%` }}
            className={`h-full transition-all duration-300 rounded-full ${percentage >= 100 ? 'bg-green-500' : 'bg-gradient-to-r from-blue-400 to-purple-500'}`}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">{habit.completedToday}/{habit.targetPerDay} completed today</p>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={handleComplete}
          className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition text-sm"
        >
          Mark Complete
        </button>
        <button
          onClick={handleArchive}
          className="px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition text-sm"
        >
          Archive
        </button>
      </div>
    </div>
  );
};

export default HabitCard;