import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all'); // Thêm state cho filter

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query, filter); // Truyền cả filter
    }
  };

  return (
    <div className='bg-blue-500 py-3'>

    <form onSubmit={handleSubmit} className='p-1 border-1 w-[80%] mx-auto flex  items-center gap-2 rounded-sm bg-white'>
      <input
        type="text"
        placeholder="Tìm kiếm công việc..."
        value={query}
        onChange={handleInputChange}
        className="flex-grow p-1 rounded-sm"
      />
      <select value={filter} onChange={handleFilterChange} className="mx-2 p-1 rounded-sm">
        <option value="all">Địa điểm</option>
        <option value="title">TP HCM</option>
        <option value="company">Hà Nội</option>
        <option value="location">Đà Nẵng</option>
      </select>

      <button type="submit" className="cursor-pointer p-1.5 bg-accent rounded-sm">
        Tìm kiếm
      </button>
    </form>
    </div>

  );
}

export default SearchBar;