// src/components/EditHabitModal.jsx
import React, { useState } from 'react';
import axios from '../services/axios';

const EditHabitModal = ({ habit, onClose, refresh }) => {
  const [formData, setFormData] = useState({
    title: habit.title,
    description: habit.description,
    targetPerDay: habit.targetPerDay,
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/habits/update/${habit._id}`, formData);
      refresh();
      onClose();
    } catch (err) {
      console.error("Error updating habit:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800">Edit Habit</h2>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="targetPerDay"
          type="number"
          value={formData.targetPerDay}
          onChange={handleChange}
          placeholder="Target per Day"
          className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex justify-end space-x-3 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300 transition">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditHabitModal;
