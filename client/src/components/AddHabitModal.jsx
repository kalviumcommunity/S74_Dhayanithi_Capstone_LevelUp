import React, { useState } from 'react';
import axios from '../services/axios';

const AddHabitModal = ({ onClose, onHabitAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('other');
  const [motivation, setMotivation] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [targetPerDay, setTargetPerDay] = useState(1);
  const [preferredTime, setPreferredTime] = useState('anytime');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newHabit = {
      title,
      description,
      category,
      motivation,
      frequency,
      targetPerDay,
      preferredTime,
      startDate: new Date(startDate),
    };

    try {
      await axios.post('/habits/create', newHabit);
      onHabitAdded();
      onClose();
    } catch (error) {
      console.error('Error adding habit:', error);
    }
  };

  return (
   
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-opacity-40 backdrop-blur-md  bg-opacity-50">

      <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm mx-auto p-4 sm:p-5 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 text-center">Create New Habit</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Habit Name */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Habit Name*
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="What habit do you want to build?"
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800"
            />
          </div>

          {/* Category & Frequency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-gray-800 focus:ring-2 focus:ring-blue-500"
              >
                <option value="health">Health</option>
                <option value="fitness">Fitness</option>
                <option value="learning">Learning</option>
                <option value="productivity">Productivity</option>
                <option value="mindfulness">Mindfulness</option>
                <option value="social">Social</option>
                <option value="finance">Finance</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
                Frequency
              </label>
              <select
                id="frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-gray-800 focus:ring-2 focus:ring-blue-500"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>

          {/* Target Per Day & Preferred Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="targetPerDay" className="block text-sm font-medium text-gray-700 mb-1">
                Target per Day
              </label>
              <input
                type="number"
                id="targetPerDay"
                value={targetPerDay}
                onChange={(e) => setTargetPerDay(Number(e.target.value))}
                min="1"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-gray-800 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-1">
                Best Time
              </label>
              <select
                id="preferredTime"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-gray-800 focus:ring-2 focus:ring-blue-500"
              >
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
                <option value="anytime">Anytime</option>
              </select>
            </div>
          </div>

          {/* Start Date */}
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-gray-800 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description (optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="2"
              placeholder="Describe your habit in more detail"
              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-gray-800 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Personal Motivation */}
          <div>
            <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-1">
              Personal Motivation
            </label>
            <textarea
              id="motivation"
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              rows="2"
              placeholder="Why is this habit important to you?"
              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-gray-800 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-md"
            >
              Create Habit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHabitModal;
