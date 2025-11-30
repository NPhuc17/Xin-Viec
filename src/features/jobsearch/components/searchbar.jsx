import React, { useState } from 'react';

function SearchBar({ onSearch, className = '', locationOptions = [] }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query, filter);
    }
  };

  return (
<div className={`${className ? className : "bg-secondary"}`}>
      <form onSubmit={handleSubmit} className='p-1 border-1 w-[80%] mx-auto flex items-center gap-2 rounded-sm bg-white'>
        <input
          type="text"
          placeholder="Tìm kiếm công việc..."
          value={query}
          onChange={handleInputChange}
          className="flex-grow p-1 rounded-sm text-black"
        />
       
        <button type="submit" className="cursor-pointer p-1.5 bg-accent rounded-sm">
          Tìm kiếm
        </button>
      </form>
    </div>
  );
}

export default SearchBar;