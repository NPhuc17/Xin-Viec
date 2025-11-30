// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { variables } from '../../variables';

// function SignupPage() {
//   const [form, setForm] = useState({
//     username: '',
//     phone: '',
//     email: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Xử lý đăng ký ở đây (gửi dữ liệu lên server)
//     console.log(form);
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
//         <h2 className="text-2xl font-bold mb-4">Đăng ký ứng viên</h2>
//         <div className="mb-4">
//           <label className="block mb-1">Tên tài khoản</label>
//           <input
//             type="text"
//             name="username"
//             value={form.username}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1">Số điện thoại</label>
//           <input
//             type="text"
//             name="phone"
//             value={form.phone}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1">Mật khẩu</label>
//           <input
//             type="password"
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>
//         <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
//           Đăng ký
//         </button>
//         <div className="mt-4 text-center">
//           <span>Đã có tài khoản? </span>
//           <Link to="/login" className="text-blue-500 underline">Đăng nhập</Link>
//         </div>
//       </form>
//     </>
//   );
// }

// export default SignupPage;





// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { variables } from '../../variables';
// import Navbar from '../../components/navbar';
// import Footer from '../../components/footer';
// function SignupPage() {
//   const [form, setForm] = useState({
//     username: '',
//     phone: '',
//     email: '',
//     password: '',
//     uvname: '',
//     ngaysinh: '',
//     quocgia: '',
//     linhvucID: '',

//   });
//   const [errors, setErrors] = useState({});
//   const [linhvucs, setLinhvucs] = useState([]); // danh sách lĩnh vực
//   const navigate = useNavigate();

//   // 🔹 Gọi API lấy danh sách lĩnh vực khi load trang
//   useEffect(() => {
//     const fetchLinhVucs = async () => {
//       try {
//         const res = await fetch(variables.API_URL + 'LinhVuc/list');
//         const data = await res.json();
//         setLinhvucs(data.Data || data.data || []);
//       } catch (err) {
//         console.error('Lỗi tải lĩnh vực:', err);
//       }
//     };
//     fetchLinhVucs();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//     setErrors({ ...errors, [name]: '' });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});

//     try {
//       const res = await fetch(variables.API_URL + 'Register/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           TkName: form.username,
//           Sdt: form.phone,
//           Mail: form.email,
//           Password: form.password,
//           LinhvucID: parseInt(form.linhvucID),
//           UvName: form.realname,
//           NgaySinh: form.ngaysinh,
//           QuocGia: form.quocgia,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         if (data.errors) {
//           const newErrors = {};
//           Object.keys(data.errors).forEach((key) => {
//             newErrors[key] = data.errors[key][0];
//           });
//           setErrors(newErrors);
//         } else if (data.message) {
//           alert(data.message);
//         }
//       } else {
//         alert('Đăng ký thành công!');
//         navigate('/', { state: { username: form.username } });
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Có lỗi xảy ra, vui lòng thử lại!');
//     }
//   };

//   return (
//     <>
//     <Navbar/>
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-md mx-auto p-6 bg-white rounded shadow"
//     >
//       <h2 className="text-2xl font-bold mb-4">Đăng ký ứng viên</h2>

//       {/* Username */}
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

//       {/* Phone */}
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

//       {/* Email */}
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

//       {/* Password */}
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
//       {/* Realname */}
//       <div className="mb-4">
//         <label className="block mb-1">Tên ứng viên</label>
//         <input
//           type="text"
//           name="realname"
//           value={form.realname}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//         {errors.TkName && (
//           <div className="text-red-500 text-sm mt-1">{errors.TkName}</div>
//         )}
//       </div>
//       {/* Ngày sinh */}
//       <div className="mb-4">
//         <label className="block mb-1">Ngày sinh</label>
//         <input
//           type="date"
//           name="ngaysinh"
//           value={form.ngaysinh}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//         />
//       </div>
//       {/* Quốc gia */}
//       <div className="mb-4">
//         <label className="block mb-1">Quốc gia</label>
//         <input
//           type="text"
//           name="quocgia"
//           value={form.quocgia}
//           onChange={handleChange}
//           placeholder="Ví dụ: Việt Nam"
//           className="w-full border px-3 py-2 rounded"
//         />
//       </div>

//       {/* 🔹 Dropdown lĩnh vực */}
//       <div className="mb-4">
//         <label className="block mb-1">Lĩnh vực</label>
//         <select
//           name="linhvucID"
//           value={form.linhvucID}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         >
//           <option value="">-- Chọn lĩnh vực --</option>
//           {linhvucs.map((lv) => (
//             <option key={lv.lvid} value={lv.lvid}>
//               {lv.lvName}
//             </option>
//           ))}
//         </select>
//         {errors.LinhvucID && (
//           <div className="text-red-500 text-sm mt-1">{errors.LinhvucID}</div>
//         )}
//       </div>

//       <button
//         type="submit"
//         className="w-full bg-primary text-white py-2 rounded cursor-pointer hover:bg-blue-700"
//       >
//         Đăng ký
//       </button>

//       <div className="mt-4 text-center">
//         <span>Đã có tài khoản? </span>
//         <Link to="/login" className="text-accent underline">
//           Đăng nhập
//         </Link>
//       </div>
//     </form>

//     <Footer />
//     </>
//   );
// }

// export default SignupPage;








// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { variables } from "../../variables";
// import Navbar from "../../components/navbar";
// import Footer from "../../components/footer";

// function SignupPage() {
//   const [form, setForm] = useState({
//     username: "",
//     phone: "",
//     email: "",
//     password: "",
//     uvname: "",
//     ngaysinh: "",
//     quocgia: "",
//     linhvucID: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [linhvucs, setLinhvucs] = useState([]);
//   const navigate = useNavigate();

//   // 🔹 Lấy danh sách lĩnh vực
//   useEffect(() => {
//     const fetchLinhVucs = async () => {
//       try {
//         const res = await fetch(variables.API_URL + "LinhVuc/list");
//         const data = await res.json();
//         setLinhvucs(data.Data || data.data || []);
//       } catch (err) {
//         console.error("Lỗi tải lĩnh vực:", err);
//       }
//     };
//     fetchLinhVucs();
//   }, []);

//   // 🔹 Gán giá trị khi nhập form
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//     setErrors({ ...errors, [name]: "" });
//   };

//   // 🔹 Xử lý submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});

//     try {
//       const res = await fetch(variables.API_URL + "Register/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           TkName: form.username,
//           Sdt: form.phone,
//           Mail: form.email,
//           Password: form.password,
//           LinhvucID: parseInt(form.linhvucID),
//           UvName: form.uvname,
//           NgaySinh: form.ngaysinh,
//           QuocGia: form.quocgia,
//         }),
//       });

//       const data = await res.json();

//       // Nếu lỗi từ backend
//       if (!res.ok) {
//         if (data.errors) {
//           const newErrors = {};
//           Object.keys(data.errors).forEach((key) => {
//             newErrors[key] = data.errors[key][0];
//           });
//           setErrors(newErrors);
//         } else if (data.message) {
//           alert(data.message);
//         }
//         return;
//       }

//       // Thành công
//       alert("Đăng ký thành công!");
//       navigate("/login");

//     } catch (err) {
//       console.error(err);
//       alert("Có lỗi xảy ra, vui lòng thử lại!");
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <form
//         onSubmit={handleSubmit}
//         className="max-w-md mx-auto p-6 bg-white rounded shadow mt-6"
//       >
//         <h2 className="text-2xl font-bold mb-4">Đăng ký ứng viên</h2>

//         {/* Username */}
//         <div className="mb-4">
//           <label className="block mb-1">Tên tài khoản</label>
//           <input
//             type="text"
//             name="username"
//             value={form.username}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//           {errors.TkName && (
//             <div className="text-red-500 text-sm mt-1">{errors.TkName}</div>
//           )}
//         </div>

//         {/* Phone */}
//         <div className="mb-4">
//           <label className="block mb-1">Số điện thoại</label>
//           <input
//             type="text"
//             name="phone"
//             value={form.phone}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//           {errors.Sdt && (
//             <div className="text-red-500 text-sm mt-1">{errors.Sdt}</div>
//           )}
//         </div>

//         {/* Email */}
//         <div className="mb-4">
//           <label className="block mb-1">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//           {errors.Mail && (
//             <div className="text-red-500 text-sm mt-1">{errors.Mail}</div>
//           )}
//         </div>

//         {/* Password */}
//         <div className="mb-4">
//           <label className="block mb-1">Mật khẩu</label>
//           <input
//             type="password"
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//           {errors.Password && (
//             <div className="text-red-500 text-sm mt-1">{errors.Password}</div>
//           )}
//         </div>

//         {/* Tên ứng viên */}
//         <div className="mb-4">
//           <label className="block mb-1">Tên ứng viên</label>
//           <input
//             type="text"
//             name="uvname"
//             value={form.uvname}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//           {errors.UvName && (
//             <div className="text-red-500 text-sm mt-1">{errors.UvName}</div>
//           )}
//         </div>

//         {/* Ngày sinh */}
//         <div className="mb-4">
//           <label className="block mb-1">Ngày sinh</label>
//           <input
//             type="date"
//             name="ngaysinh"
//             value={form.ngaysinh}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//           />
//         </div>

//         {/* Quốc gia */}
//         <div className="mb-4">
//           <label className="block mb-1">Quốc gia</label>
//           <input
//             type="text"
//             name="quocgia"
//             value={form.quocgia}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             placeholder="Ví dụ: Việt Nam"
//           />
//         </div>

//         {/* Lĩnh vực */}
//         <div className="mb-4">
//           <label className="block mb-1">Lĩnh vực</label>
//           <select
//             name="linhvucID"
//             value={form.linhvucID}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             required
//           >
//             <option value="">-- Chọn lĩnh vực --</option>
//             {linhvucs.map((lv) => (
//               <option key={lv.lvid} value={lv.lvid}>
//                 {lv.lvName}
//               </option>
//             ))}
//           </select>

//           {errors.LinhvucID && (
//             <div className="text-red-500 text-sm mt-1">{errors.LinhvucID}</div>
//           )}
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full bg-primary text-white py-2 rounded cursor-pointer hover:bg-blue-700"
//         >
//           Đăng ký
//         </button>

//         {/* Link đăng nhập */}
//         <div className="mt-4 text-center">
//           <span>Đã có tài khoản? </span>
//           <Link to="/login" className="text-accent underline">
//             Đăng nhập
//           </Link>
//         </div>
//       </form>

//       <Footer />
//     </>
//   );
// }

// export default SignupPage;





import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { variables } from "../../variables";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import background from '../../assets/signup.jpg';


function SignupPage() {
  const [form, setForm] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    uvname: "",
    ngaysinh: "",
    quocgia: "",
    linhvucID: "",
  });

  const [errors, setErrors] = useState({});
  const [linhvucs, setLinhvucs] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // 🟢 Nhận dữ liệu từ Google login để fill sẵn form
  useEffect(() => {
    if (location.state) {
      setForm((prev) => ({
        ...prev,
        email: location.state.email || "",
        uvname: location.state.realname || "",
        username: location.state.email || "",
      }));
    }
  }, [location.state]);

  // 🔹 Lấy danh sách lĩnh vực
  useEffect(() => {
    const fetchLinhVucs = async () => {
      try {
        const res = await fetch(variables.API_URL + "LinhVuc/list");
        const data = await res.json();
        setLinhvucs(data.Data || data.data || []);
      } catch (err) {
        console.error("Lỗi tải lĩnh vực:", err);
      }
    };
    fetchLinhVucs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const res = await fetch(variables.API_URL + "Register/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          TkName:  form.username,
          Sdt: form.phone,
          Mail: form.email,
          Password: form.password,
          LinhvucID: parseInt(form.linhvucID),
          UvName: "userweb",
          NgaySinh: form.ngaysinh,
          QuocGia: "Việt Nam",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          const newErrors = {};
          Object.keys(data.errors).forEach((key) => {
            newErrors[key] = data.errors[key][0];
          });
          setErrors(newErrors);
        } else if (data.message) {
          alert(data.message);
        }
        return;
      }

      alert("Đăng ký thành công!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ backgroundImage: `url(${background})` }} className=" bg-center bg-cover bg-no-repeath-full">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 rounded shadow mb-[-1.25rem] bg-white/80"
      >
        <h2 className="text-2xl font-bold mb-4">Đăng ký ứng viên</h2>

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

        {/* Tên ứng viên */}
        {/* <div className="mb-4">
          <label className="block mb-1">Tên ứng viên</label>
          <input
            type="text"
            name="uvname"
            value={form.uvname}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          {errors.UvName && (
            <div className="text-red-500 text-sm mt-1">{errors.UvName}</div>
          )}
        </div> */}

        {/* Ngày sinh */}
        <div className="mb-4">
          <label className="block mb-1">Ngày sinh</label>
          <input
            type="date"
            name="ngaysinh"
            value={form.ngaysinh}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Quốc gia */}
        {/* <div className="mb-4">
          <label className="block mb-1">Quốc gia</label>
          <input
            type="text"
            name="quocgia"
            value={form.quocgia}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Ví dụ: Việt Nam"
          />
        </div> */}

        {/* Lĩnh vực */}
        <div className="mb-4">
          <label className="block mb-1">Lĩnh vực</label>
          <select
            name="linhvucID"
            value={form.linhvucID}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="1">-- Chọn lĩnh vực --</option>
            {linhvucs.map((lv) => (
              <option key={lv.lvid} value={lv.lvid}>
                {lv.lvName}
              </option>
            ))}
          </select>

          {errors.LinhvucID && (
            <div className="text-red-500 text-sm mt-1">{errors.LinhvucID}</div>
          )}
        </div>

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
          <Link to="/login" className="text-accent underline">
            Đăng nhập
          </Link>
        </div>

      </form>
</div>
      <Footer />
    </>
  );
}

export default SignupPage;
