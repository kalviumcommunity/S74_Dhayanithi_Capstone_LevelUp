import React from 'react';

const DashboardGreetingCard = ({ name, streak, badge }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 mb-4">
      <h2 className="text-2xl font-bold mb-2">👋 Hello, {name}!</h2>
      <p className="text-lg">🔥 Current Streak: <span className="font-semibold">{streak}</span></p>
      <p className="text-lg">🏅 Current Badge: <span className="capitalize font-semibold">{badge}</span></p>
    </div>
  );
};

export default DashboardGreetingCard;
