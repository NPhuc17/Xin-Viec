// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { variables } from '../../variables';

// function ProfileManage() {
//   const navigate = useNavigate();
//   const [resumes, setResumes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [modalMsg, setModalMsg] = useState('');
//   const [modalType, setModalType] = useState('info');
//   const [showForm, setShowForm] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [form, setForm] = useState({
//     hsName: '',
//     file: null,
//   });

//   useEffect(() => {
//     const tkId = localStorage.getItem('tkId');
//     const role = localStorage.getItem('role');
//     if (!tkId || role !== 'UngVien') {
//       setModalMsg('Bạn cần đăng nhập với tài khoản ứng viên để truy cập trang này.');
//       setModalType('error');
//       setShowModal(true);
//       setTimeout(() => navigate('/login'), 2000);
//     } else {
//       loadResumes();
//     }
//   }, [navigate]);

//   const loadResumes = async () => {
//     try {
//       const res = await fetch(variables.API_URL + 'HoSo/list', {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setResumes(data.data || []);
//       } else {
//         console.error('Lỗi tải hồ sơ:', data.message);
//       }
//     } catch (err) {
//       console.error('Lỗi kết nối:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'file') {
//       setForm({ ...form, file: files?.[0] || null });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.hsName.trim()) {
//       setModalMsg('Vui lòng nhập tên hồ sơ.');
//       setModalType('error');
//       setShowModal(true);
//       return;
//     }

//     if (!editingId && !form.file) {
//       setModalMsg('Vui lòng chọn file để upload.');
//       setModalType('error');
//       setShowModal(true);
//       return;
//     }

//     const formData = new FormData();
//     formData.append('hsName', form.hsName);
//     if (form.file) {
//       formData.append('file', form.file);
//     }

//     try {
//       const url = editingId
//         ? variables.API_URL + `HoSo/update/${editingId}`
//         : variables.API_URL + 'HoSo/create';
//       const method = editingId ? 'PUT' : 'POST';

//       const res = await fetch(url, {
//         method,
//         body: formData,
//         credentials: 'include',
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setModalMsg(data.message || (editingId ? 'Cập nhật hồ sơ thành công!' : 'Tạo hồ sơ thành công!'));
//         setModalType('success');
//         setShowModal(true);
//         setForm({ hsName: '', file: null });
//         setShowForm(false);
//         setEditingId(null);
//         setTimeout(() => loadResumes(), 1500);
//       } else {
//         setModalMsg(data.message || 'Đã có lỗi xảy ra.');
//         setModalType('error');
//         setShowModal(true);
//       }
//     } catch (err) {
//       console.error('Lỗi:', err);
//       setModalMsg('Lỗi kết nối máy chủ!');
//       setModalType('error');
//       setShowModal(true);
//     }
//   };

//   const handleEdit = (resume) => {
//     setEditingId(resume.hsid);
//     setForm({ hsName: resume.hsName, file: null });
//     setShowForm(true);
//   };

//   const handleDelete = async (hsid) => {
//     if (!window.confirm('Bạn chắc chắn muốn xóa hồ sơ này?')) return;

//     try {
//       const res = await fetch(variables.API_URL + `HoSo/delete/${hsid}`, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setModalMsg('Xóa hồ sơ thành công!');
//         setModalType('success');
//         setShowModal(true);
//         setTimeout(() => loadResumes(), 1500);
//       } else {
//         setModalMsg(data.message || 'Đã có lỗi xảy ra.');
//         setModalType('error');
//         setShowModal(true);
//       }
//     } catch (err) {
//       console.error('Lỗi:', err);
//       setModalMsg('Lỗi kết nối máy chủ!');
//       setModalType('error');
//       setShowModal(true);
//     }
//   };

//   const handleCancel = () => {
//     setShowForm(false);
//     setEditingId(null);
//     setForm({ hsName: '', file: null });
//   };

//   if (loading) {
//     return <p className="text-center mt-6">Dắng tải dữ liệu...</p>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Quản lý Hồ sơ</h1>

//       {!showForm ? (
//         <>
//           <button
//             onClick={() => setShowForm(true)}
//             className="mb-6 bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition"
//           >
//             + Tạo Hồ sơ Mới
//           </button>

//           {resumes.length === 0 ? (
//             <div className="bg-gray-100 p-8 rounded text-center">
//               <p className="text-gray-600 mb-4">Bạn chưa có hồ sơ nào.</p>
//               <button
//                 onClick={() => setShowForm(true)}
//                 className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
//               >
//                 Tạo hồ sơ đầu tiên
//               </button>
//             </div>
//           ) : (
//             <div className="grid gap-4">
//               {resumes.map((resume) => (
//                 <div
//                   key={resume.hsid}
//                   className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition"
//                 >
//                   <div className="flex justify-between items-start">
//                     <div className="flex-1">
//                       <h3 className="text-lg font-semibold text-primary mb-2">{resume.hsName}</h3>
//                       <p className="text-sm text-gray-600 mb-2">
//                         File: <span className="font-mono text-xs">{resume.viTriFile?.split('\\').pop() || 'N/A'}</span>
//                       </p>
//                     </div>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => handleEdit(resume)}
//                         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-sm"
//                       >
//                         Sửa
//                       </button>
//                       <button
//                         onClick={() => handleDelete(resume.hsid)}
//                         className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition text-sm"
//                       >
//                         Xóa
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </>
//       ) : (
//         <div className="bg-white border border-gray-200 rounded-lg p-6 shadow">
//           <h2 className="text-2xl font-bold mb-4">
//             {editingId ? 'Sửa Hồ sơ' : 'Tạo Hồ sơ Mới'}
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block font-medium mb-2">Tên Hồ sơ</label>
//               <input
//                 type="text"
//                 name="hsName"
//                 value={form.hsName}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
//                 placeholder="VD: Hồ sơ đặc biệt"
//                 required
//               />
//             </div>

//             {!editingId && (
//               <div>
//                 <label className="block font-medium mb-2">Chọn File</label>
//                 <input
//                   type="file"
//                   name="file"
//                   onChange={handleChange}
//                   accept=".pdf,.doc,.docx"
//                   className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
//                   required
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Chấp nhẫn: .pdf, .doc, .docx</p>
//               </div>
//             )}

//             {editingId && (
//               <div>
//                 <label className="block font-medium mb-2">Cập nhật File (Tùy chọn)</label>
//                 <input
//                   type="file"
//                   name="file"
//                   onChange={handleChange}
//                   accept=".pdf,.doc,.docx"
//                   className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Nếu không chọn file, hồ sơ cũ sẽ được giữ lại</p>
//               </div>
//             )}

//             <div className="flex gap-3 pt-4">
//               <button
//                 type="submit"
//                 className="flex-1 bg-primary text-white py-2 rounded hover:bg-primary/90 transition font-medium"
//               >
//                 {editingId ? 'Cập nhật' : 'Tạo'}
//               </button>
//               <button
//                 type="button"
//                 onClick={handleCancel}
//                 className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition font-medium"
//               >
//                 Hủy
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
//           <div className="bg-white p-6 rounded shadow-lg max-w-sm">
//             <p
//               className={`text-lg mb-4 ${
//                 modalType === 'error'
//                   ? 'text-red-600'
//                   : modalType === 'success'
//                   ? 'text-green-600'
//                   : 'text-gray-700'
//               }`}
//             >
//               {modalMsg}
//             </p>
//             <button
//               onClick={() => setShowModal(false)}
//               className="w-full bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
//             >
//               Đóng
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProfileManage;





// import React, { useState, useEffect } from "react";
// import Cookies from "js-cookie";
// import { uploadHoSo } from "../../utils/api";
// import { variables } from "../../variables";
// import { useNavigate } from "react-router-dom";
// import { Document, Page, pdfjs } from "react-pdf";
// import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

// pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

// function ProfileManage() {
//   const [form, setForm] = useState({ hsName: "", file: null });
//   const [resumes, setResumes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedPdf, setSelectedPdf] = useState(null); // 📄 Lưu file đang xem
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = Cookies.get("jwt_token");
//     const role = localStorage.getItem("role");

//     if (!token || role !== "UngVien") {
//       alert("Bạn cần đăng nhập bằng tài khoản Ứng Viên.");
//       navigate("/login");
//       return;
//     }

//     loadResumes();
//   }, []);

//   async function loadResumes() {
//     setLoading(true);
//     try {
//       const res = await fetch(`${variables.API_URL}HoSo/list`, {
//         headers: { Authorization: `Bearer ${Cookies.get("jwt_token")}` },
//       });
//       const data = await res.json();
//       if (res.ok) setResumes(data.data || []);
//       else console.error("Không tải được hồ sơ:", data);
//     } finally {
//       setLoading(false);
//     }
//   }

//   function handleChange(e) {
//     const { name, value, files } = e.target;
//     if (name === "file") setForm({ ...form, file: files[0] });
//     else setForm({ ...form, [name]: value });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!form.hsName.trim() || !form.file) {
//       alert("Vui lòng nhập tên hồ sơ và chọn file!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("hsName", form.hsName);
//     formData.append("file", form.file);

//     setLoading(true);
//     const { ok, data } = await uploadHoSo(formData);
//     setLoading(false);

//     if (ok) {
//       alert("Tạo hồ sơ thành công!");
//       setForm({ hsName: "", file: null });
//       loadResumes();
//     } else {
//       alert(data.message || "Có lỗi xảy ra!");
//     }
//   }

//   async function handleDelete(id) {
//     if (!window.confirm("Bạn có chắc muốn xóa hồ sơ này?")) return;
//     const res = await fetch(`${variables.API_URL}HoSo/delete/${id}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${Cookies.get("jwt_token")}` },
//     });
//     const data = await res.json();
//     if (res.ok) {
//       alert("Đã xóa hồ sơ!");
//       loadResumes();
//       if (selectedPdf?.id === id) setSelectedPdf(null);
//     } else {
//       alert(data.message || "Không thể xóa!");
//     }
//   }


//   function PDFViewerWithAuth({ pdfUrl }) {
//   const [pdfBlob, setPdfBlob] = useState(null);

//   useEffect(() => {
//     async function fetchPdf() {
//       try {
//         const res = await fetch(pdfUrl, {
//           headers: {
//             Authorization: `Bearer ${Cookies.get("jwt_token")}`,
//           },
//         });
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         const blob = await res.blob();
//         setPdfBlob(URL.createObjectURL(blob));
//       } catch (err) {
//         console.error("Lỗi tải PDF:", err);
//       }
//     }
//     fetchPdf();
//   }, [pdfUrl]);

//   if (!pdfBlob) return <p>Đang tải PDF...</p>;

//   return (
//     <Document file={pdfBlob} onLoadError={console.error}>
//       <Page pageNumber={1} width={600} />
//     </Document>
//   );
// }


//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Quản lý Hồ sơ Ứng Viên</h1>

//       {/* Form upload */}
//       <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
//         <div className="mb-4">
//           <label className="block mb-2 font-semibold">Tên hồ sơ</label>
//           <input
//             type="text"
//             name="hsName"
//             value={form.hsName}
//             onChange={handleChange}
//             className="border w-full px-3 py-2 rounded"
//             placeholder="VD: Hồ sơ xin việc 2025"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2 font-semibold">
//             File hồ sơ (.pdf, .doc, .docx)
//           </label>
//           <input
//             type="file"
//             name="file"
//             accept=".pdf,.doc,.docx"
//             onChange={handleChange}
//             className="border w-full px-3 py-2 rounded"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
//           disabled={loading}
//         >
//           {loading ? "Đang gửi..." : "Tải lên"}
//         </button>
//       </form>

//       {/* Danh sách hồ sơ */}
//       <h2 className="text-xl font-semibold mb-2">Danh sách hồ sơ</h2>
//       {loading ? (
//         <p>Đang tải...</p>
//       ) : resumes.length === 0 ? (
//         <p>Chưa có hồ sơ nào.</p>
//       ) : (
//         resumes.map((r) => (
//           <div
//             key={r.hsid}
//             className="border p-3 rounded mb-3 flex justify-between items-center"
//           >
//             <div>
//               <strong
//                 onClick={() =>
//                   setSelectedPdf({
//                     id: r.hsid,
//                     url: `${variables.API_URL}HoSo/view/${r.hsid}`,
//                   })
//                 }
//                 className="cursor-pointer text-blue-600 hover:underline"
//               >
//                 {r.hsName}
//               </strong>
//               <p className="text-sm text-gray-600">
//                 {r.viTriFile?.split("\\").pop() || "Không có file"}
//               </p>
//             </div>
//             <button
//               onClick={() => handleDelete(r.hsid)}
//               className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//             >
//               Xóa
//             </button>
//           </div>
//         ))
//       )}

//       {/* Hiển thị PDF nếu chọn */}
//       {selectedPdf && (
//   <div className="mt-6 bg-gray-50 border p-4 rounded shadow">
//     <h3 className="text-lg font-semibold mb-2">
//       Xem hồ sơ: {selectedPdf.url.split("/").pop()}
//     </h3>

//     {/* Fetch PDF thủ công có kèm JWT */}
//     <PDFViewerWithAuth pdfUrl={selectedPdf.url} />

//     <button
//       onClick={() => setSelectedPdf(null)}
//       className="mt-3 bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700"
//     >
//       Đóng
//     </button>
//   </div>
// )}
//     </div>
//   );
// }

// export default ProfileManage;








// import React, { useState, useEffect, useRef } from "react"; 
// import Cookies from "js-cookie"; import { uploadHoSo } from "../../utils/api"; 
// import { variables } from "../../variables"; 
// import { useNavigate } from "react-router-dom"; 
// import { Document, Page, pdfjs } from "react-pdf"; 
// import Navbar from "../../components/navbar"; 
// import Footer from "../../components/footer"; 
// // ⚡ Sử dụng worker PDF.js ổn định từ CDN 

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js', 
//   import.meta.url
// ).toString();


// function ProfileManage() {
//   const [form, setForm] = useState({ hsName: "", file: null });
//   const [resumes, setResumes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedPDF, setSelectedPDF] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = Cookies.get("jwt_token");
//     const role = localStorage.getItem("role");

//     if (!token || role !== "UngVien") {
//       alert("Bạn cần đăng nhập bằng tài khoản Ứng Viên.");
//       navigate("/login");
//       return;
//     }

//     loadResumes();
//   }, []);

//   async function loadResumes() {
//     setLoading(true);
//     try {
//       const res = await fetch(`${variables.API_URL}HoSo/list`, {
//         headers: { Authorization: `Bearer ${Cookies.get("jwt_token")}` },
//       });
//       const data = await res.json();
//       if (res.ok) setResumes(data.data || []);
//     } finally {
//       setLoading(false);
//     }
//   }

//   /** ----------------------------- PDF Viewer ------------------------------ */
//   function PDFViewer({ pdfUrl }) {
//     const [pdfBlob, setPdfBlob] = useState(null);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//       async function fetchPdf() {
//         try {
//           const res = await fetch(pdfUrl, {
//             headers: { Authorization: `Bearer ${Cookies.get("jwt_token")}` },
//           });
//           if (!res.ok) throw new Error(`HTTP ${res.status}`);
//           const blob = await res.blob();
//           setPdfBlob(URL.createObjectURL(blob));
//         } catch (err) {
//           setError(err);
//         }
//       }
//       fetchPdf();

//       return () => pdfBlob && URL.revokeObjectURL(pdfBlob);
//     }, [pdfUrl]);

//     if (error) return <p className="text-red-600">Lỗi tải PDF: {error.message}</p>;
//     if (!pdfBlob) return <p>Đang tải PDF...</p>;

//     return (
//       <Document file={pdfBlob}>
//         <Page pageNumber={1} width={600} />
//       </Document>
//     );
//   }

//   /** ----------------------------- Upload file ------------------------------ */
//   function handleChange(e) {
//     const { name, value, files } = e.target;
//     if (name === "file") setForm({ ...form, file: files[0] });
//     else setForm({ ...form, [name]: value });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!form.hsName.trim() || !form.file) return alert("Vui lòng nhập tên hồ sơ và chọn file!");

//     const fd = new FormData();
//     fd.append("hsName", form.hsName);
//     fd.append("file", form.file);

//     setLoading(true);
//     const { ok } = await uploadHoSo(fd);
//     setLoading(false);

//     if (ok) {
//       alert("Tạo hồ sơ thành công!");
//       setForm({ hsName: "", file: null });
//       loadResumes();
//     }
//   }

//   /** ----------------------------- Delete HoSo ------------------------------ */
//   async function handleDelete(id) {
//     if (!window.confirm("Bạn có chắc muốn xóa hồ sơ này?")) return;

//     const res = await fetch(`${variables.API_URL}HoSo/delete/${id}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${Cookies.get("jwt_token")}` },
//     });

//     const data = await res.json();
//     if (res.ok) {
//       alert("Đã xóa hồ sơ!");
//       setSelectedPDF(null);
//       loadResumes();
//     } else alert(data.message || "Không thể xóa!");

//   }


//   /** ----------------------------- Render ------------------------------ */
//   return (
//     <>
//       <Navbar />

//       <div className="max-w-3xl mx-auto p-6">
//         <h1 className="text-2xl font-bold mb-4">Quản lý Hồ sơ Ứng Viên</h1>

//         {/* Upload form */}
//         <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
//           <div className="mb-4">
//             <label className="block mb-2 font-semibold">Tên hồ sơ</label>
//             <input
//               type="text"
//               name="hsName"
//               value={form.hsName}
//               onChange={handleChange}
//               className="border w-full px-3 py-2 rounded"
//               placeholder="VD: Hồ sơ xin việc 2025"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 font-semibold">File hồ sơ (.pdf, .doc, .docx)</label>
//             <input
//               type="file"
//               name="file"
//               accept=".pdf,.doc,.docx"
//               onChange={handleChange}
//               className="border w-full px-3 py-2 rounded"
//             />
//           </div>

//           <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700" disabled={loading}>
//             {loading ? "Đang gửi..." : "Tải lên"}
//           </button>

//           <button
//             type="button"
//             onClick={() => navigate("/createresume")}
//             className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 ml-5"
//           >
//             Tạo hồ sơ mẫu
//           </button>
//         </form>

//         {/* Danh sách hồ sơ */}
//         <h2 className="text-xl font-semibold mb-2">Danh sách hồ sơ</h2>

//         {loading ? (
//           <p>Đang tải...</p>
//         ) : resumes.length === 0 ? (
//           <p>Chưa có hồ sơ nào.</p>
//         ) : (
//           resumes.map((r) => (
//             <div key={r.hsid} className="border p-3 rounded mb-3 flex justify-between items-center">
//               <div>
//                 <strong
//                   onClick={() => {
//                     if (r.viTriFile) {
//                       // → PDF: hiển thị tại chỗ
//                       setSelectedPDF(`${variables.API_URL}HoSo/view/${r.hsid}`);
//                     } else {
//                       // → CV tạo form: chuyển trang
//                       navigate(`/viewresume/${r.hsid}`);
//                     }
//                   }}
//                   className="cursor-pointer text-blue-600 hover:underline"
//                 >
//                   {r.hsName}
//                 </strong>

//                 <p className="text-sm text-gray-600">
//                   {r.viTriFile?.split("\\").pop() || "Hồ sơ mẫu"}
//                 </p>
//               </div>

//               <button
//                 onClick={() => handleDelete(r.hsid)}
//                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//               >
//                 Xóa
//               </button>
//             </div>
//           ))
//         )}

//         {/* PDF Viewer */}
//         {selectedPDF && (
//           <div className="mt-6 bg-gray-50 border p-4 rounded shadow">
//             <PDFViewer pdfUrl={selectedPDF} />

//             <button
//               onClick={() => setSelectedPDF(null)}
//               className="mt-3 bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700"
//             >
//               Đóng
//             </button>
//           </div>
//         )}
//       </div>

//       <Footer />
//     </>
//   );
// }

// export default ProfileManage;


// import React, { useState, useEffect, useRef } from "react";
// import Cookies from "js-cookie";
// import { uploadHoSo } from "../../utils/api";
// import { variables } from "../../variables";
// import { useNavigate } from "react-router-dom";
// import { Document, Page, pdfjs } from "react-pdf";
// import Navbar from "../../components/navbar";
// import Footer from "../../components/footer";

// // ⚡ Sử dụng worker PDF.js ổn định từ CDN
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// function ProfileManage() {
//   const [form, setForm] = useState({ hsName: "", file: null });
//   const [resumes, setResumes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedPdf, setSelectedPdf] = useState(null); // 📄 File đang xem
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = Cookies.get("jwt_token");
//     const role = localStorage.getItem("role");

//     if (!token || role !== "UngVien") {
//       alert("Bạn cần đăng nhập bằng tài khoản Ứng Viên.");
//       navigate("/login");
//       return;
//     }

//     loadResumes();
//   }, []);

//   async function loadResumes() {
//     setLoading(true);
//     try {
//       const res = await fetch(`${variables.API_URL}HoSo/list`, {
//         headers: { Authorization: `Bearer ${Cookies.get("jwt_token")}` },
//       });
//       const data = await res.json();
//       if (res.ok) setResumes(data.data || []);
//       else console.error("Không tải được hồ sơ:", data);
//     } finally {
//       setLoading(false);
//     }
//   }

//   function handleChange(e) {
//     const { name, value, files } = e.target;
//     if (name === "file") setForm({ ...form, file: files[0] });
//     else setForm({ ...form, [name]: value });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!form.hsName.trim() || !form.file) {
//       alert("Vui lòng nhập tên hồ sơ và chọn file!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("hsName", form.hsName);
//     formData.append("file", form.file);

//     setLoading(true);
//     const { ok, data } = await uploadHoSo(formData);
//     setLoading(false);

//     if (ok) {
//       alert("Tạo hồ sơ thành công!");
//       setForm({ hsName: "", file: null });
//       loadResumes();
//     } else {
//       alert(data.message || "Có lỗi xảy ra!");
//     }
//   }

//   async function handleDelete(id) {
//     if (!window.confirm("Bạn có chắc muốn xóa hồ sơ này?")) return;
//     const res = await fetch(`${variables.API_URL}HoSo/delete/${id}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${Cookies.get("jwt_token")}` },
//     });
//     const data = await res.json();
//     if (res.ok) {
//       alert("Đã xóa hồ sơ!");
//       loadResumes();
//       if (selectedPdf?.id === id) setSelectedPdf(null);
//     } else {
//       alert(data.message || "Không thể xóa!");
//     }
//   }

//   // ✅ Component xem PDF có ErrorBoundary & cleanup fetch
//   function PDFViewerWithAuth({ pdfUrl }) {
//     const [pdfBlob, setPdfBlob] = useState(null);
//     const [error, setError] = useState(null);
//     const abortControllerRef = useRef(null);

//     useEffect(() => {
//       abortControllerRef.current = new AbortController();
//       const signal = abortControllerRef.current.signal;

//       async function fetchPdf() {
//         try {
//           const res = await fetch(pdfUrl, {
//             headers: {
//               Authorization: `Bearer ${Cookies.get("jwt_token")}`,
//             },
//             signal,
//           });
//           if (!res.ok) throw new Error(`HTTP ${res.status}`);
//           const blob = await res.blob();
//           setPdfBlob(URL.createObjectURL(blob));
//         } catch (err) {
//           if (err.name !== "AbortError") {
//             console.error("Lỗi tải PDF:", err);
//             setError(err);
//           }
//         }
//       }
//       fetchPdf();

//       // Cleanup khi component unmount
//       return () => {
//         abortControllerRef.current?.abort();
//         if (pdfBlob) URL.revokeObjectURL(pdfBlob);
//       };
//     }, [pdfUrl]);

//     if (error) return <p className="text-red-600">Lỗi tải PDF: {error.message}</p>;
//     if (!pdfBlob) return <p>Đang tải PDF...</p>;

//     return (
//       <Document
//         file={pdfBlob}
//         onLoadError={(err) => {
//           console.error("PDF Load Error:", err);
//           setError(err);
//         }}
//         loading={<p>Đang render PDF...</p>}
//       >
//         <Page pageNumber={1} width={600} />
//       </Document>
//     );
//   }

//   return (
//     <>

//     <Navbar/>
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Quản lý Hồ sơ Ứng Viên</h1>

//       {/* Form upload */}
//       <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
//         <div className="mb-4">
//           <label className="block mb-2 font-semibold">Tên hồ sơ</label>
//           <input
//             type="text"
//             name="hsName"
//             value={form.hsName}
//             onChange={handleChange}
//             className="border w-full px-3 py-2 rounded"
//             placeholder="VD: Hồ sơ xin việc 2025"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2 font-semibold">
//             File hồ sơ (.pdf, .doc, .docx)
//           </label>
//           <input
//             type="file"
//             name="file"
//             accept=".pdf,.doc,.docx"
//             onChange={handleChange}
//             className="border w-full px-3 py-2 rounded"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
//           disabled={loading}
//         >
//           {loading ? "Đang gửi..." : "Tải lên"}
//         </button>

//          <button
//   type="button"
//   onClick={() => navigate("/createresume")}
//   className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 ml-5"
// >
//   Tạo hồ sơ mẫu
// </button>
//       </form>

//       {/* Danh sách hồ sơ */}
//       <h2 className="text-xl font-semibold mb-2">Danh sách hồ sơ</h2>
//       {loading ? (
//         <p>Đang tải...</p>
//       ) : resumes.length === 0 ? (
//         <p>Chưa có hồ sơ nào.</p>
//       ) : (
//         resumes.map((r) => (
//           <div
//             key={r.hsid}
//             className="border p-3 rounded mb-3 flex justify-between items-center"
//           >
//             <div>
//               <strong
//                 onClick={() =>
//                   setSelectedPdf({
//                     id: r.hsid,
//                     url: `${variables.API_URL}HoSo/view/${r.hsid}`,
//                   })
//                 }
//                 className="cursor-pointer text-blue-600 hover:underline"
//               >
//                 {r.hsName}
//               </strong>
//               <p className="text-sm text-gray-600">
//                 {r.viTriFile?.split("\\").pop() || "Không có file"}
//               </p>
//             </div>
//             <button
//               onClick={() => handleDelete(r.hsid)}
//               className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//             >
//               Xóa
//             </button>
//           </div>
//         ))
//       )}

//       {/* Hiển thị PDF nếu chọn */}
//       {selectedPdf && (
//         <div className="mt-6 bg-gray-50 border p-4 rounded shadow">
//           <h3 className="text-lg font-semibold mb-2">
//             Xem hồ sơ
//           </h3>

//           <PDFViewerWithAuth pdfUrl={selectedPdf.url} />

//           <button
//             onClick={() => setSelectedPdf(null)}
//             className="mt-3 bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700"
//           >
//             Đóng
//           </button>
//         </div>
//       )}
//     </div>

//     <Footer />
//     </>
//   );
// }

// export default ProfileManage;


import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { uploadHoSo } from "../../utils/api";
import { variables } from "../../variables";
import { useNavigate } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

// ⚡ Sử dụng worker PDF.js ổn định từ CDN
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ProfileManage() {
  const [form, setForm] = useState({ hsName: "", file: null });
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null); // 📄 File đang xem
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("jwt_token");
    const role = localStorage.getItem("role");

    if (!token || role !== "UngVien") {
      alert("Bạn cần đăng nhập bằng tài khoản Ứng Viên.");
      navigate("/login");
      return;
    }

    loadResumes();
  }, []);

  async function loadResumes() {
    setLoading(true);
    try {
      const res = await fetch(`${variables.API_URL}HoSo/list`, {
        headers: { Authorization: `Bearer ${Cookies.get("jwt_token")}` },
      });
      const data = await res.json();
      if (res.ok) setResumes(data.data || []);
      else console.error("Không tải được hồ sơ:", data);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === "file") setForm({ ...form, file: files[0] });
    else setForm({ ...form, [name]: value });
  }

async function handleSubmit(e) {
  e.preventDefault();
  if (!form.hsName.trim() || !form.file) {
    alert("Vui lòng nhập tên hồ sơ và chọn file!");
    return;
  }

  const formData = new FormData();
  formData.append("hsName", form.hsName);
  formData.append("file", form.file);

  setLoading(true);
  const { ok, data } = await uploadHoSo(formData);
  setLoading(false);

  if (ok) {
    alert("Tạo hồ sơ thành công!");

    const hoSoId = data?.hsId;
    if (!hoSoId) {
      alert("Không tìm thấy ID hồ sơ trả về!");
      return;
    }

    // 👉 Chuyển đến AddCertification kèm ID
    navigate("/add-certification", {
      state: { hoSoId },
    });
  } else {
    alert(data.message || "Có lỗi xảy ra!");
  }
}


  async function handleDelete(hoso) {
    if (!window.confirm("Bạn có chắc muốn xóa hồ sơ này?")) return;

    const id = hoso.hsid;
    const isMau = !hoso.viTriFile; // nếu không có viTriFile => hồ sơ mẫu

    const url = isMau
      ? `${variables.API_URL}NoiDungHoSo/${id}`
      : `${variables.API_URL}HoSo/delete/${id}`;

    const res = await fetch(url, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${Cookies.get("jwt_token")}` },
    });

    const data = await res.json();
    if (res.ok) {
      alert("Đã xóa hồ sơ!");
      loadResumes();
      if (selectedPdf?.id === id) setSelectedPdf(null);
    } else {
      alert(data.message || "Không thể xóa!");
    }
  }


  function PDFViewerWithAuth({ pdfUrl }) {
    const [pdfBlob, setPdfBlob] = useState(null);
    const [error, setError] = useState(null);
    const abortControllerRef = useRef(null);

    useEffect(() => {
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      async function fetchPdf() {
        try {
          const res = await fetch(pdfUrl, {
            headers: { Authorization: `Bearer ${Cookies.get("jwt_token")}` },
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
        abortControllerRef.current?.abort();
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

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Quản lý Hồ sơ Ứng Viên</h1>

        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Tên hồ sơ</label>
            <input
              type="text"
              name="hsName"
              value={form.hsName}
              onChange={handleChange}
              className="border w-full px-3 py-2 rounded"
              placeholder="VD: Hồ sơ xin việc 2025"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">
              File hồ sơ (.pdf, .doc, .docx)
            </label>
            <input
              type="file"
              name="file"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              className="border w-full px-3 py-2 rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Đang gửi..." : "Tải lên"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/createresume")}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 ml-5"
          >
            Tạo hồ sơ mẫu
          </button>
        </form>

        <h2 className="text-xl font-semibold mb-2">Danh sách hồ sơ</h2>
        {loading ? (
          <p>Đang tải...</p>
        ) : resumes.length === 0 ? (
          <p>Chưa có hồ sơ nào.</p>
        ) : (
          resumes.map((r) => (
            <div
              key={r.hsid}
              className="border p-3 rounded mb-3 flex justify-between items-center"
            >
              <div>
                <strong
                  onClick={() => {
                    if (r.viTriFile) {
                      setSelectedPdf({
                        id: r.hsid,
                        url: `${variables.API_URL}HoSo/view/${r.hsid}`,
                      });
                    } else {
                      navigate(`/viewresume/${r.hsid}`);
                    }
                  }}
                  className="cursor-pointer text-blue-600 hover:underline"
                >
                  {r.hsName}
                </strong>
                <p className="text-sm text-gray-600">
                  {r.viTriFile?.split("\\").pop() || "Hồ sơ mẫu"}
                </p>
              </div>
              <button
                onClick={() => handleDelete(r)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Xóa
              </button>
            </div>
          ))
        )}

        {selectedPdf && (
          <div className="mt-6 bg-gray-50 border p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Xem hồ sơ</h3>
            <PDFViewerWithAuth pdfUrl={selectedPdf.url} />
            <button
              onClick={() => setSelectedPdf(null)}
              className="mt-3 bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700"
            >
              Đóng
            </button>
            <button
  className="bg-blue-600 text-white px-4 py-1 rounded ml-3"
  onClick={() => {
    if (!selectedPdf?.id) {
      alert("Không tìm thấy ID hồ sơ!");
      return;
    }
    navigate(`/view-upload-certification/${selectedPdf.id}`);
  }}
>
  Xem bằng cấp
</button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ProfileManage;
