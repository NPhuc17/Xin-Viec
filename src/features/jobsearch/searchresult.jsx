// src/pages/search/SearchResultPage.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Navbar from "../../components/navbar";
// import SearchBar from "./components/searchbar";
// import FilterBar from "./components/filterbar";
// import { variables } from "../../variables"; // chứa API_URL
// import Jobdetailpage from "../../pages/jobdetailpage";

// function SearchResultPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [sortBy, setSortBy] = useState("ngaydang");
//   const [sortOrder, setSortOrder] = useState("desc");

//   // lấy query từ URL
//   const params = new URLSearchParams(location.search);
//   const query = params.get("query") || "";
//  const companyId = params.get("companyId");

//   const [filters, setFilters] = useState({
//     jobType: "all",
//     position: "all",
//     benefits: [],
//     experience: "all",
//     degree: "all",
//     location: "all",
//   });

//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // 🧩 Gọi API tìm kiếm
//   const fetchJobs = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await fetch(`${variables.API_URL}Find/search`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           Keyword: query,
//           Page: 1,
//           PageSize: 50,
//           LoaiHinhId: filters.LoaiHinhId === "all" ? null : Number(filters.LoaiHinhId),
//           ChucDanhId: filters.ChucDanhId === "all" ? null : Number(filters.ChucDanhId),
//           KinhNghiemId: filters.KinhNghiemId === "all" ? null : Number(filters.KinhNghiemId),
//           BangCapId: filters.BangCapId === "all" ? null : Number(filters.BangCapId),
//           ViTriId: filters.ViTriId === "all" ? null : Number(filters.ViTriId),
//           LinhVucId: filters.LinhVucId === "all" ? null : Number(filters.LinhVucId),
//           SortBy: sortBy,
//           SortOrder: sortOrder,
//         })

//       });

//       const data = await res.json();
//       if (res.ok) {
//         setJobs(data.data || data.Data || []);
//       } else {
//         setError(data.message || "Không tải được kết quả.");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Lỗi kết nối máy chủ.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Khi query hoặc filter thay đổi → gọi lại API
//   useEffect(() => {
//     fetchJobs();
//   }, [query, filters, sortBy, sortOrder]);

//   // Nhận dữ liệu filter từ FilterBar
//   const handleFilterChange = (newFilters) => {
//     setFilters((prev) => ({ ...prev, ...newFilters }));
//   };

//   // Khi user nhập lại từ khóa ngay trong trang
//   const handleSearch = (newQuery) => {
//     window.location.href = `/search?query=${encodeURIComponent(newQuery)}`;
//   };

//   return (
//     <>
//       <Navbar />
//       <SearchBar className="pb-0 pt-3" onSearch={handleSearch} />
//       <FilterBar onFilter={handleFilterChange} />


//       <div className="p-4">
//         <h2 className="text-lg font-semibold mb-3">
//           Kết quả cho: “{query}”{" "}
//           {loading ? (
//             <span className="text-sm text-gray-400">(Đang tải...)</span>
//           ) : (
//             `(${jobs.length})`
//           )}
//         </h2>


//         {/* Dropdown sắp xếp */}
//         <div className="flex items-center gap-2 text-sm mb-4">
//           <label htmlFor="sort" className="text-gray-600">
//             Sắp xếp theo:
//           </label>
//           <select
//             id="sort"
//             value={`${sortBy}-${sortOrder}`}
//             onChange={(e) => {
//               const [field, order] = e.target.value.split("-");
//               setSortBy(field);
//               setSortOrder(order);
//             }}
//             className="border rounded px-2 py-1 text-sm"
//           >
//             <option value="ngaydang-desc">Ngày đăng ↓</option>
//             <option value="ngaydang-asc">Ngày đăng ↑</option>
//             <option value="tieude-asc">Tiêu đề A → Z</option>
//             <option value="tieude-desc">Tiêu đề Z → A</option>
//             <option value="tencongty-asc">Tên công ty A → Z</option>
//             <option value="tencongty-desc">Tên công ty Z → A</option>
//             <option value="luong-desc">Lương cao → thấp</option>
//             <option value="luong-asc">Lương thấp → cao</option>
//           </select>
//         </div>
//         {error && <p className="text-red-500">{error}</p>}

//         {!loading && !error && jobs.length === 0 && (
//           <p className="text-gray-500">Không tìm thấy công việc phù hợp.</p>
//         )}

//         <ul className="space-y-3">
//           {jobs.map((job) => (
//             <li
//               key={job.id}
//               onClick={() => navigate(`/jobdetail/${job.id}`)}
//               className="flex items-center border rounded-md p-3 hover:border-accent cursor-pointer transition"
//             >
//               {/* Logo công ty */}
//               {job.logo && (
//                 <img
//                   src={`${variables.API_URL}CongTy/logo/${job.logo.replace(/^\/Upload\//, "")}`}
//                   alt={job.tieuDe}
//                   className="w-16 h-16 object-cover rounded mr-4"
//                 />
//               )}

//               {/* Thông tin công việc */}
//               <div>
//                 <h3 className="text-md font-semibold">{job.tieuDe}</h3>
//                 <p className="text-sm text-gray-600">
//                   {job.tenCongTy} — {job.loaiHinh}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   Lĩnh vực: {job.linhVuc} | Bằng cấp: {job.bangCap}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   Ngày đăng: {job.ngayDang?.slice(0, 10)} | Hạn nộp:{" "}
//                   {job.hanNop?.slice(0, 10)}
//                 </p>
//               </div>
//             </li>
//           ))}
//         </ul>

//       </div>
//     </>
//   );
// }

// export default SearchResultPage;



// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Navbar from "../../components/navbar";
// import SearchBar from "./components/searchbar";
// import FilterBar from "./components/filterbar";
// import { variables } from "../../variables";

// function SearchResultPage() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const params = new URLSearchParams(location.search);
//   const query = params.get("query") || "";
//   const companyId = params.get("companyId");
//   const companyName = params.get("companyName");
//   const linhvucId = params.get("linhvuc");

//   const [sortBy, setSortBy] = useState("ngaydang");
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [filters, setFilters] = useState({
//     bangcap: "all",
//     chucdanh: "all",
//     kinhnghiem: "all",
//     linhvuc: "all",
//     loaihinh: "all",
//     vitri: "all",
//   });

//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // 🧩 Gọi API tìm kiếm
//   const fetchJobs = async (filtersToUse = filters) => {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await fetch(`${variables.API_URL}Find/search`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           Keyword: query,
//           Page: 1,
//           PageSize: 50,
//           LoaiHinhId:
//             filtersToUse.loaihinh === "all" ? null : Number(filtersToUse.loaihinh),
//           ChucDanhId:
//             filtersToUse.chucdanh === "all" ? null : Number(filtersToUse.chucdanh),
//           KinhNghiemId:
//             filtersToUse.kinhnghiem === "all" ? null : Number(filtersToUse.kinhnghiem),
//           BangCapId:
//             filtersToUse.bangcap === "all" ? null : Number(filtersToUse.bangcap),
//           ViTriId:
//             filtersToUse.vitri === "all" ? null : Number(filtersToUse.vitri),
//           LinhVucId:
//             filtersToUse.linhvuc === "all" ? null : Number(filtersToUse.linhvuc),
//           CongTyId: companyId ? Number(companyId) : null, // ✅ lọc theo công ty nếu có
//           SortBy: sortBy,
//           SortOrder: sortOrder,
//         }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setJobs(data.data || data.Data || []);
//       } else {
//         setError(data.message || "Không tải được kết quả.");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Lỗi kết nối máy chủ.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Khi query hoặc filter hoặc sort thay đổi → gọi lại API
// useEffect(() => {
//   const newFilters = { ...filters };
//   if (linhvucId) newFilters.linhvuc = linhvucId;
//   fetchJobs(newFilters);
// }, [query, filters, sortBy, sortOrder, companyId, linhvucId]);

//   // Nhận dữ liệu filter từ FilterBar
//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//   };

//   // Khi user nhập lại từ khóa trong SearchBar
//   const handleSearch = (newQuery) => {
//     navigate(`/search?query=${encodeURIComponent(newQuery)}`);
//   };

//   return (
//     <>
//       <Navbar />
//       <SearchBar className="pb-0 pt-3" onSearch={handleSearch} />
//       <FilterBar onFilter={handleFilterChange} />

//       <div className="p-4">
//         {/* Tiêu đề trang */}
//         {companyId && (
//           <h1 className="text-2xl font-bold mb-4 text-primary">
//             Tin tuyển dụng của {companyName || "công ty"}
//           </h1>
//         )}

//         <h2 className="text-lg font-semibold mb-3">
//           Kết quả cho: “{query}”{" "}
//           {loading ? (
//             <span className="text-sm text-gray-400">(Đang tải...)</span>
//           ) : (
//             `(${jobs.length})`
//           )}
//         </h2>

//         {/* Dropdown sắp xếp */}
//         <div className="flex items-center gap-2 text-sm mb-4">
//           <label htmlFor="sort" className="text-gray-600">
//             Sắp xếp theo:
//           </label>
//           <select
//             id="sort"
//             value={`${sortBy}-${sortOrder}`}
//             onChange={(e) => {
//               const [field, order] = e.target.value.split("-");
//               setSortBy(field);
//               setSortOrder(order);
//             }}
//             className="border rounded px-2 py-1 text-sm"
//           >
//             <option value="ngaydang-desc">Ngày đăng ↓</option>
//             <option value="ngaydang-asc">Ngày đăng ↑</option>
//             <option value="tieude-asc">Tiêu đề A → Z</option>
//             <option value="tieude-desc">Tiêu đề Z → A</option>
//             <option value="tencongty-asc">Tên công ty A → Z</option>
//             <option value="tencongty-desc">Tên công ty Z → A</option>
//             <option value="luong-desc">Lương cao → thấp</option>
//             <option value="luong-asc">Lương thấp → cao</option>
//           </select>
//         </div>

//         {error && <p className="text-red-500">{error}</p>}
//         {!loading && !error && jobs.length === 0 && (
//           <p className="text-gray-500">Không tìm thấy công việc phù hợp.</p>
//         )}

//         {/* Danh sách công việc */}
//         <ul className="space-y-3">
//           {jobs.map((job) => (
//             <li
//               key={job.id}
//               onClick={() => navigate(`/jobdetail/${job.id}`)}
//               className="flex items-center border rounded-md p-3 hover:border-accent cursor-pointer transition"
//             >
//               {/* Logo công ty */}
//               {job.logo && (
//                 <img
//                   src={`${variables.API_URL}CongTy/logo/${job.logo.replace(
//                     /^\/Upload\//,
//                     ""
//                   )}`}
//                   alt={job.tieuDe}
//                   className="w-16 h-16 object-cover rounded mr-4"
//                 />
//               )}

//               {/* Thông tin công việc */}
//               <div>
//                 <h3 className="text-md font-semibold">{job.tieuDe}</h3>
//                 <p className="text-sm text-gray-600">
//                   {job.tenCongTy} — {job.loaiHinh}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   Lĩnh vực: {job.linhVuc} | Bằng cấp: {job.bangCap}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   Ngày đăng: {job.ngayDang?.slice(0, 10)} | Hạn nộp:{" "}
//                   {job.hanNop?.slice(0, 10)}
//                 </p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// }

// export default SearchResultPage;



// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Navbar from "../../components/navbar";
// import SearchBar from "./components/searchbar";
// import FilterBar from "./components/filterbar";
// import { variables } from "../../variables";
// import Footer from "../../components/footer";

// function SearchResultPage() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const params = new URLSearchParams(location.search);
//   const query = params.get("query") || "";
//   const companyId = params.get("companyId");
//   const companyName = params.get("companyName");

//   const [sortBy, setSortBy] = useState("ngaydang");
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [filters, setFilters] = useState({
//     bangcap: "all",
//     chucdanh: "all",
//     kinhnghiem: "all",
//     linhvuc: "all",
//     loaihinh: "all",
//     vitri: "all",
//   });

//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // 🌟 Đồng bộ filters.linhvuc với URL
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const linhvucId = params.get("linhvuc") || "all";

//     setFilters((prev) => ({ ...prev, linhvuc: linhvucId }));
//   }, [location.search]);

//   // 🧩 Gọi API tìm kiếm
//   const fetchJobs = async (filtersToUse = filters) => {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await fetch(`${variables.API_URL}Find/search`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           Keyword: query,
//           Page: 1,
//           PageSize: 50,
//           LoaiHinhId:
//             filtersToUse.loaihinh === "all" ? null : Number(filtersToUse.loaihinh),
//           ChucDanhId:
//             filtersToUse.chucdanh === "all" ? null : Number(filtersToUse.chucdanh),
//           KinhNghiemId:
//             filtersToUse.kinhnghiem === "all" ? null : Number(filtersToUse.kinhnghiem),
//           BangCapId:
//             filtersToUse.bangcap === "all" ? null : Number(filtersToUse.bangcap),
//           ViTriId:
//             filtersToUse.vitri === "all" ? null : Number(filtersToUse.vitri),
//           LinhVucId:
//             filtersToUse.linhvuc === "all" ? null : Number(filtersToUse.linhvuc),
//           CongTyId: companyId ? Number(companyId) : null,
//           SortBy: sortBy,
//           SortOrder: sortOrder,
//         }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setJobs(data.data || data.Data || []);
//       } else {
//         setError(data.message || "Không tải được kết quả.");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Lỗi kết nối máy chủ.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🌟 Khi filters, query, sort thay đổi → gọi API
// useEffect(() => {
//   // chỉ fetch khi filters đến từ URL đã sync
//   if (!filters) return;
//   fetchJobs(filters);
// }, [filters]);

//   // Nhận dữ liệu filter từ FilterBar
//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);

//     // Đồng bộ URL với linhvuc
//     const searchParams = new URLSearchParams(location.search);
// if (newFilters.linhvuc !== filters.linhvuc) {
//   const searchParams = new URLSearchParams(location.search);

//   if (newFilters.linhvuc === "all") {
//     searchParams.delete("linhvuc");
//   } else {
//     searchParams.set("linhvuc", newFilters.linhvuc);
//   }

//   navigate(`/search?${searchParams.toString()}`, { replace: true });
// }
//   };

//   // Khi user nhập lại từ khóa trong SearchBar
//   const handleSearch = (newQuery) => {
//     const searchParams = new URLSearchParams(location.search);
//     searchParams.set("query", newQuery);
//     navigate(`/search?${searchParams.toString()}`);
//   };

//   return (
//     <>
//     <div className=" min-h-screen flex flex-col justify-between">
//       <Navbar />
//       <SearchBar className="pb-0 pt-3" onSearch={handleSearch} />
//       <FilterBar onFilter={handleFilterChange} />

//       <div className="p-4">
//         {/* Tiêu đề trang */}
//         {companyId && (
//           <h1 className="text-2xl font-bold mb-4 text-primary">
//             Tin tuyển dụng của {companyName || "công ty"}
//           </h1>
//         )}

//         <h2 className="text-lg font-semibold mb-3">
//           Kết quả cho: “{query}”{" "}
//           {loading ? (
//             <span className="text-sm text-gray-400">(Đang tải...)</span>
//           ) : (
//             `(${jobs.length})`
//           )}
//         </h2>

//         {/* Dropdown sắp xếp */}
//         <div className="flex items-center gap-2 text-sm mb-4">
//           <label htmlFor="sort" className="text-gray-600">
//             Sắp xếp theo:
//           </label>
//           <select
//             id="sort"
//             value={`${sortBy}-${sortOrder}`}
//             onChange={(e) => {
//               const [field, order] = e.target.value.split("-");
//               setSortBy(field);
//               setSortOrder(order);
//             }}
//             className="border rounded px-2 py-1 text-sm"
//           >
//             <option value="ngaydang-desc">Ngày đăng ↓</option>
//             <option value="ngaydang-asc">Ngày đăng ↑</option>
//             <option value="tieude-asc">Tiêu đề A → Z</option>
//             <option value="tieude-desc">Tiêu đề Z → A</option>
//             <option value="tencongty-asc">Tên công ty A → Z</option>
//             <option value="tencongty-desc">Tên công ty Z → A</option>
//             <option value="luong-desc">Lương cao → thấp</option>
//             <option value="luong-asc">Lương thấp → cao</option>
//           </select>
//         </div>

//         {error && <p className="text-red-500">{error}</p>}
//         {!loading && !error && jobs.length === 0 && (
//           <p className="text-gray-500">Không tìm thấy công việc phù hợp.</p>
//         )}

//         {/* Danh sách công việc */}
//         <ul className="space-y-3">
//           {jobs.map((job) => (
//             <li
//               key={job.id}
//               onClick={() => navigate(`/jobdetail/${job.id}`)}
//               className="flex items-center border rounded-md p-3 hover:border-accent cursor-pointer transition"
//             >
//               {/* Logo công ty */}
//               {job.logo && (
//                 <img
//                   src={`${variables.API_URL}CongTy/logo/${job.logo.replace(/^\/Upload\//, "")}`}
//                   alt={job.tieuDe}
//                   className="w-16 h-16 object-cover rounded mr-4"
//                 />
//               )}

//               {/* Thông tin công việc */}
//               <div>
//                 <h3 className="text-md font-semibold">{job.tieuDe}</h3>
//                 <p className="text-sm text-gray-600">
//                   {job.tenCongTy} — {job.loaiHinh} - {job.viTri}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   Lĩnh vực: {job.linhVuc} | Bằng cấp: {job.bangCap} | Kinh nghiệm: {job.kinhNghiem}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   Ngày đăng: {job.ngayDang?.slice(0, 10)} | Hạn nộp: {job.hanNop?.slice(0, 10)}
//                 </p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <Footer />
//       </div>
//     </>
//   );
// }

// export default SearchResultPage;




import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar";
import SearchBar from "./components/searchbar";
import FilterBar from "./components/filterbar";
import { variables } from "../../variables";
import Footer from "../../components/footer";

function SearchResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const query = params.get("query") || "";
  const companyId = params.get("companyId");
  const companyName = params.get("companyName");

  const [sortBy, setSortBy] = useState("ngaydang");
  const [sortOrder, setSortOrder] = useState("desc");

  // 🔥 Ban đầu rỗng → chỉ khi URL sync mới fetch
  const [filters, setFilters] = useState(null);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🌟 Đồng bộ filters từ URL lần đầu
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    setFilters({
      bangcap: "all",
      chucdanh: "all",
      kinhnghiem: "all",
      loaihinh: "all",
      vitri: "all",
      linhvuc: params.get("linhvuc") || "all",
    });
  }, [location.search]);

  // 🧩 Chỉ fetch khi filters đã sync
  useEffect(() => {
    if (!filters) return;
    fetchJobs(filters);
  }, [filters, sortBy, sortOrder]);

  // 🧩 API gọi 1 lần ổn định
  const fetchJobs = async (filtersToUse) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${variables.API_URL}Find/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Keyword: query || "",
          Page: 1,
          PageSize: 50,
          LoaiHinhId: filtersToUse.loaihinh === "all" ? null : Number(filtersToUse.loaihinh),
          ChucDanhId: filtersToUse.chucdanh === "all" ? null : Number(filtersToUse.chucdanh),
          KinhNghiemId: filtersToUse.kinhnghiem === "all" ? null : Number(filtersToUse.kinhnghiem),
          BangCapId: filtersToUse.bangcap === "all" ? null : Number(filtersToUse.bangcap),
          ViTriId: filtersToUse.vitri === "all" ? null : Number(filtersToUse.vitri),
          LinhVucId: filtersToUse.linhvuc === "all" ? null : Number(filtersToUse.linhvuc),
          CongTyId: companyId ? Number(companyId) : null,
          SortBy: sortBy,
          SortOrder: sortOrder,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        const today = new Date();

        const filtered = (data.data || []).filter((job) => {
          const deadline = new Date(job.hanNop);
          return job.trangThai === "Đã duyệt" && deadline >= today;
        });

        setJobs(filtered);
      }
      else {
        setError(data.message || "Không tải được kết quả.");
      }
    } catch (err) {
      setError("Lỗi kết nối máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  // Nhận dữ liệu filter từ FilterBar
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);

    const searchParams = new URLSearchParams(location.search);

    if (newFilters.linhvuc === "all") searchParams.delete("linhvuc");
    else searchParams.set("linhvuc", newFilters.linhvuc);

    navigate(`/search?${searchParams.toString()}`, { replace: true });
  };

  const handleSearch = (newQuery) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("query", newQuery);
    navigate(`/search?${searchParams.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
    <div>
      <Navbar/>
      <SearchBar onSearch={handleSearch} className="py-3 bg-secondary"/>
      <FilterBar onFilter={handleFilterChange} />

    </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold mb-3">
          Kết quả cho: “{query}” {loading ? "(Đang tải...)" : `(${jobs.length})`}
        </h2>

        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && jobs.length === 0 && (
          <p className="text-gray-500">Không tìm thấy công việc phù hợp.</p>
        )}

        <ul className="space-y-3">
          {jobs.map((job) => (
            <li
              key={job.id}
              onClick={() => navigate(`/jobdetail/${job.id}`)}
              className="flex items-center border rounded-md p-3 hover:border-accent cursor-pointer transition"
            >
              {job.logo && (
                <img
                  src={`${variables.API_URL}CongTy/logo/${job.logo.replace(/^\/Upload\//, "")}`}
                  className="w-16 h-16 object-cover rounded mr-4"
                />
              )}
              <div>
                <h3 className="text-md font-semibold">{job.tieuDe}</h3>
                <p className="text-sm text-gray-600">
                  {job.tenCongTy} — {job.loaiHinh} - {job.viTri}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Footer />
    </div>
  );
}

export default SearchResultPage;
