// src/components/FilterBar.jsx
import React from 'react';

const FilterBar = ({ selectedFilter, onChange }) => {
  return (
    <div className="flex items-center space-x-4 mt-4">
      <label className="text-gray-700 font-medium">Filter:</label>
      <select
        value={selectedFilter}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
      >
        <option value="">All</option>
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
        <option value="completed">Completed Today</option>
        <option value="uncompleted">Uncompleted Today</option>
      </select>
    </div>
  );
};

export default FilterBar;
