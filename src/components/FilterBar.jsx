import { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import './FilterBar.css';

const FilterBar = ({ onFilterChange }) => {
  const { categories } = useExpense();
  const [filters, setFilters] = useState({
    category: 'all',
    startDate: '',
    endDate: '',
    searchTerm: ''
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      category: 'all',
      startDate: '',
      endDate: '',
      searchTerm: ''
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="filter-bar card">
      <div className="filter-group">
        <label htmlFor="search">Search</label>
        <input
          type="text"
          id="search"
          className="input filter-input"
          placeholder="Search transactions..."
          value={filters.searchTerm}
          onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          className="select filter-select"
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.icon} {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="startDate">From</label>
        <input
          type="date"
          id="startDate"
          className="input filter-input"
          value={filters.startDate}
          onChange={(e) => handleFilterChange('startDate', e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="endDate">To</label>
        <input
          type="date"
          id="endDate"
          className="input filter-input"
          value={filters.endDate}
          onChange={(e) => handleFilterChange('endDate', e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label>&nbsp;</label>
        <button onClick={handleReset} className="btn btn-outline filter-reset">
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
