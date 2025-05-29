import React, { useState } from 'react';

const FilterBar = ({ filterType, setFilterType }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Filter options
  const filterOptions = [
    { value: 'latest', label: 'Latest', icon: '🕒', description: 'Show newest habits first' },
    { value: 'oldest', label: 'Oldest', icon: '📅', description: 'Show oldest habits first' },
    { value: 'completed', label: 'Completed Today', icon: '✅', description: 'Show habits completed today' },
    { value: 'notCompleted', label: 'Not Completed', icon: '⏳', description: 'Show habits not yet completed today' },
    { value: 'streak', label: 'Highest Streak', icon: '🔥', description: 'Show habits with highest streaks first' },
    { value: 'category', label: 'By Category', icon: '📚', description: 'Group habits by category' }
  ];
 
  // Filter categories
  const categories = [ 
    { value: 'all', label: 'All Categories', icon: '✨' },
    { value: 'health', label: 'Health', icon: '❤️' },
    { value: 'fitness', label: 'Fitness', icon: '💪' },
    { value: 'learning', label: 'Learning', icon: '📚' },
    { value: 'productivity', label: 'Productivity', icon: '⚡' },
    { value: 'mindfulness', label: 'Mindfulness', icon: '🧘' },
    { value: 'social', label: 'Social', icon: '👥' },
    { value: 'finance', label: 'Finance', icon: '💰' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center">
        <div className="mb-4 md:mb-0">
          <h3 className="text-lg font-semibold text-gray-800">Filter Habits</h3>
          <p className="text-sm text-gray-500">Customize how your habits are displayed</p>
        </div>
        
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center text-blue-600 hover:text-blue-800 transition self-end md:self-auto"
        >
          {isExpanded ? 'Simple View' : 'Advanced Filters'}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-4 w-4 ml-1 transform ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      {/* Simple Filter View */}
      {!isExpanded && (
        <div className="mt-4 flex flex-wrap gap-2">
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
              <span className="mr-1">{option.icon}</span>
              {option.label}
            </button>
          ))}
        </div>
      )}
      
      {/* Advanced Filter View */}
      {isExpanded && (
        <div className="mt-4 space-y-6">
          {/* Sort Options */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Sort By</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {filterOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setFilterType(option.value)}
                  className={`p-3 rounded-xl flex items-start text-left transition ${
                    filterType === option.value 
                      ? 'bg-blue-50 border border-blue-200' 
                      : 'bg-gray-50 border border-gray-100 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-lg mr-3">{option.icon}</span>
                  <div>
                    <p className={`text-sm ${filterType === option.value ? 'font-medium text-blue-700' : 'font-medium text-gray-700'}`}>
                      {option.label}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{option.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Category Filter */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Filter by Category</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.value}
                  onClick={() => {
                    // Logic to filter by category would go here
                    // For now we'll just set the filter type to category
                    setFilterType('category');
                  }}
                  className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm flex items-center transition"
                >
                  <span className="mr-1">{category.icon}</span>
                  {category.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Additional filters could be added here */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Other Filters</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="showCompleted" 
                  className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4" 
                />
                <label htmlFor="showCompleted" className="ml-2 text-sm text-gray-700">Show completed habits</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="showIncomplete" 
                  className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4" 
                  defaultChecked 
                />
                <label htmlFor="showIncomplete" className="ml-2 text-sm text-gray-700">Show incomplete habits</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="showStreaks" 
                  className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4" 
                  defaultChecked 
                />
                <label htmlFor="showStreaks" className="ml-2 text-sm text-gray-700">Show streak counters</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="showMotivation" 
                  className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4" 
                />
                <label htmlFor="showMotivation" className="ml-2 text-sm text-gray-700">Show motivations by default</label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;