import React from 'react';

const FilterBar = ({ filterType, setFilterType, category, setCategory }) => {
  const sortOptions = [
    { value: 'latest', label: 'Latest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'completed', label: 'Completed' },
    { value: 'notCompleted', label: 'Not Completed' },
    { value: 'streak', label: 'Top Streaks' },
  ];

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'health', label: 'Health' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'learning', label: 'Learning' },
    { value: 'productivity', label: 'Productivity' },
    { value: 'mindfulness', label: 'Mindfulness' },
    { value: 'social', label: 'Social' },
    { value: 'finance', label: 'Finance' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Sort Filters */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Sort By</h3>
          <div className="flex flex-wrap gap-2">
            {sortOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setFilterType(option.value)}
                className={`px-3 py-1 rounded-full text-sm transition ${
                  filterType === option.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Dropdown */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full md:w-48 bg-gray-100 border border-gray-300 text-sm text-gray-800 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
  