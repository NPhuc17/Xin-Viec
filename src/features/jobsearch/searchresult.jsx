// import React, { useState } from 'react';
// import SearchBar from './components/searchbar';
// import FilterBar from './components/filterbar';
// import Navbar from '../../components/navbar';

// function SearchResultPage() {
//   // State cho các filter
//   const [filters, setFilters] = useState({
//     jobType: 'all',
//     position: 'all',
//     benefits: [],
//     experience: 'all',
//     degree: 'all',
//     location: 'all',
//   });

//   // Nhận dữ liệu từ FilterBar
//   const handleFilterChange = (newFilters) => {
//     setFilters(prev => ({ ...prev, ...newFilters }));
//   };

//   // Nhận dữ liệu từ SearchBar và truyền cả filter
//   const handleSearch = (query, location) => {
//     // Gộp tất cả dữ liệu để truyền API
//     const searchData = {
//       query,
//       location,
//       ...filters,
//     };
//     // Xử lý tìm kiếm với searchData
//     console.log('Tìm kiếm:', searchData);
//     // Gọi API ở đây nếu cần
//   };

//   return (
//     <>
//       <Navbar />
//       {/* Truyền location vào filter state */}

//       <SearchBar className="pb-0 pt-3"
//         onSearch={handleSearch}
//       />
//       <FilterBar
//         onFilter={handleFilterChange}
//         jobTypeOptions={[
//           { value: 'partime', label: 'Part-time' },
//           { value: 'fulltime', label: 'Full-time' },
//         ]}
//         positionOptions={[
//           { value: 'intern', label: 'Thực tập sinh' },
//           { value: 'staff', label: 'Nhân viên' },
//         ]}
//         benefitOptions={[
//           { value: 'bhyt', label: 'BHYT' },
//           { value: 'bhxh', label: 'BHXH' },
//           { value: 'bonus', label: 'Thưởng' },
//           { value: 'holiday', label: 'Nghỉ lễ' },
//         ]}
//         experienceOptions={[
//           { value: 'none', label: 'Không' },
//           { value: '1', label: '1 năm' },
//           { value: '2', label: '2 năm' },
//           { value: '5plus', label: 'Trên 5 năm' },
//         ]}
//         degreeOptions={[
//           { value: 'none', label: 'Không cần' },
//           { value: 'thpt', label: 'THPT' },
//           { value: 'university', label: 'Đại học' },
//           { value: 'postgraduate', label: 'Sau đại học' },
//         ]}
//         locationOptions={[
//           { value: 'hcm', label: 'TP HCM' },
//           { value: 'hn', label: 'Hà Nội' },
//           { value: 'dn', label: 'Đà Nẵng' },
//         ]}
//       />
//     </>
//   );
// }

// export default SearchResultPage;




import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar';
import SearchBar from './components/searchbar';
import FilterBar from './components/filterbar';
import jobsData from '../../data/jobs.json';

function SearchResultPage() {
  const location = useLocation();
  const navigate = useNavigate(); 
  const params = new URLSearchParams(location.search);
  const query = params.get('query')?.toLowerCase() || '';

  const [filters, setFilters] = useState({
    jobType: 'all',
    position: 'all',
    benefits: [],
    experience: 'all',
    degree: 'all',
    location: 'all',
  });

  const [filteredJobs, setFilteredJobs] = useState([]);

  // ✅ Hàm lọc job theo query + filter
  const filterJobs = () => {
    let results = jobsData.filter(job =>
      job.title.toLowerCase().includes(query)
    );

    if (filters.location !== 'all') {
      results = results.filter(job => job.location === filters.location);
    }
    if (filters.jobType !== 'all') {
      results = results.filter(job => job.jobType === filters.jobType);
    }
    if (filters.position !== 'all') {
      results = results.filter(job => job.position === filters.position);
    }
    if (filters.experience !== 'all') {
      results = results.filter(job => job.experience === filters.experience);
    }
    if (filters.degree !== 'all') {
      results = results.filter(job => job.degree === filters.degree);
    }
    if (filters.benefits.length > 0) {
      results = results.filter(job =>
        filters.benefits.every(b => job.benefits.includes(b))
      );
    }

    setFilteredJobs(results);
  };

  // ✅ Khi query hoặc filter thay đổi → lọc lại
  useEffect(() => {
    filterJobs();
  }, [query, filters]);

  // ✅ Cập nhật filter từ FilterBar
  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // ✅ Nếu user tìm lại ngay trên trang SearchResultPage
  const handleSearch = (newQuery) => {
    window.location.href = `/search?query=${encodeURIComponent(newQuery)}`;
  };

  return (
    <>
      <Navbar />
      <SearchBar className="pb-0 pt-3" onSearch={handleSearch} />
      <FilterBar
        onFilter={handleFilterChange}
        jobTypeOptions={[
          { value: 'partime', label: 'Part-time' },
          { value: 'fulltime', label: 'Full-time' },
        ]}
        positionOptions={[
          { value: 'intern', label: 'Thực tập sinh' },
          { value: 'staff', label: 'Nhân viên' },
        ]}
        benefitOptions={[
          { value: 'bhyt', label: 'BHYT' },
          { value: 'bhxh', label: 'BHXH' },
          { value: 'bonus', label: 'Thưởng' },
          { value: 'holiday', label: 'Nghỉ lễ' },
        ]}
        experienceOptions={[
          { value: 'none', label: 'Không' },
          { value: '1', label: '1 năm' },
          { value: '2', label: '2 năm' },
          { value: '5plus', label: 'Trên 5 năm' },
        ]}
        degreeOptions={[
          { value: 'none', label: 'Không cần' },
          { value: 'thpt', label: 'THPT' },
          { value: 'university', label: 'Đại học' },
          { value: 'postgraduate', label: 'Sau đại học' },
        ]}
        locationOptions={[
          { value: 'hcm', label: 'TP HCM' },
          { value: 'hn', label: 'Hà Nội' },
          { value: 'dn', label: 'Đà Nẵng' },
        ]}
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">
          Kết quả cho: “{query}” ({filteredJobs.length})
        </h2>

        {filteredJobs.length === 0 ? (
          <p className="text-gray-500">Không tìm thấy công việc phù hợp.</p>
        ) : (
          <ul className="space-y-3">
            {filteredJobs.map((job) => (
              <li
                key={job.id}
                onClick={() => navigate(`/job/${job.id}`)} // 👈 điều hướng đến trang chi tiết
                className="border rounded-md p-3 hover:border-accent cursor-pointer transition"
              >
                <h3 className="text-md font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-600">
                  Địa điểm: {job.location.toUpperCase()} | Loại: {job.jobType}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default SearchResultPage;
