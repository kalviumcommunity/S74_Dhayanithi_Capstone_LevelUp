import React from 'react';
import { useState, useEffect } from 'react';

const DashboardGreetingCard = ({ 
  name = 'User', 
  streak = 0, 
  badge = 'starter', 
  progress, 
  totalHabits = 0, 
  completedToday = 0 
}) => {
  const [greeting, setGreeting] = useState('');
  
  // Calculate percentage safely 
  const percentageComplete = React.useMemo(() => {
    if (typeof progress === 'number') {
      return Math.min(Math.max(Math.round(progress * 100), 0), 100);
    }
    
    if (typeof completedToday === 'number' && typeof totalHabits === 'number' && totalHabits > 0) {
      return Math.min(Math.max(Math.round((completedToday / totalHabits) * 100), 0), 100);
    }
    
    return 0;
  }, [progress, completedToday, totalHabits]);
  
  // Update greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const getBadgeIcon = (badgeName) => {
    const badgeType = badgeName?.toLowerCase() || '';
    const icons = {
      'gold': '🏆',
      'silver': '🥈',
      'bronze': '🥉',
      'starter': '🌱',
      'consistent': '⚡',
      'master': '🔥',
      'champion': '👑'
    };
    
    return icons[badgeType] || '🏅';
  };

  // Calculate remaining habits safely
  const remainingHabits = Math.max(totalHabits - completedToday, 0);
  
  // Get current date formatted nicely
  const formattedDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric' 
  });

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-2xl overflow-hidden shadow-xl">
      <div className="p-6">
        {/* Greeting and Badge */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold mb-1">{greeting}, {name}!</h2>
            <p className="text-indigo-100 text-sm">Let's make today count and smash those goals! 🚀</p>
          </div>
          <div className="bg-white bg-opacity-30 rounded-xl p-3 shadow-md">
            <span className="text-2xl">{getBadgeIcon(badge)}</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {/* Streak */}
          <div className="bg-white bg-opacity-10 p-5 rounded-xl flex items-center shadow-sm backdrop-blur-sm">
            <div className="w-12 h-12 rounded-full bg-white bg-opacity-30 flex items-center justify-center mr-4">
              <span className="text-2xl">🔥</span>
            </div>
            <div>
              <p className="text-lg font-semibold text-purple-900 opacity-90">Current Streak</p>
              <p className="text-lg text-purple-900 font-bold">{streak} days</p>
            </div>
          </div>

          {/* Badge */}
          <div className="bg-white bg-opacity-10 p-5 rounded-xl flex items-center shadow-sm backdrop-blur-sm">
            <div className="w-12 h-12 rounded-full bg-white bg-opacity-30 flex items-center justify-center mr-4">
              <span className="text-2xl">{getBadgeIcon(badge)}</span>
            </div>
            <div>
              <p className="text-lg font-semibold text-purple-900 opacity-90">Current Badge</p>
              <p className="text-lg text-purple-900 font-bold">{badge}</p>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-white bg-opacity-10 p-5 rounded-xl shadow-sm backdrop-blur-sm">
            <div className="flex justify-between items-center mb-2">
              <p className="text-lg font-semibold text-purple-900  opacity-90">Today's Progress</p>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-indigo-600 font-bold mr-1 shadow-md">
                  {percentageComplete}
                </div>
                <span className="text-white font-medium">%</span>
              </div>
            </div>
            <div className="w-full bg-white bg-opacity-30 rounded-full h-3 mb-2">
              <div 
                className={`h-3 rounded-full transition-all duration-300 ease-in-out ${
                  percentageComplete === 100
                    ? 'bg-green-400'
                    : percentageComplete >= 50
                    ? 'bg-yellow-400'
                    : 'bg-red-400'
                }`}
                style={{ width: `${percentageComplete}%` }}
              ></div>
            </div>
            <p className="text-sm mt-2 text-puple-900 opacity-80">
              {completedToday}/{totalHabits} habits completed
              {remainingHabits > 0 && (
                <span> • {remainingHabits} remaining</span>
              )}
            </p>
          </div>
        </div>
      </div>
              
      {/* Footer */}
      <div className="bg-indigo-800 p-4 flex justify-between items-center">
        <p className="text-sm text-indigo-100">
          {remainingHabits === 0 
            ? "Awesome work! Your daily habits are building big wins! 🎉" 
            : `You have ${remainingHabits} habit${remainingHabits === 1 ? '' : 's'} left for today`}
        </p>
        <div className="text-xs bg-indigo-900 py-1 px-4 rounded-full text-white shadow-md">
          {formattedDate}
        </div>
      </div>
    </div>
  );
};

export default DashboardGreetingCard;