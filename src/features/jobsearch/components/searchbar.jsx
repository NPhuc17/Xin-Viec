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

    <form onSubmit={handleSubmit} className='p-1 border-1 w-[80%] mx-auto my-4 flex  items-center gap-2 rounded-sm'>
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

      <button type="submit" className="cursor-pointer p-1.5 bg-green-500 rounded-sm">
        Tìm kiếm
      </button>
    </form>

  );
}

export default SearchBar;