// import React, { use, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { variables } from "../../variables";
// import EmployerNavbar from "../../components/employernavbar";
// import { useNavigate } from "react-router-dom";


// function AppliedCheck() {
//   const { tinId } = useParams();
//   const navigate = useNavigate();
//   const [applicants, setApplicants] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   const handleViewDetail = (utid) => {
//     navigate(`/applied-detail/${utid}`);
//   };

//   const fetchApplicants = async () => {
//   try {
//     const res = await fetch(`${variables.API_URL}TInTuyenDung/danh-sach-co-ban/${tinId}`, {
//       credentials: "include", // ✅ gửi cookie JWT
//     });

//     const text = await res.text();
//     let data;
//     try {
//       data = JSON.parse(text);
//     } catch {
//       data = { message: text };
//     }

//     if (res.ok) {
//   // API trả mảng trực tiếp
//   setApplicants(Array.isArray(data) ? data : []);
// } else {
//   setError(data.message || "Không tải được danh sách ứng tuyển.");
// }
//   } catch (err) {
//     setError("Lỗi kết nối máy chủ!");
//     console.error(err);
//   } finally {
//     setLoading(false);
//   }
// };

// useEffect(() => {
//   fetchApplicants();
// }, [tinId]);

//   return (
//     <>
//       <EmployerNavbar />
//       <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
//         <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
//           Danh sách ứng viên - Tin #{tinId}
//         </h2>

//         {loading && <p className="text-center">Đang tải dữ liệu...</p>}
//         {error && <p className="text-center text-red-500">{error}</p>}

//         {!loading && !error && applicants.length === 0 && (
//           <p className="text-center text-gray-500">
//             Chưa có ứng viên nào nộp đơn.
//           </p>
//         )}

//         {applicants.length > 0 && (
//           <table className="w-full border border-gray-300">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="p-2 border">#</th>
//                 <th className="p-2 border">ID Ứng viên</th>
//                 <th className="p-2 border">Ngày nộp</th>
//                 <th className="p-2 border">Trạng thái</th>
//               </tr>
//             </thead>
//             <tbody>
//               {applicants.map((a, index) => (
//                 <tr key={a.donUngTuyenId} className="text-center">
//                   <td className="p-2 border">{index + 1}</td>
//                   <td className="p-2 border">{a.ungVienId}</td>
//                   <td className="p-2 border">{a.ngayNop}</td>
//                   <td
//                     className={`p-2 border ${
//                       a.trangThai === "Đã duyệt"
//                         ? "text-green-700 font-semibold"
//                         : a.trangThai === "Đang chờ duyệt"
//                         ? "text-yellow-600"
//                         : "text-gray-600"
//                     }`}
//                   >
//                     {a.trangThai}
//                   </td>
//                   <button
//             onClick={() => handleViewDetail(a.donUngTuyenId)}
//             className="bg-blue-500 text-white px-3 py-1 rounded"
//           >
//             Xem chi tiết
//           </button>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </>
//   );
// }

// export default AppliedCheck;








import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { variables } from "../../variables";
import Footer from "../../components/footer";
import EmployerNavbar from "../../components/employernavbar";

function AppliedCheck() {
  const { tinId } = useParams();
  const navigate = useNavigate();

  const [applicants, setApplicants] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});

  const [chucDanhMap, setChucDanhMap] = useState({});
  const [loaiHinhMap, setLoaiHinhMap] = useState({});
  const [linhVucMap, setLinhVucMap] = useState({});


  // State cho duyệt nhanh
  const [selected, setSelected] = useState([]);
  const [bulkStatus, setBulkStatus] = useState("");

  // Hàm xem chi tiết ứng tuyển
  const handleViewDetail = (utid) => {
    navigate(`/applied-detail/${utid}`);
  };

  // Lấy danh sách ứng viên
  const fetchApplicants = async () => {
    try {
      const res = await fetch(
        `${variables.API_URL}TInTuyenDung/danh-sach-co-ban/${tinId}`,
        {
          credentials: "include",
        }
      );

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }

      if (res.ok) {
        setApplicants(Array.isArray(data) ? data : []);

        // load chi tiết mỗi ứng viên
        data.forEach(app => fetchApplicantDetail(app.donUngTuyenId));
      } else {
        setError(data.message || "Không tải được danh sách ứng tuyển.");
      }
    } catch (err) {
      console.error(err);
      setError("Tin chưa có ứng tuyển!");
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchApplicants();
  }, [tinId]);

  // Toggle chọn từng ứng viên
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Chọn tất cả
  const toggleSelectAll = () => {
    if (selected.length === applicants.length) {
      setSelected([]);
    } else {
      setSelected(applicants.map((a) => a.donUngTuyenId));
    }
  };

  // Duyệt nhanh
  const handleBulkApprove = async () => {
    if (selected.length === 0) return alert("Chưa chọn ứng viên nào!");
    if (!bulkStatus) return alert("Vui lòng chọn trạng thái!");

    try {
      const res = await fetch(`${variables.API_URL}TInTuyenDung/duyet-nhanh`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          utidList: selected,  // 🔹 đổi tên đúng backend
          trangThai: bulkStatus,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Duyệt nhanh thành công!");
        fetchApplicants();
        setSelected([]);
      } else {
        alert(data.message || "Lỗi duyệt nhanh!");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối máy chủ!");
    }
  };
  const fetchApplicantDetail = async (id) => {
    try {
      const res = await fetch(`${variables.API_URL}TInTuyenDung/chi-tiet-don/${id}`, {
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setDetails(prev => ({
          ...prev,
          [id]: {
            name: data.thongTinCaNhan?.hoVaTen,
            hocVan: data.hoSoChiTiet?.hocVan,
            kyNang: data.hoSoChiTiet?.kyNang,
            chucDanhID: data.hoSoChiTiet?.chucDanhID,
            loaiHinhLamViecID: data.hoSoChiTiet?.loaiHinhLamViecID,
            linhVucID: data.hoSoChiTiet?.linhVucID,
          }
        }));
      }
    } catch (error) {
      console.error("Lỗi load chi tiết: ", error);
    }
  };




  useEffect(() => {
    const fetchLookups = async () => {
      try {
        // Chức danh
        const resCD = await fetch(`${variables.API_URL}ChucDanh/list`, { credentials: "include" });
        const dataCD = await resCD.json();
        if (resCD.ok) {
          const map = {};
          dataCD.data.forEach(cd => { map[cd.cdid] = cd.cdName; });
          setChucDanhMap(map);
        }

        // Loại hình làm việc
        const resLH = await fetch(`${variables.API_URL}LoaiHinhLamViec/list`, { credentials: "include" });
        const dataLH = await resLH.json();
        if (resLH.ok) {
          const map = {};
          dataLH.data.forEach(lh => { map[lh.lhid] = lh.lhName; });
          setLoaiHinhMap(map);
        }

        // Lĩnh vực
        const resLV = await fetch(`${variables.API_URL}LinhVuc/list`, { credentials: "include" });
        const dataLV = await resLV.json();
        if (resLV.ok) {
          const map = {};
          dataLV.data.forEach(lv => { map[lv.lvid] = lv.lvName; });
          setLinhVucMap(map);
        }

      } catch (err) {
        console.error("Lỗi load lookup:", err);
      }
    };

    fetchLookups();
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen justify-between">
        <EmployerNavbar />
        <div className="lg:min-w-5xl md:min-w-2xl min-w-10 mx-auto p-6 bg-white rounded shadow">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
            Danh sách ứng viên - Tin #{tinId}
          </h2>

          {loading && <p className="text-center">Đang tải dữ liệu...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          {!loading && !error && applicants.length === 0 && (
            <p className="text-center text-gray-500">Chưa có ứng viên nào nộp đơn.</p>
          )}

          {/* khu vực duyệt nhanh */}
          {applicants.length > 0 && (
            <div className="flex gap-3 mb-4 items-center">
              <select
                className="border p-2 rounded"
                value={bulkStatus}
                onChange={(e) => setBulkStatus(e.target.value)}
              >
                <option value="">-- Chọn trạng thái --</option>
                <option value="Đã duyệt">Đã xem</option>
                <option value="Phỏng vấn">Phỏng vấn</option>
                <option value="Từ chối">Từ chối</option>
              </select>

              <button
                onClick={handleBulkApprove}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Duyệt nhanh
              </button>
            </div>
          )}

          {/* Bảng danh sách */}
          {applicants.length > 0 && (
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">
                    <input
                      type="checkbox"
                      checked={selected.length === applicants.length}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="p-2 border">#</th>
                  {/* <th className="p-2 border">ID Ứng viên</th> */}
                  <th className="p-2 border">Họ tên</th>
                  <th className="p-2 border">Học vấn</th>
                  <th className="p-2 border">Kỹ năng</th>
                  <th className="p-2 border">Chức danh</th>
                  <th className="p-2 border">Loại hình làm việc</th>
                  <th className="p-2 border">Lĩnh vực</th>
                  <th className="p-2 border">Ngày nộp</th>
                  <th className="p-2 border">Trạng thái</th>
                  <th className="p-2 border">Hành động</th>
                </tr>
              </thead>

              <tbody>
                {applicants.map((a, index) => (
                  <tr key={a.donUngTuyenId} className="text-center">
                    <td className="p-2 border">
                      <input
                        type="checkbox"
                        checked={selected.includes(a.donUngTuyenId)}
                        onChange={() => toggleSelect(a.donUngTuyenId)}
                      />
                    </td>

                    <td className="p-2 border">{index + 1}</td>
                    {/* <td className="p-2 border">{a.ungVienId}</td> */}
                    <td className="p-2 border">
                      {details[a.donUngTuyenId]?.name || "Đang tải..."}
                    </td>

                    <td className="p-2 border">
                      {details[a.donUngTuyenId]?.hocVan || "—"}
                    </td>

                    <td className="p-2 border">
                      {details[a.donUngTuyenId]?.kyNang || "—"}
                    </td>

                    <td className="p-2 border">
                      {chucDanhMap[details[a.donUngTuyenId]?.chucDanhID] || "—"}
                    </td>
                    <td className="p-2 border">
                      {loaiHinhMap[details[a.donUngTuyenId]?.loaiHinhLamViecID] || "—"}
                    </td>
                    <td className="p-2 border">
                      {linhVucMap[details[a.donUngTuyenId]?.linhVucID] || "—"}
                    </td>


                    <td className="p-2 border">{a.ngayNop}</td>

                    <td
                      className={`p-2 border ${a.trangThai === "Đã duyệt"
                        ? "text-green-700 font-semibold"
                        : a.trangThai === "Đang chờ duyệt"
                          ? "text-yellow-600"
                          : "text-gray-600"
                        }`}
                    >
                      {a.trangThai}
                    </td>

                    <td className="p-2 border">
                      <button
                        onClick={() => handleViewDetail(a.donUngTuyenId)}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Xem chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default AppliedCheck;