import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../features/jobsearch/components/searchbar';
import FeaturedJob from '../features/featuredjob/featuredjob';

function Homepage() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const handleSearch = (query) => {
    console.log('Từ khóa tìm kiếm:', query);
  };

  return (
    <>
      <Navbar username={username} setUsername={setUsername} />
      <SearchBar onSearch={handleSearch} />
      <FeaturedJob />
    </>
  );
}

export default Homepage;
