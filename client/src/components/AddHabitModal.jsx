import React, { useState } from 'react';
import axios from '../services/axios';  // Adjust based on your axios setup

const AddHabitModal = ({ onClose, onHabitAdded }) => {
  // States for form inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [targetPerDay, setTargetPerDay] = useState(1);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Prepare habit data
    const newHabit = {
      title,
      description,
      frequency,
      targetPerDay,
    };

    try {
      // Make POST request to backend to create the habit
      await axios.post('/habits/create', newHabit);
      onHabitAdded(); // Call the function passed from the parent to reload the habit list
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error adding habit:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Add New Habit</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description (optional)</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">Frequency</label>
            <select
              id="frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="targetPerDay" className="block text-sm font-medium text-gray-700">Target per day</label>
            <input
              type="number"
              id="targetPerDay"
              value={targetPerDay}
              onChange={(e) => setTargetPerDay(Number(e.target.value))}
              min="1"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Add Habit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHabitModal;
