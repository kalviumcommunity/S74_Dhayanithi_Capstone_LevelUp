// src/components/HabitDetailsModal.jsx
import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const HabitDetailsModal = ({ isOpen, onClose, habit, refresh }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetPerDay, setTargetPerDay] = useState(1);

  useEffect(() => {
    if (habit) {
      setTitle(habit.title);
      setDescription(habit.description);
      setTargetPerDay(habit.targetPerDay);
    }
  }, [habit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/habits/edit/${habit._id}`, {
        title,
        description,
        targetPerDay,
      });
      refresh();
      onClose();
    } catch (err) {
      console.error('Error updating habit:', err);
    }
  };

  if (!isOpen || !habit) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Habit</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-700">Title:</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-gray-700">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-gray-700">Target per day:</label>
            <input
              type="number"
              value={targetPerDay}
              onChange={(e) => setTargetPerDay(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none"
              min={1}
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HabitDetailsModal;
