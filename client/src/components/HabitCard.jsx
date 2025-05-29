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

  // Function to get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'health': 
        return '❤️';
      case 'fitness':
        return '💪';
      case 'learning':
        return '📚';
      case 'productivity':
        return '⚡';
      case 'mindfulness':
        return '🧘';
      case 'social':
        return '👥';
      case 'finance':
        return '💰';
      default:
        return '✨';
    }
  };

  // Function to get time icon
  const getTimeIcon = (time) => {
    switch (time) {
      case 'morning':
        return '🌅';
      case 'afternoon':
        return '☀️';
      case 'evening':
        return '🌙';
      default:
        return '⏱️';
    }
  };

  // Function to handle habit completion
  const handleComplete = async () => {
    try {
      await axios.put(`/habits/complete/${habit._id}`);
      refresh();
    } catch (err) {
      console.error("Error completing habit:", err);
    }
  };

  // Function to handle habit archive
  const handleArchive = async () => {
    try {
      await axios.put(`/habits/archive/${habit._id}`);
      refresh();
      setShowMenu(false);
    } catch (err) {
      console.error("Error archiving habit:", err);
    }
  };

  // Function to handle habit deletion
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this habit? This action cannot be undone.')) {
      try {
        await axios.delete(`/habits/${habit._id}`);
        refresh();
        setShowMenu(false);
      } catch (err) {
        console.error("Error deleting habit:", err);
      }
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Calculate progress percentage
  const progressPercentage = (habit.completedToday / habit.targetPerDay) * 100;
  
  // Format date for display 
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Calculate days since start date
  const getDaysSinceStart = () => {
    const startDate = new Date(habit.startDate);
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
        {/* Progress Bar */}
        <div className="h-2 bg-gray-200">
          <div 
            className={`h-full ${progressPercentage >= 100 ? 'bg-green-500' : 'bg-blue-500'}`} 
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          ></div>
        </div>
        
        <div className="p-5">
          {/* Menu Button */}
          <div className="absolute top-3 right-3" ref={menuRef}>
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
            
            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute right-0 mt-1 w-48 rounded-xl bg-white shadow-lg z-10 border border-gray-100 overflow-hidden">
                <ul className="py-1">
                  <li>
                    <button 
                      onClick={() => {
                        setShowDetailsModal(true);
                        setShowMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      Details
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => {
                        setShowEditModal(true);
                        setShowMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      Edit
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={handleArchive}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                        <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                      Archive
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={handleDelete}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          
          {/* Category & Badge Row */}
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <span className="mr-2 text-lg">{getCategoryIcon(habit.category)}</span>
              <span className="text-sm font-medium text-gray-600 capitalize">{habit.category}</span>
            </div>
            {habit.badge !== 'none' && (
              <div className="flex items-center">
                {habit.badge === 'gold' && <span className="text-yellow-500">🏆</span>}
                {habit.badge === 'silver' && <span className="text-gray-400">🥈</span>}
                {habit.badge === 'bronze' && <span className="text-amber-600">🥉</span>}
              </div>
            )}
          </div>
          
          {/* Title */}
          <h3 className="font-bold text-xl text-gray-800 mb-2">{habit.title}</h3>
          
          {/* Description */}
          {habit.description && (
            <p className="text-gray-600 text-sm mb-3">{habit.description}</p>
          )}
          
          {/* Progress Row */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-700">
              <span className="font-medium">{habit.completedToday}</span>
              <span className="text-gray-500"> / {habit.targetPerDay} completed</span>
            </div>
            <div className="text-sm font-medium">
              {habit.currentStreak > 0 && (
                <span className="text-orange-500 flex items-center">
                  <span className="mr-1">🔥</span> 
                  {habit.currentStreak} {habit.currentStreak === 1 ? 'day' : 'days'}
                </span>
              )}
            </div>
          </div>
          
          {/* Info Row with Best Streak */}
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-4">
            <div className="flex items-center">
              <span className="mr-1">{getTimeIcon(habit.preferredTime)}</span>
              <span className="capitalize">{habit.preferredTime}</span>
            </div>
            <div className="text-right">
              Started {formatDate(habit.startDate)}
            </div>
            <div>
              {getDaysSinceStart()} days tracked
            </div>
            {habit.bestStreak > 0 && (
              <div className="text-right">
                Best streak: <span className="font-medium">{habit.bestStreak}</span> days
              </div>
            )}
          </div>
          
          {/* Motivation (collapsible) */}
          {habit.motivation && (
            <div className="mb-4">
              <button 
                onClick={() => setShowMotivation(!showMotivation)} 
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                {showMotivation ? 'Hide motivation' : 'Show motivation'}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 ml-1 transform ${showMotivation ? 'rotate-180' : ''} transition-transform`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showMotivation && (
                <div className="mt-2 p-3 bg-blue-50 rounded-xl text-sm text-gray-700 italic">
                  "{habit.motivation}"
                </div>
              )}
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex justify-between pt-2">
            <button 
              onClick={() => setShowDetailsModal(true)} 
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 text-sm transition flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h2a1 1 0 000-2H9z" clipRule="evenodd" />
              </svg>
              Details
            </button>
            
            <button 
              onClick={handleComplete} 
              className={`px-4 py-2 rounded-xl text-white text-sm font-medium transition shadow-sm flex items-center
                ${progressPercentage >= 100 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {progressPercentage >= 100 ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Completed
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                  </svg>
                  Mark Complete
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Edit Modal */}
      {showEditModal && (
        <EditHabitModal 
          habit={habit} 
          onClose={() => setShowEditModal(false)} 
          refresh={refresh} 
        />
      )}

      {/* Details Modal */}
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