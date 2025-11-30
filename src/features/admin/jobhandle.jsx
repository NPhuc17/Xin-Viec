// // src/features/admin/Jobhandle.jsx
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { variables } from "../../variables"; // thay bằng đường dẫn file API_URL của bạn

// function Jobhandle() {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await fetch(variables.API_URL + "TinTuyenDung/list", {
//           credentials: "include",
//         });
//         const data = await res.json();
//         if (res.ok) {
//           setJobs(data.data || data.Data || []);
//         } else {
//           setError(data.Message || "Không tải được danh sách tin.");
//         }
//       } catch (err) {
//         console.error("Fetch error:", err);
//         setError("Lỗi kết nối máy chủ!");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchJobs();
//   }, []);

//   if (loading) return <p className="text-center mt-6">Đang tải danh sách tin...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow">
//       <h2 className="text-2xl font-bold mb-4 text-center">Danh sách tin tuyển dụng</h2>

//       {jobs.length === 0 ? (
//         <p className="text-center text-gray-500">Không có tin tuyển dụng nào.</p>
//       ) : (
//         <table className="w-full border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-2 border">#</th>
//               <th className="p-2 border">Công ty</th>
//               <th className="p-2 border">Tiêu đề</th>
//               <th className="p-2 border">Trạng thái</th>
//               <th className="p-2 border">Ngày đăng</th>
//               <th className="p-2 border">Hạn nộp</th>
//               <th className="p-2 border">Chi tiết</th>
//             </tr>
//           </thead>
//           <tbody>
//             {jobs.map((job, index) => (
//               <tr key={job.ttdid} className="text-center">
//                 <td className="p-2 border">{index + 1}</td>
//                 <td className="p-2 border">{job.ctName}</td>
//                 <td className="p-2 border">{job.tieuDe}</td>
//                 <td className="p-2 border">{job.trangThai}</td>
//                 <td className="p-2 border">{job.ngayDang?.slice(0, 10)}</td>
//                 <td className="p-2 border">{job.hanNop?.slice(0, 10)}</td>
//                 <td className="p-2 border">
//                   <Link
//                     to={`/admin/jobs/${job.ttdid}`}
//                     className="text-blue-600 hover:underline"
//                   >
//                     Xem chi tiết
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default Jobhandle;




// src/features/admin/Jobhandle.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { variables } from "../../variables";

function Jobhandle() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]); // ⭐ Dữ liệu sau khi lọc
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filterStatus, setFilterStatus] = useState("Tất cả"); // ⭐ State lọc

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(variables.API_URL + "TinTuyenDung/list", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          const list = data.data || data.Data || [];
          setJobs(list);
          setFilteredJobs(list); // ban đầu chưa lọc
        } else {
          setError(data.Message || "Không tải được danh sách tin.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Lỗi kết nối máy chủ!");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // ⭐ Lọc trạng thái khi chọn trong dropdown
  useEffect(() => {
    if (filterStatus === "Tất cả") {
      setFilteredJobs(jobs);
    } else {
      setFilteredJobs(jobs.filter(job => job.trangThai === filterStatus));
    }
  }, [filterStatus, jobs]);

  if (loading) return <p className="text-center mt-6">Đang tải danh sách tin...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Danh sách tin tuyển dụng</h2>

      {/* ⭐ Bộ lọc trạng thái */}
      <div className="mb-4 flex justify-end">
        <select
          className="border p-2 rounded"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="Tất cả">Tất cả trạng thái</option>
          <option value="Chờ duyệt">Đang chờ duyệt</option>
          <option value="Đã duyệt">Đã duyệt</option>
          <option value="Từ chối">Từ chối</option>
        </select>
      </div>

      {filteredJobs.length === 0 ? (
        <p className="text-center text-gray-500">Không có tin tuyển dụng nào.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Công ty</th>
              <th className="p-2 border">Tiêu đề</th>
              <th className="p-2 border">Trạng thái</th>
              <th className="p-2 border">Ngày đăng</th>
              <th className="p-2 border">Hạn nộp</th>
              <th className="p-2 border">Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job, index) => (
              <tr key={job.ttdid} className="text-center">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{job.ctName}</td>
                <td className="p-2 border">{job.tieuDe}</td>
                <td className="p-2 border">{job.trangThai}</td>
                <td className="p-2 border">{job.ngayDang?.slice(0, 10)}</td>
                <td className="p-2 border">{job.hanNop?.slice(0, 10)}</td>
                <td className="p-2 border">
                  <Link
                    to={`/admin/jobs/${job.ttdid}`}
                    className="text-blue-600 hover:underline"
                  >
                    Xem chi tiết
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Jobhandle;
