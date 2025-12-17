// import React, { useState, useEffect } from "react";
// import { variables } from "../../variables";
// import EmployerNavbar from "../../components/employernavbar";
// import Footer from "../../components/footer";

// function Company() {
//   const API_URL = variables.API_URL + "CongTy/";
//   const [companies, setCompanies] = useState([]);
//   const [form, setForm] = useState({
//     ctName: "",
//     diaChi: "",
//     moHinh: "",
//     maThue: "",
//     quocGia: "",
//     soNhanVien: "",
//     nguoiLienHe: "",
//     sdtLienHe: "",
//     sdtCongTy: "",
//     mieuTa: "",
//     logo: "",
//   });
//   const [editId, setEditId] = useState(null);

//   // 🔹 Lấy thông tin NTD từ localStorage
//   const storedRole = localStorage.getItem("role");
//   const storedCtID = parseInt(localStorage.getItem("ctID"));

//   // 🔹 Load danh sách công ty
//   const loadData = async () => {
//     try {
//       const res = await fetch(API_URL + "list");
//       const data = await res.json();
//       if (res.ok) {
//         setCompanies(data.data || []);
//       } else {
//         alert(data.message || "Không thể tải danh sách công ty!");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Lỗi kết nối server!");
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   // 🔹 Upload logo
//   const handleUploadLogo = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await fetch(API_URL + "upload-logo", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();
//       console.log("Response upload:", data); // xem backend trả gì

//       if (res.ok && data.url) {   // ✅ chữ thường 'url'
//         setForm(prev => ({ ...prev, logo: data.url }));
//         console.log("Logo mới:", data.url); // ✅ sẽ hiển thị đúng
//         alert("Upload logo thành công!");
//       } else {
//         alert(data.Message || "Upload thất bại!");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Lỗi kết nối server!");
//     }
//   };




//   // 🔹 Thêm / Cập nhật công ty
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.ctName.trim()) {
//       alert("Tên công ty không được để trống!");
//       return;
//     }

//     const method = editId ? "PUT" : "POST";
//     const url = editId ? API_URL + `update/${editId}` : API_URL + "add";

//     try {
//       const res = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           CtName: form.ctName,
//           DiaChi: form.diaChi,
//           MoHinh: form.moHinh,
//           MaThue: form.maThue,
//           QuocGia: form.quocGia,
//           SoNhanVien: form.soNhanVien ? parseInt(form.soNhanVien) : null,
//           NguoiLienHe: form.nguoiLienHe,
//           SdtLienHe: form.sdtLienHe,
//           SdtCongTy: form.sdtCongTy,
//           MieuTa: form.mieuTa,
//           Logo: form.logo,
//         }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert(data.Message || "Thành công!");
//         setForm({
//           ctName: "",
//           diaChi: "",
//           moHinh: "",
//           maThue: "",
//           quocGia: "",
//           soNhanVien: "",
//           nguoiLienHe: "",
//           sdtLienHe: "",
//           sdtCongTy: "",
//           mieuTa: "",
//           logo: "",
//         });
//         setEditId(null);
//         loadData();
//       } else {
//         alert(data.Message || "Thao tác thất bại!");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Lỗi kết nối server!");
//     }
//   };

//   // 🔹 Chọn công ty để chỉnh sửa
//   const handleEdit = (ct) => {
//     if (storedRole !== "NhaTuyenDung" || storedCtID !== ct.ctid) {
//       alert("Bạn không có quyền sửa công ty này!");
//       return;
//     }
//     setForm({
//       ctName: ct.ctName || "",
//       diaChi: ct.diaChi || "",
//       moHinh: ct.moHinh || "",
//       maThue: ct.maThue || "",
//       quocGia: ct.quocGia || "",
//       soNhanVien: ct.soNhanVien || "",
//       nguoiLienHe: ct.nguoiLienHe || "",
//       sdtLienHe: ct.sdtLienHe || "",
//       sdtCongTy: ct.sdtCongTy || "",
//       mieuTa: ct.mieuTa || "",
//       logo: ct.logo || "",
//     });
//     setEditId(ct.ctid);
//   };

//   // 🔹 Xóa công ty
//   const handleDelete = async (id) => {
//     if (storedRole !== "NhaTuyenDung" || storedCtID !== id) {
//       alert("Bạn không có quyền xóa công ty này!");
//       return;
//     }

//     if (!window.confirm("Bạn có chắc muốn xóa công ty này không?")) return;

//     try {
//       const res = await fetch(API_URL + `delete/${id}`, { method: "DELETE" });
//       const data = await res.json();
//       if (res.ok) {
//         alert(data.Message || "Xóa thành công!");
//         loadData();
//       } else {
//         alert(data.Message || "Xóa thất bại!");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Lỗi kết nối server!");
//     }
//   };

//   return (
//     <>
//       <EmployerNavbar />
//       <div className="p-6">
//         <h2 className="text-2xl font-bold mb-4">
//           {editId ? "Cập nhật công ty" : "Thêm công ty mới"}
//         </h2>

//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-2 gap-4 bg-white shadow-md p-4 rounded-lg"
//         >
//           <input
//             type="text"
//             placeholder="Tên công ty *"
//             className="border p-2 rounded"
//             value={form.ctName}
//             onChange={(e) => setForm({ ...form, ctName: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Địa chỉ"
//             className="border p-2 rounded"
//             value={form.diaChi}
//             onChange={(e) => setForm({ ...form, diaChi: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Mô hình"
//             className="border p-2 rounded"
//             value={form.moHinh}
//             onChange={(e) => setForm({ ...form, moHinh: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Mã thuế"
//             className="border p-2 rounded"
//             value={form.maThue}
//             onChange={(e) => setForm({ ...form, maThue: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Quốc gia"
//             className="border p-2 rounded"
//             value={form.quocGia}
//             onChange={(e) => setForm({ ...form, quocGia: e.target.value })}
//           />
//           <input
//             type="number"
//             placeholder="Số nhân viên"
//             className="border p-2 rounded"
//             value={form.soNhanVien}
//             onChange={(e) => setForm({ ...form, soNhanVien: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Người liên hệ"
//             className="border p-2 rounded"
//             value={form.nguoiLienHe}
//             onChange={(e) => setForm({ ...form, nguoiLienHe: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="SĐT liên hệ"
//             className="border p-2 rounded"
//             value={form.sdtLienHe}
//             onChange={(e) => setForm({ ...form, sdtLienHe: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="SĐT công ty"
//             className="border p-2 rounded"
//             value={form.sdtCongTy}
//             onChange={(e) => setForm({ ...form, sdtCongTy: e.target.value })}
//           />

//           {/* Upload Logo */}
//           <div className="col-span-2">
//             <label className="block mb-1 font-medium">Logo công ty</label>
//             <input type="file" accept="image/*" onChange={handleUploadLogo} />
//             {form.logo && (
//               <img
//                 src={`${variables.API_URL}CongTy/logo/${form.logo.split("/").pop()}`}
//                 alt="Logo"
//                 className="w-24 h-24 object-contain mt-2"
//               />
//             )}
//           </div>

//           <textarea
//             placeholder="Miêu tả"
//             className="border p-2 rounded col-span-2"
//             rows="3"
//             value={form.mieuTa}
//             onChange={(e) => setForm({ ...form, mieuTa: e.target.value })}
//           />

//           <div className="col-span-2 flex justify-end gap-4">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               {editId ? "Cập nhật" : "Thêm mới"}
//             </button>
//             {editId && (
//               <button
//                 type="button"
//                 className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//                 onClick={() => {
//                   setForm({
//                     ctName: "",
//                     diaChi: "",
//                     moHinh: "",
//                     maThue: "",
//                     quocGia: "",
//                     soNhanVien: "",
//                     nguoiLienHe: "",
//                     sdtLienHe: "",
//                     sdtCongTy: "",
//                     mieuTa: "",
//                     logo: "",
//                   });
//                   setEditId(null);
//                 }}
//               >
//                 Hủy
//               </button>
//             )}
//           </div>
//         </form>

//         <h3 className="text-xl font-semibold mt-6 mb-2">Danh sách công ty</h3>
//         <table className="w-full border-collapse border text-sm">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border p-2">ID</th>
//               <th className="border p-2">Tên công ty</th>
//               <th className="border p-2">Mã thuế</th>
//               <th className="border p-2">Quốc gia</th>
//               <th className="border p-2">Người liên hệ</th>
//               <th className="border p-2">Thao tác</th>
//             </tr>
//           </thead>
//           <tbody>
//             {companies.length > 0 ? (
//               companies.map((ct) => (
//                 <tr key={ct.ctid}>
//                   <td className="border p-2 text-center">{ct.ctid}</td>
//                   <td className="border p-2">{ct.ctName}</td>
//                   <td className="border p-2">{ct.maThue || "-"}</td>
//                   <td className="border p-2">{ct.quocGia || "-"}</td>
//                   <td className="border p-2">{ct.nguoiLienHe || "-"}</td>
//                   <td className="border p-2 text-center">
//                     {storedRole === "NhaTuyenDung" && storedCtID === ct.ctid ? (
//                       <>
//                         <button
//                           className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
//                           onClick={() => handleEdit(ct)}
//                         >
//                           Sửa
//                         </button>
//                         {/* <button
//                           className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
//                           onClick={() => handleDelete(ct.ctid)}
//                         >
//                           Xóa
//                         </button> */}
//                       </>
//                     ) : (
//                       <span className="text-gray-400">Không có quyền</span>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center p-3 text-gray-500">
//                   Chưa có công ty nào.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       <Footer />
//     </>
//   );
// }

// export default Company;





import React, { useEffect, useState } from "react";
import { variables } from "../../variables";
import { useNavigate } from "react-router-dom";
import EmployerNavbar from "../../components/employernavbar";
import Footer from "../../components/footer";

function Company() {
  const API_URL = variables.API_URL + "CongTy/";
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const [company, setCompany] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    ctName: "",
    diaChi: "",
    moHinh: "",
    maThue: "",
    quocGia: "",
    soNhanVien: "",
    nguoiLienHe: "",
    sdtLienHe: "",
    sdtCongTy: "",
    mieuTa: "",
    logo: "",
  });

  useEffect(() => {
    if (role !== "NhaTuyenDung") {
      alert("Bạn không có quyền truy cập!");
      navigate("/employer/login");
      return;
    }

    const loadCompany = async () => {
      try {
        const res = await fetch(API_URL + "cong-ty-cua-toi", {
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "Không tải được thông tin công ty!");
          return;
        }

        const c = data.data;
        if (!c) {
          alert("Không có dữ liệu công ty!");
          return;
        }

        setCompany(c);
        setForm({
          ctName: c.ctName || "",
          diaChi: c.diaChi || "",
          moHinh: c.moHinh || "",
          maThue: c.maThue || "",
          quocGia: c.quocGia || "",
          soNhanVien: c.soNhanVien || "",
          nguoiLienHe: c.nguoiLienHe || "",
          sdtLienHe: c.sdtLienHe || "",
          sdtCongTy: c.sdtCongTy || "",
          mieuTa: c.mieuTa || "",
          logo: c.logo || "",
        });

        //  CHƯA KÊ KHAI → BẬT EDIT MODE
        if (c.daKeKhai === false) {
          setIsEdit(true);
        }
      } catch (err) {
        console.error(err);
        alert("Lỗi kết nối server!");
      } finally {
        setLoading(false);
      }
    };

    loadCompany();
  }, [role, navigate]);

  /* ================== UPLOAD LOGO ================== */
  const handleUploadLogo = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(API_URL + "upload-logo", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok && data.url) {
        setForm((prev) => ({ ...prev, logo: data.url }));
      } else {
        alert("Upload logo thất bại!");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi upload logo!");
    }
  };

  /* ================== UPDATE COMPANY ================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(API_URL + "cap-nhat-cong-ty", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          CtName: form.ctName,
          DiaChi: form.diaChi,
          MoHinh: form.moHinh,
          MaThue: form.maThue,
          QuocGia: form.quocGia,
          SoNhanVien: Number(form.soNhanVien) || null,
          NguoiLienHe: form.nguoiLienHe,
          SdtLienHe: form.sdtLienHe,
          SdtCongTy: form.sdtCongTy,
          MieuTa: form.mieuTa,
          Logo: form.logo,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Cập nhật thất bại!");
        return;
      }

      alert("Cập nhật thông tin công ty thành công!");
      setCompany({ ...company, ...form, daKeKhai: true });
      setIsEdit(false);
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối server!");
    }
  };

  if (loading)
    return <div className="p-6 text-center">Đang tải thông tin công ty...</div>;

  if (!company)
    return <div className="p-6 text-center text-gray-500">Không có dữ liệu công ty</div>;

  const logoUrl = company.logo
    ? `${variables.API_URL}CongTy/logo/${company.logo.split("/").pop()}`
    : null;

  /* ================== UI ================== */
  return (
    <>
      <EmployerNavbar />

      <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg mt-6">
        {/* CẢNH BÁO CHƯA KÊ KHAI */}
        {company.daKeKhai === false && (
          <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded">
            ⚠️ <b>Bạn chưa kê khai đầy đủ thông tin công ty.</b><br />
            Vui lòng cập nhật để có thể đăng tin tuyển dụng.
          </div>
        )}

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-6">
          {logoUrl ? (
            <img src={logoUrl} alt="logo" className="w-24 h-24 object-contain" />
          ) : (
            <div className="w-24 h-24 bg-gray-100 flex items-center justify-center">
              No logo
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold">{company.ctName}</h2>
            <p className="text-gray-600">{company.moHinh}</p>
          </div>

          {!isEdit && (
            <button
              onClick={() => setIsEdit(true)}
              className="ml-auto bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Chỉnh sửa
            </button>
          )}
        </div>

        {/* VIEW MODE */}
        {!isEdit && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <p><b>Địa chỉ:</b> {company.diaChi}</p>
              <p><b>Quốc gia:</b> {company.quocGia}</p>
              <p><b>Mã thuế:</b> {company.maThue}</p>
              <p><b>Số nhân viên:</b> {company.soNhanVien}</p>
              <p><b>Người liên hệ:</b> {company.nguoiLienHe}</p>
              <p><b>SĐT liên hệ:</b> {company.sdtLienHe}</p>
              <p><b>SĐT công ty:</b> {company.sdtCongTy}</p>
            </div>

            <div className="mt-4">
              <b>Miêu tả:</b>
              <p className="border p-2 mt-1 bg-gray-50">
                {company.mieuTa}
              </p>
            </div>
          </>
        )}

        {/* EDIT MODE */}
        {isEdit && (
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <input className="border p-2" placeholder="Tên công ty"
              value={form.ctName} onChange={e => setForm({ ...form, ctName: e.target.value })} />

            <input className="border p-2" placeholder="Địa chỉ"
              value={form.diaChi} onChange={e => setForm({ ...form, diaChi: e.target.value })} />

            <input className="border p-2" placeholder="Mô hình"
              value={form.moHinh} onChange={e => setForm({ ...form, moHinh: e.target.value })} />

            <input className="border p-2" placeholder="Mã thuế"
              value={form.maThue} onChange={e => setForm({ ...form, maThue: e.target.value })} />

            <input className="border p-2" placeholder="Quốc gia"
              value={form.quocGia} onChange={e => setForm({ ...form, quocGia: e.target.value })} />

            <input type="number" className="border p-2" placeholder="Số nhân viên"
              value={form.soNhanVien} onChange={e => setForm({ ...form, soNhanVien: e.target.value })} />

            <input className="border p-2" placeholder="Người liên hệ"
              value={form.nguoiLienHe} onChange={e => setForm({ ...form, nguoiLienHe: e.target.value })} />

            <input className="border p-2" placeholder="SĐT liên hệ"
              value={form.sdtLienHe} onChange={e => setForm({ ...form, sdtLienHe: e.target.value })} />

            <input className="border p-2" placeholder="SĐT công ty"
              value={form.sdtCongTy} onChange={e => setForm({ ...form, sdtCongTy: e.target.value })} />

            <textarea className="border p-2 col-span-2" rows="3" placeholder="Miêu tả"
              value={form.mieuTa} onChange={e => setForm({ ...form, mieuTa: e.target.value })} />

            <div className="col-span-2">
              <input type="file" onChange={handleUploadLogo} />
            </div>

            <div className="col-span-2 flex justify-end gap-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Lưu
              </button>
              <button type="button"
                onClick={() => setIsEdit(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded">
                Hủy
              </button>
            </div>
          </form>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Company;
