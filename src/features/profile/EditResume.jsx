// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Cookies from "js-cookie";
// import { variables } from "../../variables";
// import Navbar from "../../components/navbar";
// import Footer from "../../components/footer";

// export default function EditResume() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     TenHoSo: "",
//     TenUngVien: "",
//     PhoneHoSo: "",
//     MailHoSo: "",
//     HocVan: "",
//     NamKinhNghiemID: "",
//     MucLuong: "",
//     ChucDanhID: "",
//     LoaiHinhLamViecID: "",
//     LinhVucID: "",
//     ViTriLamViecID: "",
//     KyNang: "",
//     MucTieu: "",
//     ChucChi: "",
//   });

//   const [avatar, setAvatar] = useState(null);
//   const [avatarPreview, setAvatarPreview] = useState(null);

//   // Dropdown data
//   const [kinhNghiems, setKinhNghiems] = useState([]);
//   const [chucDanhs, setChucDanhs] = useState([]);
//   const [loaiHinhs, setLoaiHinhs] = useState([]);
//   const [linhVucs, setLinhVucs] = useState([]);
//   const [viTris, setViTris] = useState([]);

//   const [loading, setLoading] = useState(true);

//   // Load dropdown data
//   useEffect(() => {
//     const fetchDropdown = async (url, setter) => {
//       try {
//         const res = await fetch(url, { headers: { Authorization: `Bearer ${Cookies.get("jwt_token")}` } });
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         const data = await res.json();
//         setter(data.data || []);
//       } catch (err) {
//         console.error(`Lỗi load dropdown ${url}:`, err);
//         setter([]);
//       }
//     };

//     fetchDropdown(`${variables.API_URL}KinhNghiem/list`, setKinhNghiems);
//     fetchDropdown(`${variables.API_URL}ChucDanh/list`, setChucDanhs);
//     fetchDropdown(`${variables.API_URL}LoaiHinhLamViec/list`, setLoaiHinhs);
//     fetchDropdown(`${variables.API_URL}LinhVuc/list`, setLinhVucs);
//     fetchDropdown(`${variables.API_URL}ViTri/list`, setViTris);
//   }, []);

//   // Load CV data
//   useEffect(() => {
//     const fetchCV = async () => {
//       try {
//         const res = await fetch(`${variables.API_URL}NoiDungHoSo/${id}`, {
//           headers: { Authorization: `Bearer ${Cookies.get("jwt_token")}` },
//         });
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         const data = await res.json();
//         const cvData = data.data || data;

//         setForm({
//           TenHoSo: cvData.hoSoName || "",
//           TenUngVien: cvData.tenUngVien || "",
//           PhoneHoSo: cvData.phoneHoSo || "",
//           MailHoSo: cvData.mailHoSo || "",
//           HocVan: cvData.hocVan || "",
//           NamKinhNghiemID: cvData.namKinhNghiemID || "",
//           MucLuong: cvData.mucLuong || "",
//           ChucDanhID: cvData.chucDanhID || "",
//           LoaiHinhLamViecID: cvData.loaiHinhLamViecID || "",
//           LinhVucID: cvData.linhVucID || "",
//           ViTriLamViecID: cvData.viTriLamViecID || "",
//           KyNang: cvData.kyNang || "",
//           MucTieu: cvData.mucTieu || "",
//           ChucChi: cvData.chucChi || "",
//         });

//         if (cvData.avata) setAvatarPreview(variables.PHOTO_URL + cvData.avata);
//       } catch (err) {
//         console.error("Lỗi load CV:", err);
//         alert("Không tải được CV");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCV();
//   }, [id]);

//   // Form change handlers
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleAvatarChange = (e) => {
//     const file = e.target.files[0];
//     setAvatar(file);
//     setAvatarPreview(URL.createObjectURL(file));
//   };

//   // Submit handler (PUT)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const fd = new FormData();

//     Object.keys(form).forEach((key) => fd.append(key, form[key] || ""));
//     if (avatar) fd.append("AvatarFile", avatar);

//     try {
//       const res = await fetch(`${variables.API_URL}NoiDungHoSo/${id}`, {
//         method: "PUT",
//         headers: { Authorization: `Bearer ${Cookies.get("jwt_token")}` },
//         body: fd,
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert("Cập nhật CV thành công!");
//         navigate(`/viewresume/${id}`);
//       } else {
//         alert(data.message || "Có lỗi xảy ra!");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Lỗi kết nối API");
//     }
//   };

//   if (loading) return <p className="p-6">Đang tải CV...</p>;

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl my-10">
//         <h1 className="text-3xl font-bold mb-6 text-center">Chỉnh sửa CV</h1>

//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* LEFT: Avatar + Contact */}
//           <div className="col-span-1 border-r pr-4">
//             <div className="flex flex-col items-center">
//               <div className="w-40 h-40 bg-gray-200 rounded-full overflow-hidden mb-4">
//                 {avatarPreview ? (
//                   <img src={avatarPreview} className="w-full h-full object-cover" />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center text-gray-500">
//                     Ảnh đại diện
//                   </div>
//                 )}
//               </div>

//               <input type="file" accept="image/*" onChange={handleAvatarChange} className="text-sm mb-4" />

//               <h2 className="text-lg font-semibold mb-2">Thông tin liên hệ</h2>
//               <input
//                 type="text"
//                 name="TenUngVien"
//                 placeholder="Tên ứng viên"
//                 value={form.TenUngVien}
//                 onChange={handleChange}
//                 className="border px-3 py-2 rounded w-full mb-2"
//                 required
//               />
//               <input
//                 type="text"
//                 name="PhoneHoSo"
//                 placeholder="Số điện thoại"
//                 value={form.PhoneHoSo}
//                 onChange={handleChange}
//                 className="border px-3 py-2 rounded w-full mb-2"
//                 required
//               />
//               <input
//                 type="email"
//                 name="MailHoSo"
//                 placeholder="Email"
//                 value={form.MailHoSo}
//                 onChange={handleChange}
//                 className="border px-3 py-2 rounded w-full mb-2"
//                 required
//               />
//             </div>
//           </div>

//           {/* RIGHT: CV Content */}
//           <div className="col-span-2 pl-4">
//             <input
//               type="text"
//               name="TenHoSo"
//               placeholder="Tên hồ sơ (CV 2025...)"
//               value={form.TenHoSo}
//               onChange={handleChange}
//               className="border px-3 py-2 rounded w-full mb-4"
//               required
//             />

//             <div className="mb-4">
//               <label className="font-semibold">Học vấn</label>
//               <textarea
//                 name="HocVan"
//                 rows="3"
//                 className="border w-full px-3 py-2 rounded"
//                 value={form.HocVan}
//                 onChange={handleChange}
//                 placeholder="Ví dụ: Cử nhân CNTT - Đại học ABC..."
//               ></textarea>
//             </div>

//             {/* Dropdowns */}
//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <select
//                 name="NamKinhNghiemID"
//                 value={form.NamKinhNghiemID}
//                 onChange={handleChange}
//                 className="border px-3 py-2 rounded"
//               >
//                 <option value="">Năm kinh nghiệm</option>
//                 {kinhNghiems.map((x) => (
//                   <option key={x.knid} value={x.knid}>{x.knName}</option>
//                 ))}
//               </select>

//               <select
//                 name="ChucDanhID"
//                 value={form.ChucDanhID}
//                 onChange={handleChange}
//                 className="border px-3 py-2 rounded"
//               >
//                 <option value="">Chức danh</option>
//                 {chucDanhs.map((x) => (
//                   <option key={x.cdid} value={x.cdid}>{x.cdName}</option>
//                 ))}
//               </select>

//               <select
//                 name="LoaiHinhLamViecID"
//                 value={form.LoaiHinhLamViecID}
//                 onChange={handleChange}
//                 className="border px-3 py-2 rounded"
//               >
//                 <option value="">Loại hình làm việc</option>
//                 {loaiHinhs.map((x) => (
//                   <option key={x.lhid} value={x.lhid}>{x.lhName}</option>
//                 ))}
//               </select>

//               <select
//                 name="LinhVucID"
//                 value={form.LinhVucID}
//                 onChange={handleChange}
//                 className="border px-3 py-2 rounded"
//               >
//                 <option value="">Lĩnh vực</option>
//                 {linhVucs.map((x) => (
//                   <option key={x.lvid} value={x.lvid}>{x.lvName}</option>
//                 ))}
//               </select>

//               <select
//                 name="ViTriLamViecID"
//                 value={form.ViTriLamViecID}
//                 onChange={handleChange}
//                 className="border px-3 py-2 rounded col-span-2"
//               >
//                 <option value="">Vị trí làm việc</option>
//                 {viTris.map((x) => (
//                   <option key={x.vtid} value={x.vtid}>{x.vtName}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Mục tiêu nghề nghiệp */}
//             <div className="mb-4">
//               <label className="font-semibold">Mục tiêu nghề nghiệp</label>
//               <textarea
//                 name="MucTieu"
//                 rows="3"
//                 className="border w-full px-3 py-2 rounded"
//                 value={form.MucTieu}
//                 onChange={handleChange}
//               ></textarea>
//             </div>

//             {/* Kỹ năng */}
//             <div className="mb-4">
//               <label className="font-semibold">Kỹ năng</label>
//               <textarea
//                 name="KyNang"
//                 rows="3"
//                 className="border w-full px-3 py-2 rounded"
//                 value={form.KyNang}
//                 onChange={handleChange}
//               ></textarea>
//             </div>

//             {/* Chứng chỉ */}
//             <div className="mb-4">
//               <label className="font-semibold">Chứng chỉ</label>
//               <textarea
//                 name="ChucChi"
//                 rows="3"
//                 className="border w-full px-3 py-2 rounded"
//                 value={form.ChucChi}
//                 onChange={handleChange}
//               ></textarea>
//             </div>

//             <button
//               type="submit"
//               className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
//             >
//               Cập nhật CV
//             </button>
//           </div>
//         </form>
//       </div>
//       <Footer />
//     </>
//   );
// }







// EditResume.js
// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Cookies from "js-cookie";
// import { variables } from "../../variables";
// import Navbar from "../../components/navbar";
// import Footer from "../../components/footer";

// export default function EditResume() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     TenHoSo: "",
//     TenUngVien: "",
//     PhoneHoSo: "",
//     MailHoSo: "",
//     HocVan: "",
//     NamKinhNghiemID: "",
//     MucLuong: "",
//     ChucDanhID: "",
//     LoaiHinhLamViecID: "",
//     LinhVucID: "",
//     ViTriLamViecID: "",
//     KyNang: "",
//     MucTieu: "",
//     ChucChi: "",
//   });
//   const [avatar, setAvatar] = useState(null);
//   const [avatarPreview, setAvatarPreview] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCV = async () => {
//       try {
//         const res = await fetch(`${variables.API_URL}NoiDungHoSo/${id}`, {
//           headers: { Authorization: `Bearer ${Cookies.get("jwt_token")}` },
//         });
//         const data = await res.json();
//         const cvData = data.data || data;
//         setForm({
//           TenHoSo: cvData.hoSoName || "",
//           TenUngVien: cvData.tenUngVien || "",
//           PhoneHoSo: cvData.phoneHoSo || "",
//           MailHoSo: cvData.mailHoSo || "",
//           HocVan: cvData.hocVan || "",
//           NamKinhNghiemID: cvData.namKinhNghiemID || "",
//           MucLuong: cvData.mucLuong || "",
//           ChucDanhID: cvData.chucDanhID || "",
//           LoaiHinhLamViecID: cvData.loaiHinhLamViecID || "",
//           LinhVucID: cvData.linhVucID || "",
//           ViTriLamViecID: cvData.viTriLamViecID || "",
//           KyNang: cvData.kyNang || "",
//           MucTieu: cvData.mucTieu || "",
//           ChucChi: cvData.chucChi || "",
//         });
//         if (cvData.avata) setAvatarPreview(variables.PHOTO_URL + cvData.avata);
//       } catch (err) {
//         console.error(err);
//         alert("Không tải được CV");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCV();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleAvatarChange = (e) => {
//     const file = e.target.files[0];
//     setAvatar(file);
//     setAvatarPreview(URL.createObjectURL(file));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const fd = new FormData();
//     Object.keys(form).forEach((k) => fd.append(k, form[k] || ""));
//     if (avatar) fd.append("AvatarFile", avatar);

//     try {
//       const res = await fetch(`${variables.API_URL}NoiDungHoSo/${id}`, {
//         method: "PUT",
//         headers: { Authorization: `Bearer ${Cookies.get("jwt_token")}` },
//         body: fd,
//       });
//       const data = await res.json();
//       if (res.ok) {
//         alert("Cập nhật CV thành công!");
//         // Chuyển sang trang thêm bằng cấp, truyền hoSoId
//         navigate("/add-certification", { state: { hoSoId: id } });
//       } else {
//         alert(data.message || "Có lỗi xảy ra!");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Lỗi kết nối API");
//     }
//   };

//   if (loading) return <p className="p-6">Đang tải CV...</p>;

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl my-10">
//         <h1 className="text-3xl font-bold mb-6 text-center">Chỉnh sửa CV</h1>
//         <form onSubmit={handleSubmit} >
//           <input name="TenHoSo" value={form.TenHoSo} onChange={handleChange} placeholder="Tên hồ sơ" className="border px-3 py-2 rounded w-full mb-4" required />
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {/* LEFT */}
//             <div className="col-span-1 border-r pr-4 flex flex-col items-center border-dashed border-secondary">
//               <div className="w-40 h-40 bg-gray-200 rounded-full overflow-hidden mb-4 items-center">
//                 {avatarPreview ? (
//                   <img src={avatarPreview} className="w-full h-full object-cover" />
//                 ) : <div className="w-full h-full flex items-center justify-center text-gray-500">Ảnh đại diện</div>}
//               </div>
//               <input type="file" accept="image/*" onChange={handleAvatarChange} />
//               <input name="TenUngVien" value={form.TenUngVien} onChange={handleChange} placeholder="Tên ứng viên" className="border px-3 py-2 rounded w-full mt-2" required />
//               <input name="PhoneHoSo" value={form.PhoneHoSo} onChange={handleChange} placeholder="Số điện thoại" className="border px-3 py-2 rounded w-full mt-2" required />
//               <input name="MailHoSo" value={form.MailHoSo} onChange={handleChange} placeholder="Email" className="border px-3 py-2 rounded w-full mt-2" required />
//               <div className="mt-4">
//                 <label className="font-semibold p-1 bg-accent rounded-[8px] text-white">Kỹ năng</label>
//                 <textarea name="KyNang" value={form.KyNang} onChange={handleChange} placeholder="Kỹ năng" className="border w-full px-3 py-2 rounded mb-4 mt-2"></textarea>
//               </div>
//             </div>
//             {/* RIGHT */}
//             <div className="col-span-2 pl-4">
//               <label className="font-semibold p-1 bg-accent rounded-[8px] text-white ">Học vấn</label>
//               <textarea name="HocVan" value={form.HocVan} onChange={handleChange} placeholder="Học vấn" className="border w-full px-3 py-2 rounded mb-4 mt-2"></textarea>
//               <label className="font-semibold p-1 bg-accent rounded-[8px] text-white">Muc tiêu nghề nghiệp</label>
//               <textarea name="MucTieu" value={form.MucTieu} onChange={handleChange} placeholder="Mục tiêu nghề nghiệp" className="border w-full px-3 py-2 rounded mb-4 mt-2"></textarea>
//               <label className="font-semibold p-1 bg-accent rounded-[8px] text-white">Chứng chỉ</label>
//               <textarea name="ChucChi" value={form.ChucChi} onChange={handleChange} placeholder="Chứng chỉ" className="border w-full px-3 py-2 rounded mb-4 mt-2"></textarea>
//               <button type="submit" className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700">Cập nhật CV & Thêm bằng cấp</button>
//             </div>
//           </div>

//         </form>
//       </div>
//       <Footer />
//     </>
//   );
// }







import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { variables } from "../../variables";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

import { FaPhone } from "react-icons/fa6";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { CiMail } from "react-icons/ci";

export default function EditResume() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    TenHoSo: "",
    TenUngVien: "",
    PhoneHoSo: "",
    MailHoSo: "",
    HocVan: "",
    NamKinhNghiemID: "",
    MucLuong: "",
    ChucDanhID: "",
    LoaiHinhLamViecID: "",
    LinhVucID: "",
    ViTriLamViecID: "",
    KyNang: "",
    MucTieu: "",
    ChucChi: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(true);

  // ======= STATE DROPDOWN =======
  const [kinhNghiems, setKinhNghiems] = useState([]);
  const [chucDanhs, setChucDanhs] = useState([]);
  const [loaiHinhs, setLoaiHinhs] = useState([]);
  const [linhVucs, setLinhVucs] = useState([]);
  const [viTris, setViTris] = useState([]);

  // ======= LOAD DROPDOWN =======
  useEffect(() => {
    const fetchDropdown = async (url, setter) => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setter(data.data || []);
      } catch (err) {
        console.error("Dropdown error:", err);
        setter([]);
      }
    };

    fetchDropdown(`${variables.API_URL}KinhNghiem/list`, setKinhNghiems);
    fetchDropdown(`${variables.API_URL}ChucDanh/list`, setChucDanhs);
    fetchDropdown(`${variables.API_URL}LoaiHinhLamViec/list`, setLoaiHinhs);
    fetchDropdown(`${variables.API_URL}LinhVuc/list`, setLinhVucs);
    fetchDropdown(`${variables.API_URL}ViTri/list`, setViTris);
  }, []);

  // ======= LOAD CV =======
  useEffect(() => {
    const fetchCV = async () => {
      try {
        const res = await fetch(`${variables.API_URL}NoiDungHoSo/${id}`, {
          headers: { Authorization: `Bearer ${Cookies.get("jwt_token")}` },
        });

        const data = await res.json();
        const cvData = data.data || data;

        setForm({
          TenHoSo: cvData.hoSoName || "",
          TenUngVien: cvData.tenUngVien || "",
          PhoneHoSo: cvData.phoneHoSo || "",
          MailHoSo: cvData.mailHoSo || "",
          HocVan: cvData.hocVan || "",
          NamKinhNghiemID: cvData.namKinhNghiemID || "",
          MucLuong: cvData.mucLuong || "",
          ChucDanhID: cvData.chucDanhID || "",
          LoaiHinhLamViecID: cvData.loaiHinhLamViecID || "",
          LinhVucID: cvData.linhVucID || "",
          ViTriLamViecID: cvData.viTriLamViecID || "",
          KyNang: cvData.kyNang || "",
          MucTieu: cvData.mucTieu || "",
          ChucChi: cvData.chucChi || "",
        });

        if (cvData.avata)
          setAvatarPreview(variables.PHOTO_URL + cvData.avata);
      } catch (err) {
        console.error(err);
        alert("Không tải được CV");
      } finally {
        setLoading(false);
      }
    };

    fetchCV();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.keys(form).forEach((k) => fd.append(k, form[k] || ""));
    if (avatar) fd.append("AvatarFile", avatar);

    try {
      const res = await fetch(`${variables.API_URL}NoiDungHoSo/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${Cookies.get("jwt_token")}` },
        body: fd,
      });
      const data = await res.json();
      if (res.ok) {
        alert("Cập nhật CV thành công!");
        navigate("/add-certification", { state: { hoSoId: id } });
      } else {
        alert(data.message || "Có lỗi xảy ra!");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối API");
    }
  };

  if (loading) return <p className="p-6">Đang tải CV...</p>;

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl my-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Chỉnh sửa CV</h1>

        <form onSubmit={handleSubmit}>
          <input
            name="TenHoSo"
            value={form.TenHoSo}
            onChange={handleChange}
            placeholder="Tên hồ sơ"
            className="border px-3 py-2 rounded w-full mb-4"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* LEFT */}
            <div className="col-span-1 border-r pr-4  border-dashed border-secondary">
              <div className="flex flex-col items-center bg-highlight/70 h-full">
                <div className="w-40 h-40 bg-gray-200 rounded-full overflow-hidden mb-4">
                  {avatarPreview ? (
                    <img src={avatarPreview} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      Ảnh đại diện
                    </div>
                  )}
                </div>

                <input type="file" accept="image/*" onChange={handleAvatarChange} className="text-[12px] text-gray-300 text-center mx-auto mb-4" />

                <div className="flex items-center">
                  <MdDriveFileRenameOutline className="mr-2 text-accent" />

                  <input
                    type="text"
                    name="TenUngVien"
                    placeholder="Tên ứng viên"
                    value={form.TenUngVien}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded w-full mb-2 bg-white"
                    required
                  />
                </div>

                <div className="flex items-center">
                  <FaPhone className="mr-2 text-accent" />

                  <input
                    type="text"
                    name="PhoneHoSo"
                    placeholder="Số điện thoại"
                    value={form.PhoneHoSo}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded w-full mb-2 bg-white"
                    required
                  />
                </div>

                <div className="flex items-center">
                  <CiMail className="mr-2 text-accent" />

                  <input
                    type="email"
                    name="MailHoSo"
                    placeholder="Email"
                    value={form.MailHoSo}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded w-full mb-2 bg-white"
                    required
                  />
                </div>
                {/* Kỹ năng */}
                <div className="mb-4 mt-2">
                   <label className="font-semibold p-1 pr-10 bg-accent rounded-[8px] text-white uppercase">Kỹ năng</label>
                   <div className="h-[2px] w-full bg-accent mt-1"></div>
                  <textarea
                    name="KyNang"
                    rows="3"
                    className="border border-gray-500 w-full px-3 py-2 rounded mt-2 bg-white"
                    value={form.KyNang}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>
            {/* RIGHT */}
            <div className="col-span-2 pl-4">
              {/* Mục tiêu nghề nghiệp */}
              <div className="mb-4">
                <label className="font-semibold p-1 pr-10 bg-accent rounded-[8px] text-white uppercase">Mục tiêu nghề nghiệp</label>
                <div className="h-[2px] w-full bg-accent mt-1"></div>
                <textarea
                  name="MucTieu"
                  rows="3"
                  className="border w-full px-3 py-2 rounded mt-2"
                  value={form.MucTieu}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="font-semibold p-1 pr-10 bg-accent rounded-[8px] text-white uppercase">Học vấn</label>
                <div className="h-[2px] w-full bg-accent mt-1"></div>
                <textarea
                  name="HocVan"
                  rows="3"
                  className="border w-full px-3 py-2 rounded mt-2"
                  value={form.HocVan}
                  onChange={handleChange}
                  placeholder="Ví dụ: Cử nhân CNTT - Đại học ABC..."
                ></textarea>
              </div>

              {/* Dropdowns */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <select name="NamKinhNghiemID" value={form.NamKinhNghiemID} onChange={handleChange} className="border px-3 py-2 rounded">
                  <option value="">Năm kinh nghiệm</option>
                  {kinhNghiems.map((x) => (
                    <option key={x.knid} value={x.knid}>{x.knName}</option>
                  ))}
                </select>

                <select name="ChucDanhID" value={form.ChucDanhID} onChange={handleChange} className="border px-3 py-2 rounded">
                  <option value="">Chức danh</option>
                  {chucDanhs.map((x) => (
                    <option key={x.cdid} value={x.cdid}>{x.cdName}</option>
                  ))}
                </select>

                <select name="LoaiHinhLamViecID" value={form.LoaiHinhLamViecID} onChange={handleChange} className="border px-3 py-2 rounded">
                  <option value="">Loại hình làm việc</option>
                  {loaiHinhs.map((x) => (
                    <option key={x.lhid} value={x.lhid}>{x.lhName}</option>
                  ))}
                </select>

                <select name="LinhVucID" value={form.LinhVucID} onChange={handleChange} className="border px-3 py-2 rounded">
                  <option value="">Lĩnh vực</option>
                  {linhVucs.map((x) => (
                    <option key={x.lvid} value={x.lvid}>{x.lvName}</option>
                  ))}
                </select>

                <select name="ViTriLamViecID" value={form.ViTriLamViecID} onChange={handleChange} className="border px-3 py-2 rounded col-span-2">
                  <option value="">Vị trí làm việc</option>
                  {viTris.map((x) => (
                    <option key={x.vtid} value={x.vtid}>{x.vtName}</option>
                  ))}
                </select>
              </div>

              {/* Chứng chỉ */}
              <div className="mb-4">
                <label className="font-semibold p-1 pr-10 bg-accent rounded-[8px] text-white uppercase">Chứng chỉ</label>
                <div className="h-[2px] w-full bg-accent mt-1"></div>
                <textarea
                  name="ChucChi"
                  rows="3"
                  className="border w-full px-3 py-2 rounded mt-2"
                  value={form.ChucChi}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700">
                Cập nhật CV & Thêm bằng cấp
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
