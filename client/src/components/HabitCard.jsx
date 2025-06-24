import React, { useState, useRef, useEffect } from 'react';
import axios from '../services/axios';
import EditHabitModal from './EditHabitModal';
import HabitDetailsModal from './HabitDetailsModal';

const HabitCard = ({ habit, refresh }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showMotivation, setShowMotivation] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleComplete = async () => {
    try {
      await axios.put(`/habits/complete/${habit._id}`);
      refresh();
    } catch (err) {
      console.error("Error completing habit:", err);
    }
  };

  const handleArchive = async () => {
    try {
      await axios.put(`/habits/archive/${habit._id}`);
      refresh();
      setShowMenu(false);
    } catch (err) {
      console.error("Error archiving habit:", err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      try {
        await axios.delete(`/habits/${habit._id}`);
        refresh();
        setShowMenu(false);
      } catch (err) {
        console.error("Error deleting habit:", err);
      }
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'health': return '❤️';
      case 'fitness': return '💪';
      case 'learning': return '📚';
      case 'productivity': return '⚡';
      case 'mindfulness': return '🧘';
      case 'social': return '👥';
      case 'finance': return '💰';
      default: return '✨';
    }
  };

  const getTimeIcon = (time) => {
    switch (time) {
      case 'morning': return '🌅';
      case 'afternoon': return '☀️';
      case 'evening': return '🌙';
      default: return '⏱️';
    }
  };

  const progressPercentage = (habit.completedToday / habit.targetPerDay) * 100;
  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });

  const getDaysSinceStart = () => {
    const start = new Date(habit.startDate);
    const now = new Date();
    return Math.ceil((now - start) / (1000 * 60 * 60 * 24));
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden flex flex-col h-full">
        <div className="h-2 bg-gray-200">
          <div
            className={`h-full ${progressPercentage >= 100 ? 'bg-green-500' : 'bg-blue-500'}`}
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          ></div>
        </div>

        {/* Card Content */}
        <div className="p-5 flex flex-col justify-between flex-grow relative">

          {/* Menu */}
          <div className="absolute top-3 right-3 z-10" ref={menuRef}>
            <button onClick={() => setShowMenu(!showMenu)} className="text-gray-600 hover:text-black p-1 rounded-full hover:bg-gray-100">
              ⋮
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-1 w-40 rounded-xl bg-white shadow border text-sm z-20">
                <button onClick={() => { setShowDetailsModal(true); setShowMenu(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100">Details</button>
                <button onClick={() => { setShowEditModal(true); setShowMenu(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100">Edit</button>
                <button onClick={handleArchive} className="w-full text-left px-4 py-2 hover:bg-gray-100">Archive</button>
                <button onClick={handleDelete} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50">Delete</button>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col">
            {/* Category + Badge */}
            <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <span>{getCategoryIcon(habit.category)}</span>
                <span className="capitalize">{habit.category}</span>
              </div>
              {habit.badge !== 'none' && (
                <span>
                  {habit.badge === 'gold' && '🏆'}
                  {habit.badge === 'silver' && '🥈'}
                  {habit.badge === 'bronze' && '🥉'}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-gray-800 mb-2">{habit.title}</h3>

            {/* Description */}
            <div className="text-sm text-gray-600 min-h-[40px] mb-2">
              {habit.description || <span className="italic text-gray-400">No description</span>}
            </div>

            {/* Progress Info */}
            <div className="flex justify-between text-sm mb-2">
              <span>{habit.completedToday} / {habit.targetPerDay} done</span>
              {habit.currentStreak > 0 && <span className="text-orange-500">🔥 {habit.currentStreak} days</span>}
            </div>

            {/* Grid Info */}
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-2">
              <div className="flex items-center space-x-1">
                <span>{getTimeIcon(habit.preferredTime)}</span>
                <span className="capitalize">{habit.preferredTime}</span>
              </div>
              <div className="text-right">Started {formatDate(habit.startDate)}</div>
              <div>{getDaysSinceStart()} days tracked</div>
              {habit.bestStreak > 0 ? (
                <div className="text-right">Best: {habit.bestStreak} days</div>
              ) : <div className="text-right">–</div>}
            </div>

            {/* Motivation */}
            <div className="mb-4 mt-auto min-h-[40px]">
              {habit.motivation ? (
                <>
                  <button onClick={() => setShowMotivation(!showMotivation)} className="text-blue-600 hover:text-blue-800 text-sm">
                    {showMotivation ? 'Hide motivation' : 'Show motivation'}
                  </button>
                  {showMotivation && (
                    <div className="mt-1 text-sm text-gray-700 bg-blue-50 p-2 rounded">
                      "{habit.motivation}"
                    </div>
                  )}
                </>
              ) : <div className="text-xs text-gray-400">No motivation added</div>}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center mt-3 pt-3 border-t text-sm">
            <button
              onClick={() => setShowDetailsModal(true)}
              className="text-gray-700 hover:underline"
            >
              View
            </button>
            <button
              onClick={handleComplete}
              className={`px-3 py-1 rounded-lg text-white ${progressPercentage >= 100 ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              {progressPercentage >= 100 ? 'Completed' : 'Mark Complete'}
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showEditModal && <EditHabitModal habit={habit} onClose={() => setShowEditModal(false)} refresh={refresh} />}
      {showDetailsModal && (
        <HabitDetailsModal
          habit={habit}
          onClose={() => setShowDetailsModal(false)}
          onEdit={() => {
            setShowDetailsModal(false);
            setShowEditModal(true);
          }}
          refresh={refresh}
        />
      )}
    </>
  );
};

export default HabitCard;
