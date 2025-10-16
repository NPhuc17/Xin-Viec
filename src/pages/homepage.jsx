// import React, { useState, useEffect } from 'react';
// import Navbar from '../components/navbar';
// import SearchBar from '../features/jobsearch/components/searchbar';
// import FeaturedJob from '../features/featuredjob/featuredjob';


// function Homepage() {
//   const [username, setUsername] = useState('');

//   useEffect(() => {
//     const storedUsername = localStorage.getItem('username');
//     if (storedUsername) setUsername(storedUsername);
//   }, []);

//   const handleSearch = (query) => {
//     console.log('Từ khóa tìm kiếm:', query);
//   };

//   return (
//     <>
//       <Navbar username={username} setUsername={setUsername} />
      
//       <SearchBar className='py-3'
       
//         onSearch={handleSearch}
//       />
//       <FeaturedJob />
//     </>
//   );
// }

// export default Homepage;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import SearchBar from '../features/jobsearch/components/searchbar';
import FeaturedJob from '../features/featuredjob/featuredjob';

function Homepage() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <>
      <Navbar username={username} setUsername={setUsername} />
      <SearchBar className="py-3" onSearch={handleSearch} />
      <FeaturedJob />
    </>
  );
}

export default Homepage;
