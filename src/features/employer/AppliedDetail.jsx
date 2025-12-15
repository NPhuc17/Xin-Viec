// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { variables } from "../../variables";
// import { Document, Page, pdfjs } from "react-pdf";
// import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
// import Cookies from "js-cookie";
// import EmployerNavbar from "../../components/employernavbar";
// import Footer from "../../components/footer";

// pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

// // 🧩 Component xem PDF có JWT
// function PDFViewerWithAuth({ pdfUrl }) {
//   const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     async function fetchPdf() {
//       try {
//         const token = Cookies.get("jwt_token");
//         const res = await fetch(pdfUrl, {
//           credentials: "include",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) throw new Error("Không thể tải file hồ sơ");

//         const blob = await res.blob();
//         setPdfBlobUrl(URL.createObjectURL(blob));
//       } catch (err) {
//         console.error(err);
//         setError("Không thể tải file hồ sơ");
//       }
//     }

//     fetchPdf();
//   }, [pdfUrl]);

//   if (error)
//     return <p className="text-red-500 text-sm text-center mt-2">{error}</p>;

//   if (!pdfBlobUrl) return <p className="text-gray-500 mt-2">Đang tải file...</p>;

//   return (
//     <div className="border rounded p-3 bg-white shadow">
//       <Document file={pdfBlobUrl} onLoadError={console.error}>
//         <Page pageNumber={1} width={600} />
//       </Document>
//       <a
//         href={pdfUrl}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="block mt-3 text-blue-600 underline text-center"
//       >
//         Mở toàn bộ PDF
//       </a>
//     </div>
//   );
// }

// // ==========================
// // 🔷 Trang chi tiết đơn ứng tuyển
// // ==========================
// function AppliedDetail() {
//   const { utid } = useParams();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedPdf, setSelectedPdf] = useState(null);
//   const [updating, setUpdating] = useState(false);

//   // 🧭 Gọi API lấy chi tiết đơn ứng tuyển
//   useEffect(() => {
//     async function fetchDetail() {
//       try {
//         const res = await fetch(
//           `${variables.API_URL}TInTuyenDung/chi-tiet-don/${utid}`,
//           { credentials: "include" }
//         );

//         const text = await res.text();
//         let json;
//         try {
//           json = JSON.parse(text);
//         } catch {
//           json = { message: text };
//         }

//         if (res.ok) {
//           setData(json);
//         } else {
//           setError(json.message || "Không thể tải chi tiết đơn ứng tuyển.");
//         }
//       } catch (err) {
//         console.error(err);
//         setError("Lỗi kết nối máy chủ!");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchDetail();
//   }, [utid]);

//   // 🧩 Hàm cập nhật trạng thái ứng tuyển
//   const updateStatus = async (newStatus) => {
//   if (!window.confirm(`Xác nhận cập nhật trạng thái: ${newStatus}?`)) return;

//   setUpdating(true);
//   try {
//     const token = Cookies.get("jwt_token");

//     const res = await fetch(
//       `${variables.API_URL}TInTuyenDung/cap-nhat-trang-thai/${utid}`,
//       {
//         method: "PUT",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ TrangThai: newStatus }),
//       }
//     );

//     // 🔍 Đọc phản hồi dưới dạng text trước
//     const text = await res.text();
//     let dataRes = null;

//     // ✅ Thử parse JSON nếu có thể
//     try {
//       dataRes = JSON.parse(text);
//     } catch (e) {
//       console.warn("Phản hồi không phải JSON:", text);
//     }

//     // ✅ Xử lý theo mã phản hồi
//     if (res.ok) {
//       const message =
//         dataRes?.Message || dataRes?.message || "Cập nhật trạng thái thành công!";
//       alert("✅ " + message);
//       setData((prev) => ({
//         ...prev,
//         trangThai: dataRes?.TrangThaiMoi || newStatus,
//       }));
//     } else {
//       const errMsg =
//         dataRes?.message || text || "Không thể cập nhật trạng thái.";
//       alert("❌ " + errMsg);
//     }
//   } catch (err) {
//     console.error("Lỗi khi gọi API:", err);
//     alert("⚠️ Lỗi máy chủ hoặc kết nối!");
//   } finally {
//     setUpdating(false);
//   }
// };


//   if (loading) return <p className="text-center mt-10">Đang tải...</p>;
//   if (error)
//     return <p className="text-center mt-10 text-red-500">{error}</p>;
//   if (!data) return null;

//   const { thongTinCaNhan, hoSo, ngayNop, trangThai } = data;

//   return (
//     <>
//       <EmployerNavbar />
//       <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-4">
//         <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
//           Chi tiết đơn ứng tuyển #{utid}
//         </h2>

//         <p className="mb-2">
//           <strong>Ngày nộp:</strong> {ngayNop}
//         </p>
//         <p className="mb-4">
//           <strong>Trạng thái hiện tại:</strong>{" "}
//           <span
//             className={
//               trangThai === "Đã xem"
//                 ? "text-green-600"
//                 : trangThai === "Phỏng vấn"
//                 ? "text-blue-600"
//                 : trangThai === "Từ chối"
//                 ? "text-red-600"
//                 : "text-yellow-600"
//             }
//           >
//             {trangThai}
//           </span>
//         </p>

//         {/* 🔘 Nút cập nhật trạng thái */}
//         <div className="flex gap-3 mb-6">
//           <button
//             disabled={updating}
//             onClick={() => updateStatus("Đã xem")}
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           >
//             Duyệt
//           </button>
//           <button
//             disabled={updating}
//             onClick={() => updateStatus("Phỏng vấn")}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Mời phỏng vấn
//           </button>
//           <button
//             disabled={updating}
//             onClick={() => updateStatus("Từ chối")}
//             className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//           >
//             Từ chối
//           </button>
//         </div>

//         <div className="mt-6">
//           <h3 className="text-xl font-semibold mb-2">👤 Thông tin cá nhân</h3>
//           <div className="grid grid-cols-2 gap-3 text-sm">
//             <p><strong>Họ và tên:</strong> {thongTinCaNhan.hoVaTen}</p>
//             <p><strong>Giới tính:</strong> {thongTinCaNhan.gioiTinh}</p>
//             <p><strong>Ngày sinh:</strong> {thongTinCaNhan.ngaySinh}</p>
//             <p><strong>SĐT:</strong> {thongTinCaNhan.sdt}</p>
//             <p><strong>Email:</strong> {thongTinCaNhan.email}</p>
//             <p><strong>CCCD:</strong> {thongTinCaNhan.cccd}</p>
//             <p><strong>Địa chỉ:</strong> {thongTinCaNhan.diaChi}</p>
//             <p><strong>Nơi sinh:</strong> {thongTinCaNhan.noiSinh}</p>
//           </div>
//         </div>

//         <div className="mt-6">
//           <h3 className="text-xl font-semibold mb-2">📄 Hồ sơ tải lên</h3>
//           <p className="mb-2">Tên hồ sơ: {hoSo.hoSoName}</p>

//           {selectedPdf ? (
//             <div className="mt-3 bg-gray-50 border p-4 rounded shadow">
//               <h3 className="text-lg font-semibold mb-2">
//                 Xem hồ sơ: {hoSo.hoSoName}
//               </h3>

//               <PDFViewerWithAuth
//                 pdfUrl={`https://localhost:7144/api/hoso/view/${hoSo.hoSoId}`}
//               />

//               <button
//                 onClick={() => setSelectedPdf(null)}
//                 className="mt-3 bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700"
//               >
//                 Đóng
//               </button>
//             </div>
//           ) : (
//             <button
//               onClick={() =>
//                 setSelectedPdf({
//                   hoSoId: hoSo.hoSoId,
//                   url: hoSo.fileUrl,
//                 })
//               }
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Xem hồ sơ
//             </button>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default AppliedDetail;



// import React, { useEffect, useState, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { variables } from "../../variables";
// import Cookies from "js-cookie";
// import { Document, Page, pdfjs } from "react-pdf";
// import EmployerNavbar from "../../components/employernavbar";
// import Footer from "../../components/footer";

// // ⚡ Load worker PDF.js ổn định từ CDN
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;



// // 📄 Component xem PDF có JWT
// function PDFViewerWithAuth({ pdfUrl }) {
//   const [pdfBlob, setPdfBlob] = useState(null);
//   const [error, setError] = useState(null);
//   const abortRef = useRef(null);








//   useEffect(() => {
//     abortRef.current = new AbortController();
//     const signal = abortRef.current.signal;

//     async function fetchPdf() {
//       try {
//         const token = Cookies.get("jwt_token");
//         const res = await fetch(pdfUrl, {
//           headers: { Authorization: `Bearer ${token}` },
//           signal,
//         });
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         const blob = await res.blob();
//         setPdfBlob(URL.createObjectURL(blob));
//       } catch (err) {
//         if (err.name !== "AbortError") setError(err);
//       }
//     }

//     fetchPdf();

//     return () => {
//       abortRef.current?.abort();
//       if (pdfBlob) URL.revokeObjectURL(pdfBlob);
//     };
//   }, [pdfUrl]);

//   if (error) return <p className="text-red-600">Lỗi tải PDF: {error.message}</p>;
//   if (!pdfBlob) return <p>Đang tải PDF...</p>;

//   return (
//     <Document
//       file={pdfBlob}
//       onLoadError={(err) => setError(err)}
//       loading={<p>Đang render PDF...</p>}
//     >
//       <Page pageNumber={1} width={600} />
//     </Document>
//   );
// }

// function AppliedDetail() {
//   const { utid } = useParams();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedPdf, setSelectedPdf] = useState(null);
//   const [updating, setUpdating] = useState(false);
//   const [chucDanhList, setChucDanhList] = useState([]);
// const [loaiHinhList, setLoaiHinhList] = useState([]);
// const [linhVucList, setLinhVucList] = useState([]);
// const [viTriList, setViTriList] = useState([]);
// const [kinhNghiemList, setKinhNghiemList] = useState([]);


// useEffect(() => {
//   async function fetchLists() {
//     try {
//       const token = Cookies.get("jwt_token");
//       const [chucDanh, loaiHinh, linhVuc, viTri, kinhNghiem] = await Promise.all([
//         fetch(`${variables.API_URL}ChucDanh/list`).then(r => r.json()),
//         fetch(`${variables.API_URL}LoaiHinhLamViec/list`).then(r => r.json()),
//         fetch(`${variables.API_URL}LinhVuc/list`).then(r => r.json()),
//         fetch(`${variables.API_URL}ViTri/list`).then(r => r.json()),
//         fetch(`${variables.API_URL}KinhNghiem/list`).then(r => r.json()),
//       ]);
//       setChucDanhList(chucDanh.data || chucDanh);
//       setLoaiHinhList(loaiHinh.data || loaiHinh);
//       setLinhVucList(linhVuc.data || linhVuc);
//       setViTriList(viTri.data || viTri);
//       setKinhNghiemList(kinhNghiem.data || kinhNghiem);
//     } catch (err) {
//       console.error("Load lists error:", err);
//     }
//   }
//   fetchLists();
// }, []);

//   useEffect(() => {
//     async function fetchDetail() {
//       try {
//         const token = Cookies.get("jwt_token");
//         const res = await fetch(`${variables.API_URL}TInTuyenDung/chi-tiet-don/${utid}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const text = await res.text();
//         let json;
//         try { json = JSON.parse(text); } catch { json = { message: text }; }

//         if (res.ok) setData(json);
//         else setError(json.message || "Không thể tải chi tiết đơn ứng tuyển.");
//       } catch (err) {
//         console.error(err);
//         setError("Lỗi kết nối máy chủ!");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchDetail();
//   }, [utid]);


//   // Generic mapper: trả về name từ list theo id
// const getNameFromItem = (item) => {
//   if (!item || typeof item !== "object") return null;
//   return item.cdName || item.knName || item.lhName || item.lvName || item.vtName || item.name || null;
// };

// const matchesId = (item, idToMatch) => {
//   if (!item) return false;
//   const keys = ["cdid", "knid", "lhid", "lvid", "vtid", "id", "value", "key"];
//   for (const k of keys) {
//     if (k in item && String(item[k]) === String(idToMatch)) return true;
//   }
//   return false;
// };

// const getName = (list, idToMatch) => {
//   if (!idToMatch) return "Không xác định";
//   const found = list.find((it) => matchesId(it, idToMatch));
//   return getNameFromItem(found) || String(idToMatch);
// };

//   const updateStatus = async (newStatus) => {
//     if (!window.confirm(`Xác nhận cập nhật trạng thái: ${newStatus}?`)) return;
//     setUpdating(true);
//     try {
//       const token = Cookies.get("jwt_token");
//       const res = await fetch(`${variables.API_URL}TInTuyenDung/cap-nhat-trang-thai/${utid}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ TrangThai: newStatus }),
//       });
//       const text = await res.text();
//       let dataRes = null;
//       try { dataRes = JSON.parse(text); } catch {}
//       if (res.ok) {
//         alert("✅ " + (dataRes?.Message || "Cập nhật trạng thái thành công!"));
//         setData(prev => ({ ...prev, trangThai: dataRes?.TrangThaiMoi || newStatus }));
//       } else {
//         alert("❌ " + (dataRes?.message || text));
//       }
//     } catch (err) {
//       console.error(err);
//       alert("⚠️ Lỗi máy chủ hoặc kết nối!");
//     } finally {
//       setUpdating(false);
//     }
//   };

//   if (loading) return <p className="text-center mt-10">Đang tải...</p>;
//   if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
//   if (!data) return null;

//   const { thongTinCaNhan, hoSoFile, hoSoChiTiet, ngayNop, trangThai } = data;

//   return (
//     <>
//       <EmployerNavbar />
//       <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-4">
//         <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
//           Chi tiết đơn ứng tuyển #{utid}
//         </h2>

//         <p className="mb-2"><strong>Ngày nộp:</strong> {ngayNop}</p>
//         <p className="mb-4">
//           <strong>Trạng thái hiện tại:</strong>{" "}
//           <span
//             className={
//               trangThai === "Đã xem" ? "text-green-600" :
//               trangThai === "Phỏng vấn" ? "text-blue-600" :
//               trangThai === "Từ chối" ? "text-red-600" : "text-yellow-600"
//             }
//           >
//             {trangThai}
//           </span>
//         </p>

//         <div className="flex gap-3 mb-6">
//           <button disabled={updating} onClick={() => updateStatus("Đã xem")}
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Duyệt</button>
//           <button disabled={updating} onClick={() => updateStatus("Phỏng vấn")}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Mời phỏng vấn</button>
//           <button disabled={updating} onClick={() => updateStatus("Từ chối")}
//             className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Từ chối</button>
//         </div>

//         {/* Thông tin cá nhân */}
//         <div className="mt-6">
//           <h3 className="text-xl font-semibold mb-2">Thông tin cá nhân</h3>
//           <div className="grid grid-cols-2 gap-3 text-sm">
//             <p><strong>Họ và tên:</strong> {thongTinCaNhan.hoVaTen}</p>
//             <p><strong>Giới tính:</strong> {thongTinCaNhan.gioiTinh}</p>
//             <p><strong>Ngày sinh:</strong> {thongTinCaNhan.ngaySinh}</p>
//             <p><strong>SĐT:</strong> {thongTinCaNhan.sdt}</p>
//             <p><strong>Email:</strong> {thongTinCaNhan.email}</p>
//             <p><strong>CCCD:</strong> {thongTinCaNhan.cccd}</p>
//             <p><strong>Địa chỉ:</strong> {thongTinCaNhan.diaChi}</p>
//             <p><strong>Nơi sinh:</strong> {thongTinCaNhan.noiSinh}</p>
//           </div>
//         </div>

//         {/* Hồ sơ */}
//         <div className="mt-6">
//           <h3 className="text-xl font-semibold mb-2">Hồ sơ</h3>

//           {hoSoFile?.fileUrl ? (
//             <>
//               <p className="mb-2">Tên hồ sơ: {hoSoFile.hoSoName}</p>
//               {selectedPdf ? (
//                 <div className="mt-3 bg-gray-50 border p-4 rounded shadow">
//                   <h4 className="font-semibold mb-2">Xem hồ sơ</h4>
//                   <PDFViewerWithAuth pdfUrl={selectedPdf.url} />
//                   <button onClick={() => setSelectedPdf(null)}
//                     className="mt-3 bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700">Đóng</button>
//                 </div>
//               ) : (
//                 <button
//                   onClick={() => setSelectedPdf({ url: `${variables.API_URL}HoSo/view/${hoSoFile.hoSoId}` })}
//                   className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                 >
//                   Xem hồ sơ
//                 </button>
//               )}
//             </>
//           ) : <p className="text-gray-500">Ứng viên tạo hồ sơ mẫu.</p>}

//           {/* Hồ sơ từ form mẫu */}
//           {hoSoChiTiet && (
//   <div className="mt-6 p-6 border rounded shadow bg-gray-50">


//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       {/* LEFT: Avatar + Contact */}
//       <div className="col-span-1 border-r pr-4 flex flex-col items-center">
//         <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden mb-4">
//           {hoSoChiTiet.avata ? (
//             <img
//               src={variables.PHOTO_URL + hoSoChiTiet.avata}
//               alt="avatar"
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-gray-500">
//               Ảnh đại diện
//             </div>
//           )}
//         </div>

//         <p className="font-semibold">{hoSoChiTiet.tenUngVien || "—"}</p>
//         <p>{hoSoChiTiet.phoneHoSo || "—"}</p>
//         <p>{hoSoChiTiet.mailHoSo || "—"}</p>
//       </div>

//       {/* RIGHT: CV Content */}
//       <div className="col-span-2 pl-4 space-y-2 text-sm">
//         <p><strong>Học vấn:</strong> {hoSoChiTiet.hocVan || "—"}</p>
//   <p><strong>Năm kinh nghiệm:</strong> {getName(kinhNghiemList, hoSoChiTiet.namKinhNghiemID) || "Không kinh nghiệm"}</p>
//   <p><strong>Chức danh:</strong> {getName(chucDanhList, hoSoChiTiet.chucDanhID)}</p>
//   <p><strong>Loại hình làm việc:</strong> {getName(loaiHinhList, hoSoChiTiet.loaiHinhLamViecID)}</p>
//   <p><strong>Lĩnh vực:</strong> {getName(linhVucList, hoSoChiTiet.linhVucID)}</p>
//   <p><strong>Vị trí làm việc:</strong> {getName(viTriList, hoSoChiTiet.viTriLamViecID)}</p>
//   <p><strong>Mục tiêu nghề nghiệp:</strong> {hoSoChiTiet.mucTieu || "—"}</p>
//   <p><strong>Kỹ năng:</strong> {hoSoChiTiet.kyNang || "—"}</p>
//   <p><strong>Chứng chỉ:</strong> {hoSoChiTiet.chucChi || "—"}</p>
//       </div>
//     </div>
//   </div>
// )}

//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default AppliedDetail;


import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { variables } from "../../variables";
import Cookies from "js-cookie";
import { Document, Page, pdfjs } from "react-pdf";
import EmployerNavbar from "../../components/employernavbar";
import Footer from "../../components/footer";

import { FaPhone } from "react-icons/fa6";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { CiMail } from "react-icons/ci";

// Load PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// PDF Viewer với JWT
function PDFViewerWithAuth({ pdfUrl }) {
  const [pdfBlob, setPdfBlob] = useState(null);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);



  useEffect(() => {
    abortRef.current = new AbortController();
    const signal = abortRef.current.signal;

    async function fetchPdf() {
      try {
        const token = Cookies.get("jwt_token");
        const res = await fetch(pdfUrl, {
          headers: { Authorization: `Bearer ${token}` },
          signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const blob = await res.blob();
        setPdfBlob(URL.createObjectURL(blob));
      } catch (err) {
        if (err.name !== "AbortError") setError(err);
      }
    }

    fetchPdf();

    return () => {
      abortRef.current?.abort();
      if (pdfBlob) URL.revokeObjectURL(pdfBlob);
    };
  }, [pdfUrl]);

  if (error) return <p className="text-red-600">Lỗi tải PDF: {error.message}</p>;
  if (!pdfBlob) return <p>Đang tải PDF...</p>;

  return (
    <Document
      file={pdfBlob}
      onLoadError={(err) => setError(err)}
      loading={<p>Đang render PDF...</p>}
    >
      <Page pageNumber={1} width={600} />
    </Document>
  );
}

function AppliedDetail() {
  const { utid } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [updating, setUpdating] = useState(false);

  // Dropdown lists
  const [chucDanhList, setChucDanhList] = useState([]);
  const [loaiHinhList, setLoaiHinhList] = useState([]);
  const [linhVucList, setLinhVucList] = useState([]);
  const [viTriList, setViTriList] = useState([]);
  const [kinhNghiemList, setKinhNghiemList] = useState([]);


const [showInterviewModal, setShowInterviewModal] = useState(false);
const [emailContent, setEmailContent] = useState("");


  // Load dropdown lists
  useEffect(() => {
    async function fetchLists() {
      try {
        const [chucDanh, loaiHinh, linhVuc, viTri, kinhNghiem] = await Promise.all([
          fetch(`${variables.API_URL}ChucDanh/list`).then(r => r.json()),
          fetch(`${variables.API_URL}LoaiHinhLamViec/list`).then(r => r.json()),
          fetch(`${variables.API_URL}LinhVuc/list`).then(r => r.json()),
          fetch(`${variables.API_URL}ViTri/list`).then(r => r.json()),
          fetch(`${variables.API_URL}KinhNghiem/list`).then(r => r.json()),
        ]);
        setChucDanhList(chucDanh.data || chucDanh);
        setLoaiHinhList(loaiHinh.data || loaiHinh);
        setLinhVucList(linhVuc.data || linhVuc);
        setViTriList(viTri.data || viTri);
        setKinhNghiemList(kinhNghiem.data || kinhNghiem);
      } catch (err) {
        console.error("Load lists error:", err);
      }
    }
    fetchLists();
  }, []);

  // Load chi tiết đơn
  useEffect(() => {
    async function fetchDetail() {
      try {
        const token = Cookies.get("jwt_token");
        const res = await fetch(`${variables.API_URL}TInTuyenDung/chi-tiet-don/${utid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const text = await res.text();
        let json;
        try { json = JSON.parse(text); } catch { json = { message: text }; }

        if (res.ok) setData(json);
        else setError(json.message || "Không thể tải chi tiết đơn ứng tuyển.");
      } catch (err) {
        console.error(err);
        setError("Lỗi kết nối máy chủ!");
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [utid]);

  // Helper: lấy tên từ danh sách theo id
  const matchesId = (item, idToMatch) => {
    if (!item) return false;
    const keys = ["cdid", "knid", "lhid", "lvid", "vtid", "id"];
    for (const k of keys) {
      if (k in item && String(item[k]) === String(idToMatch)) return true;
    }
    return false;
  };

  const getName = (list, idToMatch) => {
    if (!idToMatch) return "Không xác định";
    const found = list.find(it => matchesId(it, idToMatch));
    return found?.cdName || found?.knName || found?.lhName || found?.lvName || found?.vtName || String(idToMatch);
  };

  // Update trạng thái
  const updateStatus = async (newStatus) => {
    if (!window.confirm(`Xác nhận cập nhật trạng thái: ${newStatus}?`)) return;
    setUpdating(true);
    try {
      const token = Cookies.get("jwt_token");
      const res = await fetch(`${variables.API_URL}TInTuyenDung/cap-nhat-trang-thai/${utid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ TrangThai: newStatus }),
      });
      const text = await res.text();
      let dataRes = null;
      try { dataRes = JSON.parse(text); } catch { }
      if (res.ok) {
        alert("✅ " + (dataRes?.Message || "Cập nhật trạng thái thành công!"));
        setData(prev => ({ ...prev, trangThai: dataRes?.TrangThaiMoi || newStatus }));
      } else {
        alert("❌ " + (dataRes?.message || text));
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Lỗi máy chủ hoặc kết nối!");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Đang tải...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!data) return null;

  const { thongTinCaNhan, hoSoFile, hoSoChiTiet, ngayNop, trangThai, bangCapList } = data;

  return (
    <>
      <EmployerNavbar />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-4">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
          Chi tiết đơn ứng tuyển
        </h2>

        <p className="mb-2"><strong>Ngày nộp:</strong> {ngayNop}</p>
        <p className="mb-4">
          <strong>Trạng thái hiện tại:</strong>{" "}
          <span
            className={
              trangThai === "Đã xem" ? "text-green-600" :
                trangThai === "Phỏng vấn" ? "text-blue-600" :
                  trangThai === "Từ chối" ? "text-red-600" : "text-yellow-600"
            }
          >
            {trangThai}
          </span>
        </p>

        <div className="flex gap-3 mb-6">
          <button disabled={updating} onClick={() => updateStatus("Đã xem")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Đã xem</button>
          <button
            disabled={updating}
            onClick={() => setShowInterviewModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Mời phỏng vấn
          </button>

          <button disabled={updating} onClick={() => updateStatus("Từ chối")}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Từ chối</button>
        </div>

        {/* Thông tin cá nhân */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Thông tin cá nhân</h3>
          <div className="grid grid-cols-2 gap-3 text-base">
            <p><strong>Họ và tên:</strong> {thongTinCaNhan.hoVaTen}</p>
            <p><strong>Giới tính:</strong> {thongTinCaNhan.gioiTinh}</p>
            <p><strong>Ngày sinh:</strong> {thongTinCaNhan.ngaySinh}</p>
            <p><strong>SĐT:</strong> {thongTinCaNhan.sdt}</p>
            <p><strong>Email:</strong> {thongTinCaNhan.email}</p>
            <p><strong>CCCD:</strong> {thongTinCaNhan.cccd}</p>
            <p><strong>Địa chỉ:</strong> {thongTinCaNhan.diaChi + ", "+ thongTinCaNhan.huyen + ", " + thongTinCaNhan.tinh}</p>
            <p><strong>Nơi sinh:</strong> {thongTinCaNhan.noiSinh}</p>
          </div>
        </div>

        {/* Hồ sơ chi tiết */}
        {/* Hồ sơ */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Hồ sơ</h3>

          {hoSoFile?.fileUrl ? (
            <>
              <p className="mb-2">Tên hồ sơ: {hoSoFile.hoSoName}</p>

              {selectedPdf ? (
                <div className="mt-3 bg-gray-50 border p-4 rounded shadow">
                  <h4 className="font-semibold mb-2">Xem hồ sơ</h4>
                  <PDFViewerWithAuth pdfUrl={selectedPdf.url} />


                  {/* Danh sách bằng cấp */}
                  {bangCapList && bangCapList.length > 0 ? (
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold mb-2">Bằng cấp / Chứng chỉ</h4>
                      <ul className="space-y-2">
                        {bangCapList.map((bc) => (
                          <li key={bc.id} className="border p-3 rounded flex flex-col md:flex-row justify-between items-start md:items-center">
                            <div>
                              <p className="font-medium">{bc.tenBangCap}</p>
                              <p className="text-sm text-gray-500">{bc.loai}</p>
                              <p className="text-xs text-gray-400">Ngày upload: {bc.ngayUpload}</p>
                            </div>
                            {bc.fileUrl && (
                              <div className="mt-2 md:mt-0">
                                <a
                                  href={`${variables.PHOTO_URL}${bc.fileUrl}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                >
                                  Xem
                                </a>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => setSelectedPdf(null)}
                        className="mt-3 bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700"
                      >
                        Đóng
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-500 mt-2 italic">Ứng viên chưa upload bằng cấp.</p>
                  )}
                </div>
              ) : (
                <button
                  onClick={() =>
                    setSelectedPdf({
                      url: `${variables.API_URL}HoSo/view/${hoSoFile.hoSoId}`,
                    })
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Xem hồ sơ
                </button>
              )}
            </>
          ) : hoSoChiTiet ? (
            <div className="mt-3 p-6 border rounded shadow bg-gray-50">
              {/* Form mẫu */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-1 border-r pr-4 text-base border-secondary border-dashed">
                  <div className="flex flex-col bg-highlight/70 h-full p-5">
                    <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden mb-4 mx-auto">
                      {hoSoChiTiet.avata ? (
                        <img
                          src={variables.PHOTO_URL + hoSoChiTiet.avata}
                          alt="avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          Ảnh đại diện
                        </div>
                      )}
                    </div>
                    <div className="flex items-center my-3">
                      <MdDriveFileRenameOutline className="mr-2 text-accent" />
                      <p className="font-semibold">{hoSoChiTiet.tenUngVien || "—"}</p>
                    </div>

                    <div className="flex items-center my-3">
                      <FaPhone className="mr-2 text-accent" />
                      <p className=" ">{hoSoChiTiet.phoneHoSo || "—"}</p>
                    </div>

                    <div className="flex items-center my-3">
                      <CiMail className="mr-2 text-accent" />
                      <p className=" text-[14px] break-all">{hoSoChiTiet.mailHoSo || "—"}</p>
                    </div>


                    <div className="my-4">
                      <strong className="p-1 pr-10 bg-accent rounded-[8px] text-white uppercase">Kỹ năng</strong>
                      <div className="h-[2px] w-full bg-accent mt-1"></div>

                      <p>{hoSoChiTiet.kyNang || "—"}</p>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 pl-4 space-y-2 text-base">
                  <div className="my-4">
                    <strong className="p-1 pr-10 bg-accent rounded-[8px] text-white uppercase">Mục tiêu nghề nghiệp</strong>
                    <div className="h-[2px] w-full bg-accent mt-1"></div>
                    <p>{hoSoChiTiet.mucTieu || "—"}</p>
                  </div>

                  <div className="my-4">
                    <strong className="p-1 pr-10 bg-accent rounded-[8px] text-white uppercase">Học vấn</strong>
                    <div className="h-[2px] w-full bg-accent mt-1"></div>
                    <p>{hoSoChiTiet.hocVan || "—"}</p>
                  </div>

                  {/* <div className="my-4">
                    <strong className="p-1 pr-10 bg-accent rounded-[8px] text-white uppercase">Năm kinh nghiệm</strong>
                    <div className="h-[2px] w-full bg-accent mt-1"></div>
                    <p>{hoSoChiTiet.namKinhNghiemID || "—"}</p>
                  </div> */}

                  <div className="my-4">
                    <strong className="p-1 pr-10 bg-accent rounded-[8px] text-white uppercase">Năm kinh nghiệm</strong>
                    <div className="h-[2px] w-full bg-accent mt-1"></div>
                    <p>{getName(kinhNghiemList, hoSoChiTiet.namKinhNghiemID)}</p>
                  </div>

                  <div className="my-4">
                    <strong className="p-1 pr-10 bg-accent rounded-[8px] text-white uppercase">Chức danh</strong>
                    <div className="h-[2px] w-full bg-accent mt-1"></div>
                    <p>{getName(chucDanhList, hoSoChiTiet.chucDanhID)}</p>
                  </div>

                  <div className="my-4">
                    <strong className="p-1 pr-10 bg-accent rounded-[8px] text-white uppercase">Loại hình làm việc</strong>
                    <div className="h-[2px] w-full bg-accent mt-1"></div>
                    <p>{getName(loaiHinhList, hoSoChiTiet.loaiHinhLamViecID)}</p>
                  </div>

                  <div className="my-4">
                    <strong className="p-1 pr-10 bg-accent rounded-[8px] text-white uppercase">Lĩnh vực</strong>
                    <div className="h-[2px] w-full bg-accent mt-1"></div>
                    <p>{getName(linhVucList, hoSoChiTiet.linhVucID)}</p>
                  </div>

                  <div className="my-4">
                    <strong className="p-1 pr-10 bg-accent rounded-[8px] text-white uppercase">Vị trí làm việc</strong>
                    <div className="h-[2px] w-full bg-accent mt-1"></div>
                    <p>{getName(viTriList, hoSoChiTiet.viTriLamViecID)}</p>
                  </div>


                  <div className="my-4">
                    <strong className="p-1 pr-10 bg-accent rounded-[8px] text-white uppercase">Chứng chỉ</strong>
                    <div className="h-[2px] w-full bg-accent mt-1"></div>
                    <p>{hoSoChiTiet.chucChi || "—"}</p>
                  </div>
                </div>
              </div>

              {/* Danh sách bằng cấp */}
              {bangCapList && bangCapList.length > 0 ? (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold mb-2">Bằng cấp / Chứng chỉ</h4>
                  <ul className="space-y-2">
                    {bangCapList.map((bc) => (
                      <li key={bc.id} className="border p-3 rounded flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                          <p className="font-medium">{bc.tenBangCap}</p>
                          <p className="text-sm text-gray-500">{bc.loai}</p>
                          <p className="text-xs text-gray-400">Ngày upload: {bc.ngayUpload}</p>
                        </div>
                        {bc.fileUrl && (
                          <div className="mt-2 md:mt-0">
                            <a
                              href={`${variables.PHOTO_URL}${bc.fileUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                            >
                              Xem
                            </a>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-500 mt-2 italic">Ứng viên chưa upload bằng cấp.</p>
              )}
            </div>
          ) : (
            <p className="text-gray-500 italic">Ứng viên chưa cung cấp hồ sơ.</p>
          )}
        </div>

      </div>
      <Footer />
{showInterviewModal && (
  <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
      <h3 className="text-xl font-bold mb-4">Gửi email mời phỏng vấn</h3>
      <textarea
        className="w-full border p-2 rounded mb-4"
        rows={6}
        placeholder="Nhập nội dung email..."
        value={emailContent}
        onChange={(e) => setEmailContent(e.target.value)}
      />

      <div className="flex justify-end gap-2">
        <button
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          onClick={() => {
            setShowInterviewModal(false);
            setEmailContent("");
          }}
        >
          Hủy
        </button>
        <button
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          onClick={async () => {
            if (!emailContent.trim()) {
              alert("Vui lòng nhập nội dung email!");
              return;
            }
            setUpdating(true);
            try {
              const token = Cookies.get("jwt_token");
              const res = await fetch(`${variables.API_URL}TInTuyenDung/cap-nhat-trang-thai/${utid}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  TrangThai: "Phỏng vấn",
                  noiDungEmail: emailContent,
                }),
              });
              const text = await res.text();
              let dataRes = null;
              try { dataRes = JSON.parse(text); } catch {}
              if (res.ok) {
                alert("✅ " + (dataRes?.Message || "Đã gửi email mời phỏng vấn!"));
                setData(prev => ({ ...prev, trangThai: "Phỏng vấn" }));
                setShowInterviewModal(false);
                setEmailContent("");
              } else {
                alert("❌ " + (dataRes?.message || text));
              }
            } catch (err) {
              console.error(err);
              alert("⚠️ Lỗi máy chủ hoặc kết nối!");
            } finally {
              setUpdating(false);
            }
          }}
        >
          Gửi
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
}

export default AppliedDetail;
