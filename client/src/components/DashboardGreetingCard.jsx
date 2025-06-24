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
    <div className="bg-white text-gray-800 rounded-xl border border-gray-200 shadow-md">
  <div className="p-6">
    {/* Greeting and Badge */}
    <div className="flex justify-between items-start">
      <div>
        <h2 className="text-2xl font-bold mb-1">{greeting}, {name}!</h2>
        <p className="text-sm text-gray-500">Stay focused and hit your goals! 💪</p>
      </div>
      <div className="bg-gray-100 rounded-lg p-2">
        <span className="text-2xl">{getBadgeIcon(badge)}</span>
      </div>
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {/* Streak */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center space-x-4">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl">🔥</div>
        <div>
          <p className="text-sm text-gray-500">Current Streak</p>
          <p className="text-base font-semibold">{streak} days</p>
        </div>
      </div>

      {/* Badge */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center space-x-4">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl">{getBadgeIcon(badge)}</div>
        <div>
          <p className="text-sm text-gray-500">Current Badge</p>
          <p className="text-base font-semibold capitalize">{badge}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-gray-500">Today's Progress</p>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-sm mr-1">
              {percentageComplete}
            </div>
            <span className="text-sm">%</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              percentageComplete === 100
                ? 'bg-green-500'
                : percentageComplete >= 50
                ? 'bg-yellow-400'
                : 'bg-red-400'
            }`}
            style={{ width: `${percentageComplete}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {completedToday}/{totalHabits} habits completed
          {remainingHabits > 0 && (
            <span> • {remainingHabits} remaining</span>
          )}
        </p>
      </div>
    </div>
  </div>

  {/* Footer */}
  <div className="bg-gray-100 border-t border-gray-200 px-4 py-3 flex justify-between items-center rounded-b-xl">
    <p className="text-sm text-gray-600">
      {remainingHabits === 0
        ? "Amazing! You've completed all your habits for today! 🎉"
        : `You have ${remainingHabits} habit${remainingHabits === 1 ? '' : 's'} left for today`}
    </p>
    <div className="text-xs bg-white border border-gray-300 py-1 px-3 rounded-full text-gray-700 shadow-sm">
      {formattedDate}
    </div>
  </div>
</div>

  );
};

export default DashboardGreetingCard;