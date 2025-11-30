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




// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import jobs from '../../data/jobs.json';

// function FeaturedJob() {
//   const navigate = useNavigate();

//   // Hàm xử lý khi click vào job
//   const handleJobClick = (id) => {
//     navigate(`/jobdetail/${id}`); // chuyển hướng đến trang chi tiết
//   };

//   return (
//     <div className="mx-4 my-6">
//       <h2 className="text-xl font-bold mb-4">Việc làm nổi bật</h2>
//       <div className="grid grid-cols-2 gap-2">
//         {jobs.slice(0, 3).map((job) => (
//           <div
//             key={job.id}
//             className="flex items-center border border-accent rounded-md py-4 px-1 bg-white shadow-sm hover:border-highlight cursor-pointer transition"
//             onClick={() => handleJobClick(job.id)}
//           >
//             <img
//               src={`https://via.placeholder.com/80?text=${encodeURIComponent(job.title)}`}
//               alt={job.title}
//               className="w-20 h-20 object-cover rounded mr-4"
//             />
//             <div>
//               <div className="text-lg font-semibold">{job.title}</div>
//               <div className="text-gray-600 capitalize">
//                 {job.location === 'hcm'
//                   ? 'TP HCM'
//                   : job.location === 'hn'
//                   ? 'Hà Nội'
//                   : 'Đà Nẵng'}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default FeaturedJob;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { variables } from "../../variables"; // chứa API_URL

function FeaturedJob() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  const itemsPerPage = 10; // ✅ hiển thị 4 tin mỗi trang

  // 🧩 Gọi API danh sách tin
  const fetchJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${variables.API_URL}TInTuyenDung/list`);
      const data = await res.json();

      if (res.ok) {
        // Lọc chỉ các tin "Đã duyệt" và còn hạn nộp
        const approved = (data.data || data.Data || []).filter((job) => {
          const today = new Date();
          const deadline = new Date(job.hanNop);

          return job.trangThai === "Đã duyệt" && deadline >= today;
        });
        setJobs(approved);
      } else {
        setError(data.message || "Không tải được danh sách việc làm.");
      }
    } catch (err) {
      console.error(err);
      setError("Lỗi kết nối đến máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleJobClick = (id) => {
    navigate(`/jobdetail/${id}`);
  };

  // 🧮 Phân trang
  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const currentJobs = jobs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="mx-4 my-6">
      {/* <h2 className="text-xl font-bold mb-4 text-primary">Việc làm nổi bật</h2> */}

      {loading && <p>Đang tải danh sách...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          {currentJobs.length === 0 ? (
            <p className="text-gray-500">Không có tin tuyển dụng đã duyệt.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentJobs.map((job) => (
                <div
                  key={job.ttdid}
                  onClick={() => handleJobClick(job.ttdid)}
                  className="flex items-center border border-accent rounded-md py-4 px-3 bg-white shadow-sm hover:border-highlight cursor-pointer transition"
                >
                  <img src={`${variables.API_URL}CongTy/logo/${job.logo.replace(/^\/Upload\//, "")}`}
                    className="w-20 h-20 object-cover rounded mr-4" alt={job.tieuDe} />


                  <div>
                    <div className="text-lg font-semibold">{job.tieuDe}</div>
                    <div className="text-gray-600 font-semibold">
                      {job.ctName}
                    </div>
                    <div className="text-gray-600 text-sm">
                      Ngày đăng: {job.ngayDang?.slice(0, 10)}
                    </div>
                    <div className="text-gray-600 text-sm">
                      Hạn nộp: {job.hanNop?.slice(0, 10)}
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 🔄 Thanh phân trang */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-6">
              <button
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                ← Trước
              </button>
              <span>
                Trang {page} / {totalPages}
              </span>
              <button
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Sau →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default FeaturedJob;

