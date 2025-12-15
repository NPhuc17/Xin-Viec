// // src/features/admin/JobDetail.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { variables } from "../../variables";

// function JobDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [reason, setReason] = useState("");

//   useEffect(() => {
//     const fetchJob = async () => {
//       try {
//         const res = await fetch(variables.API_URL + `TInTuyenDung/${id}`, {
//           credentials: "include",
//         });
//         const data = await res.json();
//         if (res.ok) setJob(data.data || data.Data);
//         else setError(data.Message || "Không tải được chi tiết tin.");
//       } catch (err) {
//         console.error(err);
//         setError("Lỗi kết nối máy chủ!");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchJob();
//   }, [id]);

//   const handleApprove = async (action) => {
//     if (action === "reject" && reason.trim() === "") {
//       alert("Vui lòng nhập lý do từ chối!");
//       return;
//     }

//     try {
//       const res = await fetch(variables.API_URL + `TInTuyenDung/approve/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           action,
//           reason: action === "reject" ? reason : null,
//         }),
//         credentials: "include",
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert(data.Message || "Thao tác thành công!");
//         navigate("/admin/jobs");
//       } else {
//         alert(data.Message || "Lỗi xử lý tin!");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Lỗi kết nối máy chủ!");
//     }
//   };

//   if (loading) return <p className="text-center mt-6">Đang tải...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;
//   if (!job) return <p className="text-center text-gray-500">Không tìm thấy tin.</p>;

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
//       <h2 className="text-2xl font-bold mb-4 text-center">Chi tiết tin tuyển dụng</h2>

//       <div className="space-y-2">
//         <p><strong>Tiêu đề:</strong> {job.tieuDe}</p>
//         <p><strong>Mô tả:</strong> {job.mieuTa}</p>
//         <p><strong>Trạng thái:</strong> {job.trangThai}</p>
//         <p><strong>Yêu cầu:</strong> {job.yeuCau}</p>
//         <p><strong>Tuổi:</strong> {job.tuoi}</p>
//         <p><strong>Ngày đăng:</strong> {job.ngayDang?.slice(0, 10)}</p>
//         <p><strong>Hạn nộp:</strong> {job.hanNop?.slice(0, 10)}</p>
//       </div>

//       <div className="mt-6">
//         <textarea
//           placeholder="Nhập lý do từ chối (nếu có)"
//           className="w-full border rounded p-2 mb-4"
//           value={reason}
//           onChange={(e) => setReason(e.target.value)}
//         ></textarea>

//         <div className="flex justify-center gap-4">
//           <button
//             onClick={() => handleApprove("approve")}
//             className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//           >
//             ✅ Duyệt tin
//           </button>
//           <button
//             onClick={() => handleApprove("reject")}
//             className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//           >
//             ❌ Từ chối
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default JobDetail;



import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { variables } from "../../variables";

function JobDetail() {
  const { id } = useParams();       // jobId
  const navigate = useNavigate();
  const location = useLocation();
  const toCaoId = location.state?.toCaoId;
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reason, setReason] = useState("");

  const viewOnly = location.state?.viewOnly === true


  // Thông tin phụ
  const [bangCap, setBangCap] = useState("");
  const [linhVuc, setLinhVuc] = useState("");
  const [chucDanh, setChucDanh] = useState("");
  const [loaiHinh, setLoaiHinh] = useState("");
  const [viTri, setViTri] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        // 1️⃣ Lấy chi tiết job
        const res = await fetch(variables.API_URL + `TInTuyenDung/${id}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) setJob(data.data || data.Data);
        else {
          setError(data.Message || "Không tải được chi tiết tin.");
          setLoading(false);
          return;
        }

        const jobData = data.data || data.Data;

        // 2️⃣ Lấy thông tin phụ
        const fetchDetail = async (url) => {
          try {
            const res = await fetch(url, { credentials: "include" });
            const d = await res.json();
            if (res.ok) return d.data;
            return null;
          } catch (err) {
            console.error(err);
            return null;
          }
        };

        if (jobData.bangcapID)
          fetchDetail(variables.API_URL + `BangCap/${jobData.bangcapID}`).then(
            (d) => d && setBangCap(d.bcName)
          );
        if (jobData.linhvucIID)
          fetchDetail(variables.API_URL + `LinhVuc/${jobData.linhvucIID}`).then(
            (d) => d && setLinhVuc(d.lvName)
          );
        if (jobData.chucdanhID)
          fetchDetail(variables.API_URL + `ChucDanh/${jobData.chucdanhID}`).then(
            (d) => d && setChucDanh(d.cdName)
          );
        if (jobData.loaihinhID)
          fetchDetail(variables.API_URL + `LoaiHinhLamViec/${jobData.loaihinhID}`).then(
            (d) => d && setLoaiHinh(d.lhName)
          );
        if (jobData.vitriID)
          fetchDetail(variables.API_URL + `ViTri/${jobData.vitriID}`).then(
            (d) => d && setViTri(d.vtName)
          );

      } catch (err) {
        console.error(err);
        setError("Lỗi kết nối máy chủ!");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleApprove = async (action) => {
    if (action === "reject" && reason.trim() === "") {
      alert("Vui lòng nhập lý do từ chối!");
      return;
    }

    try {
      const res = await fetch(variables.API_URL + `TInTuyenDung/approve/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          reason: action === "reject" ? reason : null,
        }),
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.Message || "Thao tác thành công!");
        navigate("/admin/jobs");
      } else {
        alert(data.Message || "Lỗi xử lý tin!");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối máy chủ!");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Bạn có chắc muốn xóa tin tuyển dụng này?")) return;

    try {
      const res = await fetch(variables.API_URL + `TInTuyenDung/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.Message || "Đã xóa thành công!");
        navigate("/admin/jobs");
      } else {
        alert(data.Message || "Xóa thất bại vì tin có người ứng tuyển!");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối máy chủ!");
    }
  };

  const handleXuLyToCao = async () => {
    if (!toCaoId) {
      alert("Không tìm thấy ID tố cáo!");
      return;
    }

    if (!window.confirm("Xác nhận đã xử lý tố cáo và khoá tin tuyển dụng?"))
      return;

    try {
      const res = await fetch(
        variables.API_URL + `ToCao/xu-ly/${toCaoId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
          },
          body: JSON.stringify({
            hanhDong: "Đã xử lý"
          }),
          credentials: "include"
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Xử lý tố cáo thất bại");
      }

      alert("Đã xử lý tố cáo và khoá tin tuyển dụng!");
      navigate("/admin/baocao");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  if (loading) return <p className="text-center mt-6">Đang tải...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!job) return <p className="text-center text-gray-500">Không tìm thấy tin.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Chi tiết tin tuyển dụng</h2>

      <div className="space-y-2">
        <p><strong>Tiêu đề:</strong> {job.tieuDe}</p>
        <p><strong>Mô tả:</strong> {job.mieuTa}</p>
        <p><strong>Trạng thái:</strong> {job.trangThai}</p>
        <p><strong>Yêu cầu:</strong> {job.yeuCau}</p>
        <p><strong>Tuổi:</strong> {job.tuoi}</p>
        <p><strong>Ngày đăng:</strong> {job.ngayDang?.slice(0, 10)}</p>
        <p><strong>Hạn nộp:</strong> {job.hanNop?.slice(0, 10)}</p>

        {/* Thông tin phụ */}
        <p><strong>Bằng cấp:</strong> {bangCap || "Chưa xác định"}</p>
        <p><strong>Lĩnh vực:</strong> {linhVuc || "Chưa xác định"}</p>
        <p><strong>Chức danh:</strong> {chucDanh || "Chưa xác định"}</p>
        <p><strong>Loại hình:</strong> {loaiHinh || "Chưa xác định"}</p>
        <p><strong>Vị trí:</strong> {viTri || "Chưa xác định"}</p>
      </div>

      {/* <div className="mt-6">
        <textarea
          placeholder="Nhập lý do từ chối (nếu có)"
          className="w-full border rounded p-2 mb-4"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        ></textarea>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleApprove("approve")}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            ✅ Duyệt tin
          </button>
          <button
            onClick={() => handleApprove("reject")}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            ❌ Từ chối
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            🗑 Xóa
          </button>

          <button
            onClick={handleXuLyToCao}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            🔒 Khoá
          </button>
        </div>
      </div> */}
      {!viewOnly && (
        <div className="mt-6">
          <textarea
            placeholder="Nhập lý do từ chối (nếu có)"
            className="w-full border rounded p-2 mb-4"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          ></textarea>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleApprove("approve")}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              ✅ Duyệt tin
            </button>

            <button
              onClick={() => handleApprove("reject")}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              ❌ Từ chối
            </button>

            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
            >
              🗑 Xóa
            </button>

            <button
              onClick={handleXuLyToCao}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              🔒 Khoá
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default JobDetail;
