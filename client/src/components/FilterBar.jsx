import React from 'react';

const FilterBar = ({ filterType, setFilterType }) => {
  
  // Simplified filter options as requested
  const filterOptions = [
    { value: 'latest', label: 'Latest', icon: '🕒' },
    { value: 'oldest', label: 'Oldest', icon: '📅' },
    { value: 'completed', label: 'Completed Today', icon: '✅' },
    { value: 'notCompleted', label: 'Not Completed', icon: '⏳' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
      <div className="flex flex-col">
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-gray-800">Filter Habits</h3>
          <p className="text-sm text-gray-500">Customize how your habits are displayed</p>
        </div>
        
        {/* Simplified Filter View */}
        <div className="mt-2 flex flex-wrap gap-2">
          {filterOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setFilterType(option.value)}
              className={`px-3 py-2 rounded-lg text-sm flex items-center transition ${
                filterType === option.value 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-2">{option.icon}</span>
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
