// import React, { useEffect, useState } from "react";
// import Navbar from "../../components/navbar";
// import { variables } from "../../variables"; // { API_URL: "https://localhost:7144/api/" }
// import Footer from "../../components/footer";

// function AppliedJob() {
//   const [appliedJobs, setAppliedJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchAppliedJobs = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         const res = await fetch(`${variables.API_URL}UngTuyen/cua-toi`, {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include", // ✅ gửi cookie JWT kèm theo request
//         });

//         if (res.status === 401) {
//           setError("Vui lòng đăng nhập để xem danh sách công việc đã ứng tuyển.");
//           setLoading(false);
//           return;
//         }

//         const data = await res.json();

//         if (!res.ok) {
//           setError(data.message || "Không thể tải danh sách.");
//         } else {
//           setAppliedJobs(data);
//         }
//       } catch (err) {
//         console.error(err);
//         setError("Không thể kết nối tới máy chủ.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppliedJobs();
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <div className="p-6 max-w-4xl mx-auto">
//         <h1 className="text-2xl font-bold mb-4 text-blue-700">
//           Danh sách công việc đã ứng tuyển
//         </h1>

//         {loading && <p>Đang tải dữ liệu...</p>}
//         {error && <p className="text-red-500">{error}</p>}

//         {!loading && !error && appliedJobs.length === 0 && (
//           <p className="text-gray-500">Bạn chưa ứng tuyển công việc nào.</p>
//         )}

//         <div className="grid gap-4">
//           {appliedJobs.map((job) => (
//             <div
//               key={job.ungTuyenId}
//               className="border rounded-md p-4 bg-white shadow-sm hover:shadow-md transition"
//             >
//               <h2 className="text-lg font-semibold text-gray-800">
//                 {job.tieuDeTin}
//               </h2>
//               <p className="text-gray-600">Công ty: {job.tenCongTy}</p>
//               <p className="text-gray-500 text-sm">
//                 Ngày nộp: {new Date(job.ngayNop).toLocaleString()}
//               </p>
//               <p
//                 className={`mt-2 inline-block px-3 py-1 text-sm rounded-full ${
//                   job.trangThai === "Đang chờ duyệt"
//                     ? "bg-yellow-100 text-yellow-800"
//                     : job.trangThai === "Đã duyệt"
//                     ? "bg-green-100 text-green-700"
//                     : "bg-gray-200 text-gray-700"
//                 }`}
//               >
//                 {job.trangThai}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// }

// export default AppliedJob;




import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import { variables } from "../../variables";
import Footer from "../../components/footer";

function AppliedJob() {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); 
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${variables.API_URL}UngTuyen/cua-toi`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (res.status === 401) {
          setError("Vui lòng đăng nhập để xem danh sách công việc đã ứng tuyển.");
          setLoading(false);
          return;
        }

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Không thể tải danh sách.");
        } else {
          setAppliedJobs(data);
        }
      } catch (err) {
        console.error(err);
        setError("Không thể kết nối tới máy chủ.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  const handleJobClick = (id) => {
    navigate(`/jobdetail/${id}`);
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">
          Danh sách công việc đã ứng tuyển
        </h1>

        {loading && <p>Đang tải dữ liệu...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && appliedJobs.length === 0 && (
          <p className="text-gray-500">Bạn chưa ứng tuyển công việc nào.</p>
        )}

        <div className="grid gap-4">
          {appliedJobs.map((job) => (
            <div
              key={job.ungTuyenId}
              className="border border-accent rounded-md p-4 bg-white shadow-sm hover:border-highlight hover:shadow-md transition cursor-pointer"
              onClick={() => handleJobClick(job.tinID)}
            >
              <h2 className="text-lg font-semibold text-gray-800">{job.tieuDeTin}</h2>
              <p className="text-gray-600 text-sm">Công ty: {job.tenCongTy}</p>
              <p className="text-gray-500 text-sm">
                Ngày nộp: {new Date(job.ngayNop).toLocaleString()}
              </p>
              <span
                className={`mt-2 inline-block px-3 py-1 text-sm rounded-full ${job.trangThai === "Đang chờ duyệt"
                    ? "bg-yellow-100 text-yellow-800"
                    : job.trangThai === "Đã duyệt"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
              >
                {job.trangThai}
              </span>
            </div>

          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AppliedJob;
