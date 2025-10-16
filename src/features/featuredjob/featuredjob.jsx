// import React from 'react';

// // Data mẫu cho việc làm nổi bật
// const jobs = [
//   {
//     id: 1,
//     title: 'Frontend Developer',
//     company: 'Công ty ABC',
//     image: 'https://via.placeholder.com/80',
//   },
//   {
//     id: 2,
//     title: 'Backend Engineer',
//     company: 'Công ty XYZ',
//     image: 'https://via.placeholder.com/80',
//   },
//   {
//     id: 3,
//     title: 'UI/UX Designer',
//     company: 'Công ty DEF',
//     image: 'https://via.placeholder.com/80',
//   },
// ];

// function FeaturedJob() {
//   return (
//     <div className="mx-4 my-6">
//       <h2 className="text-xl font-bold mb-4">Việc làm nổi bật</h2>
//       <div className="grid grid-cols-2 gap-2">
//         {jobs.map((job) => (
//           <div
//             key={job.id}
//             className="flex items-center border border-accent rounded-md py-4 px-1 bg-white shadow-sm hover:border-highlight"
//           >
//             <img
//               src={job.image}
//               alt={job.title}
//               className="w-20 h-20 object-cover rounded mr-4"
//             />
//             <div>
//               <div className="text-lg font-semibold">{job.title}</div>
//               <div className="text-gray-600">{job.company}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default FeaturedJob;




import React from 'react';
import { useNavigate } from 'react-router-dom';
import jobs from '../../data/jobs.json';

function FeaturedJob() {
  const navigate = useNavigate();

  // Hàm xử lý khi click vào job
  const handleJobClick = (id) => {
    navigate(`/job/${id}`); // chuyển hướng đến trang chi tiết
  };

  return (
    <div className="mx-4 my-6">
      <h2 className="text-xl font-bold mb-4">Việc làm nổi bật</h2>
      <div className="grid grid-cols-2 gap-2">
        {jobs.slice(0, 3).map((job) => (
          <div
            key={job.id}
            className="flex items-center border border-accent rounded-md py-4 px-1 bg-white shadow-sm hover:border-highlight cursor-pointer transition"
            onClick={() => handleJobClick(job.id)}
          >
            <img
              src={`https://via.placeholder.com/80?text=${encodeURIComponent(job.title)}`}
              alt={job.title}
              className="w-20 h-20 object-cover rounded mr-4"
            />
            <div>
              <div className="text-lg font-semibold">{job.title}</div>
              <div className="text-gray-600 capitalize">
                {job.location === 'hcm'
                  ? 'TP HCM'
                  : job.location === 'hn'
                  ? 'Hà Nội'
                  : 'Đà Nẵng'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedJob;