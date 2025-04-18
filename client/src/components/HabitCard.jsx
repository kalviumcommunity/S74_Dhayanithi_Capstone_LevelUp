import React from 'react';

const HabitCard = ({ habit }) => {
  return (
    <div className="border p-4 rounded-xl shadow-sm bg-white mb-2">
      <h3 className="text-xl font-semibold mb-1">{habit.title}</h3>
      <p className="text-sm text-gray-600">{habit.description}</p>
      <p className="text-sm mt-1">🔥 Streak: {habit.currentStreak}</p>
      <p className="text-sm">🎯 Progress: {habit.completedToday} / {habit.targetPerDay}</p>
    </div>
  );
};

export default HabitCard;
