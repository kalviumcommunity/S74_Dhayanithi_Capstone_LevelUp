import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const HabitDetailsModal = ({ habit, onClose, refresh, onEdit, onArchive, onDelete }) => {
  // State for analytics
  const [analytics, setAnalytics] = useState({
    totalCompletions: 0,
    averageCompletionsPerDay: 0,
    bestStreak: 0,
    consistencyRate: 0,
  });

  // State for notes
  const [notes, setNotes] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [habitNotes, setHabitNotes] = useState([]);

  // Tabs management
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (habit) {
      // Fetch habit analytics
      fetchHabitAnalytics();
      // Fetch habit notes
      fetchHabitNotes();
    }
  }, [habit]);

  const fetchHabitAnalytics = async () => {
    try {
      // Simulating an API call for analytics
      // In a real app, you would replace this with an actual API call
      // const response = await axios.get(`/habits/analytics/${habit._id}`);
      // setAnalytics(response.data);
      
      // Mock analytics data for demonstration
      setAnalytics({
        totalCompletions: habit.currentStreak * habit.targetPerDay,
        averageCompletionsPerDay: habit.targetPerDay * 0.85,
        bestStreak: Math.max(habit.currentStreak, Math.floor(Math.random() * 30) + 1),
        consistencyRate: Math.floor(Math.random() * 20) + 80, // 80% to 100%
      });
    } catch (error) {
      console.error('Error fetching habit analytics:', error);
    }
  };

  const fetchHabitNotes = async () => {
    try {
      // Simulating an API call for notes
      // In a real app, you would replace this with an actual API call
      // const response = await axios.get(`/habits/notes/${habit._id}`);
      // setHabitNotes(response.data);
      
      // Mock notes data for demonstration
      setHabitNotes([
        { id: 1, text: "Made good progress today!", date: new Date(Date.now() - 86400000).toISOString() },
        { id: 2, text: "Feeling motivated to continue!", date: new Date(Date.now() - 172800000).toISOString() }
      ]);
    } catch (error) {
      console.error('Error fetching habit notes:', error);
    }
  };

  const handleAddNote = async () => {
    if (!notes.trim()) return;
    
    try {
      // Simulating an API call to add a note
      // In a real app, you would replace this with an actual API call
      // await axios.post(`/habits/notes/${habit._id}`, { text: notes });
      
      // Mock adding a note
      const newNote = {
        id: habitNotes.length + 1,
        text: notes,
        date: new Date().toISOString()
      };
      
      setHabitNotes([newNote, ...habitNotes]);
      setNotes('');
      setIsAddingNote(false);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to calculate days since start
  const getDaysSinceStart = () => {
    const startDate = new Date(habit.startDate);
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (!habit) return null;

  return (
    <div className="fixed inset-0 bg-opacity-10 backdrop-blur flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-screen overflow-hidden">
        {/* Header with tabs */}
        <div className="border-b border-gray-200">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-t-2xl">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <span className="mr-2">
                {habit.category === 'health' && '❤️'}
                {habit.category === 'fitness' && '💪'}
                {habit.category === 'learning' && '📚'}
                {habit.category === 'productivity' && '⚡'}
                {habit.category === 'mindfulness' && '🧘'}
                {habit.category === 'social' && '👥'}
                {habit.category === 'finance' && '💰'}
                {!['health', 'fitness', 'learning', 'productivity', 'mindfulness', 'social', 'finance'].includes(habit.category) && '✨'}
              </span>
              {habit.title}
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex border-b">
            <button
              className={`px-4 py-3 font-medium text-sm border-b-2 ${
                activeTab === 'overview' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`px-4 py-3 font-medium text-sm border-b-2 ${
                activeTab === 'analytics' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('analytics')}
            >
              Analytics
            </button>
            <button
              className={`px-4 py-3 font-medium text-sm border-b-2 ${
                activeTab === 'notes' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('notes')}
            >
              Notes
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="p-6 overflow-y-auto max-h-96">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Habit Info */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="font-medium text-gray-800 mb-2">Habit Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="text-gray-700 capitalize">{habit.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Preferred Time</p>
                    <p className="text-gray-700 capitalize">{habit.preferredTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Daily Target</p>
                    <p className="text-gray-700">{habit.targetPerDay} times</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Current Streak</p>
                    <p className="text-gray-700">{habit.currentStreak} days</p>
                  </div>
                </div>
              </div>
              
              {/* Description & Motivation */}
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Description</h3>
                <p className="text-gray-700 mb-4">{habit.description || "No description provided."}</p>
                
                <h3 className="font-medium text-gray-800 mb-2">Motivation</h3>
                <div className="bg-blue-50 p-4 rounded-xl text-gray-700 italic">
                  {habit.motivation || "No motivation statement provided."}
                </div>
              </div>
              
              {/* Progress */}
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Today's Progress</h3>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${habit.completedToday >= habit.targetPerDay ? 'bg-green-500' : 'bg-blue-500'}`}
                    style={{ width: `${Math.min((habit.completedToday / habit.targetPerDay) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-500">{habit.completedToday} of {habit.targetPerDay} completed</span>
                  <span className="text-gray-500">{Math.round((habit.completedToday / habit.targetPerDay) * 100)}%</span>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Overview Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500">Days Since Start</p>
                  <p className="text-2xl font-semibold text-blue-700">{getDaysSinceStart()}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500">Total Completions</p>
                  <p className="text-2xl font-semibold text-green-700">{analytics.totalCompletions}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500">Best Streak</p>
                  <p className="text-2xl font-semibold text-purple-700">{analytics.bestStreak} days</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500">Consistency Rate</p>
                  <p className="text-2xl font-semibold text-orange-700">{analytics.consistencyRate}%</p>
                </div>
              </div>
              
              {/* Daily Averages */}
              <div>
                <h3 className="font-medium text-gray-800 mb-3">Daily Averages</h3>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Average Completions Per Day</span>
                    <span className="font-medium text-blue-600">{analytics.averageCompletionsPerDay.toFixed(1)}</span>
                  </div>
                </div>
              </div>
              
              {/* Monthly View */}
              <div>
                <h3 className="font-medium text-gray-800 mb-3">This Month's Progress</h3>
                <div className="bg-gray-50 p-4 rounded-xl grid grid-cols-7 gap-2">
                  {/* Sample month view - in a real implementation, these would be generated dynamically */}
                  {Array.from({ length: 28 }, (_, i) => {
                    const isCompleted = Math.random() > 0.3;
                    return (
                      <div 
                        key={i} 
                        className={`w-8 h-8 rounded-md flex items-center justify-center text-xs ${
                          isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {i + 1}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Notes Tab */}
          {activeTab === 'notes' && (
            <div className="space-y-4">
              {/* Add Note Form */}
              {isAddingNote ? (
                <div className="border border-gray-200 rounded-xl p-4">
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Write your note here..."
                    className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  ></textarea>
                  <div className="flex justify-end mt-3 space-x-2">
                    <button
                      onClick={() => {
                        setIsAddingNote(false);
                        setNotes('');
                      }}
                      className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddNote}
                      className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                    >
                      Add Note
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsAddingNote(true)}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add a Note
                </button>
              )}
              
              {/* Notes List */}
              <div className="space-y-3">
                {habitNotes.length > 0 ? (
                  habitNotes.map((note) => (
                    <div key={note.id} className="bg-gray-50 p-4 rounded-xl">
                      <div className="flex justify-between items-start">
                        <p className="text-gray-700">{note.text}</p>
                        <span className="text-xs text-gray-500">{formatDate(note.date)}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No notes yet. Add your first note!</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 p-4 flex justify-between items-center border-t border-gray-200 rounded-b-2xl">
          <div>
            <p className="text-xs text-gray-500">Started on {formatDate(habit.startDate)}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onDelete}
              className="px-3 py-2 border border-red-300 text-red-600 hover:bg-red-50 rounded-lg text-sm"
            >
              Delete
            </button>
            <button
              onClick={onArchive}
              className="px-3 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg text-sm"
            >
              Archive
            </button>
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitDetailsModal;