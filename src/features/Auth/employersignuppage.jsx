// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { variables } from "../../variables";
// import EmployerNavbar from "../../components/employernavbar";
// import Footer from "../../components/footer";

// function Employersignuppage() {
//   const [form, setForm] = useState({
//     username: "",
//     phone: "",
//     email: "",
//     password: "",
//     ntdName: "",
//     ctID: "", // chọn công ty
//   });
//   const [companies, setCompanies] = useState([]); // danh sách công ty
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   // 🔹 Load danh sách công ty
//   useEffect(() => {
//   const loadCompanies = async () => {
//     try {
//       const res = await fetch(variables.API_URL + "CongTy/list");
//       const data = await res.json();
//       if (res.ok) {
//         setCompanies(data.data || []); // ✅ dùng "data.data"
//       } else {
//         alert(data.message || "Không thể tải danh sách công ty!");
//       }
//     } catch (err) {
//       console.error("Lỗi tải công ty:", err);
//       alert("Lỗi kết nối server khi tải danh sách công ty!");
//     }
//   };
//   loadCompanies();
// }, []);

//   // 🔹 Xử lý thay đổi input
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//     setErrors({ ...errors, [name]: "" }); // clear lỗi khi nhập lại
//   };

//   // 🔹 Gửi form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});

//     try {
//       const res = await fetch(variables.API_URL + "Register/register-ntd", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           TkName: form.username,
//           Sdt: form.phone,
//           Mail: form.email,
//           Password: form.password,
//           NtdName: form.ntdName,
//           CtID: form.ctID ? Number(form.ctID) : null,
//         }),
//       });

//       const text = await res.text(); // tránh lỗi Unexpected end of JSON input
//       const data = text ? JSON.parse(text) : {};

//       if (!res.ok) {
//         if (data.errors) {
//           const newErrors = {};
//           Object.keys(data.errors).forEach((key) => {
//             newErrors[key] = data.errors[key][0];
//           });
//           setErrors(newErrors);
//         } else if (data.Message) {
//           alert(data.Message);
//         } else {
//           alert("Đăng ký thất bại, vui lòng kiểm tra lại thông tin!");
//         }
//         return;
//       }

//       alert(data.Message || "Đăng ký thành công!");
//       navigate("/employer", { state: { username: form.username } });
//     } catch (err) {
//       console.error(err);
//       alert("Có lỗi xảy ra, vui lòng thử lại!");
//     }
//   };

//   return (
//     <>
//   <EmployerNavbar/>
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-md mx-auto p-6 bg-white rounded shadow"
//     >
//       <h2 className="text-2xl font-bold mb-4">Đăng ký nhà tuyển dụng</h2>

//       <div className="mb-4">
//         <label className="block mb-1">Tên tài khoản</label>
//         <input
//           type="text"
//           name="username"
//           value={form.username}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//         {errors.TkName && (
//           <div className="text-red-500 text-sm mt-1">{errors.TkName}</div>
//         )}
//       </div>

//       <div className="mb-4">
//         <label className="block mb-1">Số điện thoại</label>
//         <input
//           type="text"
//           name="phone"
//           value={form.phone}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//         {errors.Sdt && (
//           <div className="text-red-500 text-sm mt-1">{errors.Sdt}</div>
//         )}
//       </div>

//       <div className="mb-4">
//         <label className="block mb-1">Email</label>
//         <input
//           type="email"
//           name="email"
//           value={form.email}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//         {errors.Mail && (
//           <div className="text-red-500 text-sm mt-1">{errors.Mail}</div>
//         )}
//       </div>

//       <div className="mb-4">
//         <label className="block mb-1">Mật khẩu</label>
//         <input
//           type="password"
//           name="password"
//           value={form.password}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//         {errors.Password && (
//           <div className="text-red-500 text-sm mt-1">{errors.Password}</div>
//         )}
//       </div>

//       <div className="mb-4">
//         <label className="block mb-1">Tên nhà tuyển dụng</label>
//         <input
//           type="text"
//           name="ntdName"
//           value={form.ntdName}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//         {errors.NtdName && (
//           <div className="text-red-500 text-sm mt-1">{errors.NtdName}</div>
//         )}
//       </div>

//       <div className="mb-4">
//         <label className="block mb-1">Công ty</label>
//         <select
//           name="ctID"
//           value={form.ctID}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//         >
//           <option value="">-- Chưa chọn công ty --</option>
//           {companies.map((ct) => (
//             <option key={ct.ctid} value={ct.ctid}>
//               {ct.ctName}
//             </option>
//           ))}
//         </select>
//       </div>

//       <button
//         type="submit"
//         className="w-full bg-primary text-white py-2 rounded cursor-pointer"
//       >
//         Đăng ký
//       </button>

//       <div className="mt-4 text-center">
//         <span>Đã có tài khoản? </span>
//         <Link to="/employer/login" className="text-accent underline">
//           Đăng nhập
//         </Link>
//       </div>
//     </form>

//     <Footer />
//     </>
//   );
// }

// export default Employersignuppage;





import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { variables } from "../../variables";
import EmployerNavbar from "../../components/employernavbar";
import Footer from "../../components/footer";
import background from '../../assets/signup.jpg';

function Employersignuppage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    ntdName: "Nhà tuyển dụng",
    ctID: "",
  });

  const [errors, setErrors] = useState({});
  const [companies, setCompanies] = useState([]);

  // 🔹 Nếu có dữ liệu từ Google login thì điền sẵn
  useEffect(() => {
    if (location.state) {
      const { email, realname } = location.state;
      setForm((prev) => ({
        ...prev,
        email: email || prev.email,
        username: realname || prev.username,
        ntdName: realname || prev.ntdName,
      }));
    }
  }, [location.state]);

  // 🔹 Lấy danh sách công ty
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch(variables.API_URL + "CongTy/list");
        const data = await res.json();
        setCompanies(data.Data || data.data || []);
      } catch (err) {
        console.error("Lỗi tải công ty:", err);
      }
    };
    fetchCompanies();
  }, []);

  // 🔹 Xử lý nhập liệu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // 🔹 Gửi form đăng ký
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const res = await fetch(variables.API_URL + "Register/dang-ky-ntd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          TkName: form.username,
          Sdt: form.phone,
          Mail: form.email,
          Password: form.password,
          // NtdName: form.ntdName,
          NtdName: "Nhà tuyển dụng",
          CtID: form.ctID ? parseInt(form.ctID) : null,
        }),
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (!res.ok) {
        if (data.errors) {
          const newErrors = {};
          Object.keys(data.errors).forEach((key) => {
            newErrors[key] = data.errors[key][0];
          });
          setErrors(newErrors);
        } else if (data.Message) {
          alert(data.Message);
        } else {
          alert("Đăng ký thất bại, vui lòng thử lại!");
        }
        return;
      }

      alert(data.Message || "Đăng ký thành công!");
      navigate("/employer/login");
    } catch (err) {
      console.error(err);
      alert("Có lỗi kết nối server!");
    }
  };

  return (
    <>
      <EmployerNavbar />
 <div style={{ backgroundImage: `url(${background})` }} className=" bg-center bg-cover bg-no-repeath-full">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white/70 rounded shadow mb-[-1.25rem]"
      >
        <h2 className="text-2xl font-bold mb-4">Đăng ký nhà tuyển dụng</h2>

        {/* Username */}
        <div className="mb-4">
          <label className="block mb-1">Tên tài khoản</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          {errors.TkName && (
            <div className="text-red-500 text-sm mt-1">{errors.TkName}</div>
          )}
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block mb-1">Số điện thoại</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          {errors.Sdt && (
            <div className="text-red-500 text-sm mt-1">{errors.Sdt}</div>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          {errors.Mail && (
            <div className="text-red-500 text-sm mt-1">{errors.Mail}</div>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-1">Mật khẩu</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          {errors.Password && (
            <div className="text-red-500 text-sm mt-1">{errors.Password}</div>
          )}
        </div>

        {/* Tên NTD */}
        {/* <div className="mb-4">
          <label className="block mb-1">Tên nhà tuyển dụng</label>
          <input
            type="text"
            name="ntdName"
            value={form.ntdName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          {errors.NtdName && (
            <div className="text-red-500 text-sm mt-1">{errors.NtdName}</div>
          )}
        </div> */}

        {/* Chọn công ty */}
        {/* <div className="mb-4">
          <label className="block mb-1">Công ty</label>
          <select
            name="ctID"
            value={form.ctID}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Chưa chọn công ty --</option>
            {companies.map((ct) => (
              <option key={ct.ctid} value={ct.ctid}>
                {ct.ctName}
              </option>
            ))}
          </select>
        </div> */}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded cursor-pointer hover:bg-blue-700"
        >
          Đăng ký
        </button>

        {/* Link đăng nhập */}
        <div className="mt-4 text-center">
          <span>Đã có tài khoản? </span>
          <Link to="/employer/login" className="text-accent underline">
            Đăng nhập
          </Link>
        </div>
      </form>
</div>
      <Footer />
    </>
  );
}

export default Employersignuppage;








// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { variables } from "../../variables";
// import EmployerNavbar from "../../components/employernavbar";
// import Footer from "../../components/footer";
// import background from "../../assets/signup.jpg";

// function Employersignuppage() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   /* =========================
//      STATE: TÀI KHOẢN NTD
//   ========================== */
//   const [form, setForm] = useState({
//     username: "",
//     phone: "",
//     email: "",
//     password: "",
//   });

//   /* =========================
//      STATE: CÔNG TY (ĐẦY ĐỦ)
//   ========================== */
//   const [companyForm, setCompanyForm] = useState({
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

//   /* =========================
//      GOOGLE LOGIN PREFILL
//   ========================== */
//   useEffect(() => {
//     if (location.state) {
//       const { email, realname } = location.state;
//       setForm((prev) => ({
//         ...prev,
//         email: email || prev.email,
//         username: realname || prev.username,
//       }));
//     }
//   }, [location.state]);

//   /* =========================
//      UPLOAD LOGO
//   ========================== */
//   const handleUploadLogo = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await fetch(
//         variables.API_URL + "CongTy/upload-logo",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await res.json();

//       if (res.ok && data.url) {
//         setCompanyForm((prev) => ({ ...prev, logo: data.url }));
//         alert("Upload logo thành công!");
//       } else {
//         alert(data.Message || "Upload logo thất bại!");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Lỗi upload logo!");
//     }
//   };

//   /* =========================
//      SUBMIT FORM
//   ========================== */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!companyForm.ctName.trim()) {
//       alert("Tên công ty không được để trống!");
//       return;
//     }

//     try {
//       /* ===== 1. TẠO CÔNG TY ===== */
//       const resCompany = await fetch(
//         variables.API_URL + "CongTy/add",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             CtName: companyForm.ctName,
//             DiaChi: companyForm.diaChi,
//             MoHinh: companyForm.moHinh,
//             MaThue: companyForm.maThue,
//             QuocGia: companyForm.quocGia,
//             SoNhanVien: companyForm.soNhanVien
//               ? parseInt(companyForm.soNhanVien)
//               : 1,
//             NguoiLienHe: companyForm.nguoiLienHe,
//             SdtLienHe: companyForm.sdtLienHe,
//             SdtCongTy: companyForm.sdtCongTy,
//             MieuTa: companyForm.mieuTa,
//             Logo: companyForm.logo,
//           }),
//         }
//       );

//       const companyData = await resCompany.json();

//       if (!resCompany.ok) {
//         alert(companyData.Message || "Tạo công ty thất bại!");
//         return;
//       }

//       const ctID = companyData.data?.ctId || companyData.ctId;
//       if (!ctID) {
//         alert("Không lấy được ID công ty!");
//         return;
//       }

//       /* ===== 2. TẠO NHÀ TUYỂN DỤNG ===== */
//       const resNTD = await fetch(
//         variables.API_URL + "Register/register-ntd",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             TkName: form.username,
//             Sdt: form.phone,
//             Mail: form.email,
//             Password: form.password,
//             NtdName: "Nhà tuyển dụng",
//             CtID: ctID,
//           }),
//         }
//       );

//       const ntdData = await resNTD.json();

//       if (!resNTD.ok) {
//         alert(ntdData.Message || "Đăng ký NTD thất bại!");
//         return;
//       }

//       alert("Đăng ký nhà tuyển dụng thành công!");
//       navigate("/employer/login");
//     } catch (err) {
//       console.error(err);
//       alert("Lỗi kết nối server!");
//     }
//   };

//   return (
//     <>
//       <EmployerNavbar />

//       <div
//         style={{ backgroundImage: `url(${background})` }}
//         className="bg-cover bg-center min-h-screen flex items-center justify-center"
//       >
//         <form
//           onSubmit={handleSubmit}
//           className="w-full max-w-3xl bg-white/80 p-6 rounded shadow"
//         >
//           <h2 className="text-2xl font-bold mb-4 text-center">
//             Đăng ký Nhà tuyển dụng & Công ty
//           </h2>

//           {/* ===== TÀI KHOẢN ===== */}
//           <h3 className="font-semibold mb-2">Thông tin tài khoản</h3>
//           <div className="grid grid-cols-2 gap-4 mb-4">
//             <input
//               placeholder="Tên tài khoản"
//               className="border p-2 rounded"
//               value={form.username}
//               onChange={(e) =>
//                 setForm({ ...form, username: e.target.value })
//               }
//               required
//             />
//             <input
//               placeholder="Số điện thoại"
//               className="border p-2 rounded"
//               value={form.phone}
//               onChange={(e) =>
//                 setForm({ ...form, phone: e.target.value })
//               }
//               required
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               className="border p-2 rounded col-span-2"
//               value={form.email}
//               onChange={(e) =>
//                 setForm({ ...form, email: e.target.value })
//               }
//               required
//             />
//             <input
//               type="password"
//               placeholder="Mật khẩu"
//               className="border p-2 rounded col-span-2"
//               value={form.password}
//               onChange={(e) =>
//                 setForm({ ...form, password: e.target.value })
//               }
//               required
//             />
//           </div>

//           {/* ===== CÔNG TY ===== */}
//           <h3 className="font-semibold mb-2">Thông tin công ty</h3>
//           <div className="grid grid-cols-2 gap-4">
//             <input placeholder="Tên công ty *" className="border p-2 rounded col-span-2"
//               value={companyForm.ctName}
//               onChange={(e) => setCompanyForm({ ...companyForm, ctName: e.target.value })}
//               required
//             />
//             <input placeholder="Địa chỉ" className="border p-2 rounded"
//               value={companyForm.diaChi}
//               onChange={(e) => setCompanyForm({ ...companyForm, diaChi: e.target.value })}
//             />
//             <input placeholder="Quốc gia" className="border p-2 rounded"
//               value={companyForm.quocGia}
//               onChange={(e) => setCompanyForm({ ...companyForm, quocGia: e.target.value })}
//             />
//             <input placeholder="Mô hình công ty" className="border p-2 rounded"
//               value={companyForm.moHinh}
//               onChange={(e) => setCompanyForm({ ...companyForm, moHinh: e.target.value })}
//             />
//             <input placeholder="Mã thuế" className="border p-2 rounded"
//               value={companyForm.maThue}
//               onChange={(e) => setCompanyForm({ ...companyForm, maThue: e.target.value })}
//             />
//             <input placeholder="Số nhân viên" type="number" className="border p-2 rounded"
//               value={companyForm.soNhanVien}
//               onChange={(e) => setCompanyForm({ ...companyForm, soNhanVien: e.target.value })}
//             />
//             <input placeholder="Người liên hệ" className="border p-2 rounded"
//               value={companyForm.nguoiLienHe}
//               onChange={(e) => setCompanyForm({ ...companyForm, nguoiLienHe: e.target.value })}
//             />
//             <input placeholder="SĐT liên hệ" className="border p-2 rounded"
//               value={companyForm.sdtLienHe}
//               onChange={(e) => setCompanyForm({ ...companyForm, sdtLienHe: e.target.value })}
//             />
//             <input placeholder="SĐT công ty" className="border p-2 rounded col-span-2"
//               value={companyForm.sdtCongTy}
//               onChange={(e) => setCompanyForm({ ...companyForm, sdtCongTy: e.target.value })}
//             />

//             {/* LOGO */}
//             <div className="col-span-2">
//               <label className="font-medium">Logo công ty</label>
//               <input type="file" accept="image/*" onChange={handleUploadLogo} />
//               {companyForm.logo && (
//                 <img
//                   src={`${variables.API_URL}CongTy/logo/${companyForm.logo.split("/").pop()}`}
//                   alt="logo"
//                   className="w-24 h-24 mt-2 object-contain"
//                 />
//               )}
//             </div>

//             <textarea
//               placeholder="Miêu tả công ty"
//               rows="3"
//               className="border p-2 rounded col-span-2"
//               value={companyForm.mieuTa}
//               onChange={(e) => setCompanyForm({ ...companyForm, mieuTa: e.target.value })}
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full mt-6 bg-primary text-white py-2 rounded hover:bg-blue-700"
//           >
//             Đăng ký
//           </button>

//           <div className="mt-4 text-center">
//             Đã có tài khoản?{" "}
//             <Link to="/employer/login" className="text-accent underline">
//               Đăng nhập
//             </Link>
//           </div>
//         </form>
//       </div>

//       <Footer />
//     </>
//   );
// }

// export default Employersignuppage;

