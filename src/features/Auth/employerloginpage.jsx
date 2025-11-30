// import React from 'react'
// import { Link, useNavigate } from 'react-router-dom';
// import { variables } from '../../variables';
// import { useState } from 'react';

// function Employerloginpage() {
//  const [form, setForm] = useState({
//     username: '',
//     password: '',
//   });
//   const [errors, setErrors] = useState({});
//   const [showModal, setShowModal] = useState(false);
//   const [modalMsg, setModalMsg] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//     setErrors({ ...errors, [name]: '' });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});
//     try {
//       const res = await fetch(variables.API_URL + 'Register/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           mail: form.username,
//           password: form.password,
//         }),
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         if (data.errors) {
//           // Ghép tất cả lỗi thành một chuỗi để hiển thị trong modal
//           const errorMsgs = Object.values(data.errors)
//             .map(arr => arr.join(', '))
//             .join('\n');
//           setModalMsg(errorMsgs);
//           setShowModal(true);
//         } else if (data.message) {
//           setModalMsg(data.message);
//           setShowModal(true);
//         } else {
//           setModalMsg('Sai thông tin đăng nhập. Vui lòng kiểm tra lại.');
//           setShowModal(true);
//         }
//       } else {
//         // Lưu username vào localStorage để hiển thị ở homepage
//         localStorage.setItem('username', form.username);
//         navigate('/employer');
//       }
//     } catch (err) {
//       setModalMsg('Có lỗi xảy ra, vui lòng thử lại!');
//       setShowModal(true);
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
//         <h2 className="text-2xl font-bold mb-4">Đăng nhập nhà tuyển dụng</h2>
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
//           {errors.TkName && <div className="text-red-500 text-sm mt-1">{errors.TkName}</div>}
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
//           {errors.Password && <div className="text-red-500 text-sm mt-1">{errors.Password}</div>}
//         </div>
//         <button type="submit" className="w-full bg-primary text-white py-2 rounded cursor-pointer">
//           Đăng nhập
//         </button>
//         <div className="mt-4 text-center">
//           <span>Nếu chưa có tài khoản, </span>
//           <Link to="/employer/register" className="text-accent underline">Đăng ký</Link>
//         </div>
//       </form>
//       {/* Modal báo lỗi */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm bg-opacity-40 z-50">
//           <div className="bg-white p-6 rounded shadow-lg">
//             <h3 className="text-lg font-bold mb-2">Đăng nhập thất bại</h3>
//             <p className="mb-4">{modalMsg}</p>
//             <button
//               className="bg-primary text-white px-4 py-2 rounded"
//               onClick={() => setShowModal(false)}
//             >
//               Đóng
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Employerloginpage


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { variables } from '../../variables';
// import { Cookies } from 'react-cookie';

// function Employerloginpage() {
//   const [form, setForm] = useState({ username: '', password: '' });
//   const [errors, setErrors] = useState({});
//   const [showModal, setShowModal] = useState(false);
//   const [modalMsg, setModalMsg] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//     setErrors({ ...errors, [name]: '' });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});
//     try {
//       const res = await fetch(variables.API_URL + 'Register/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({
//           mail: form.username,
//           password: form.password,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setModalMsg(data.message || 'Sai thông tin đăng nhập.');
//         setShowModal(true);
//       } else {
//         if (data.role === "NhaTuyenDung") {
//           localStorage.setItem('tkName', data.tkName);
//           localStorage.setItem('tkId', data.tkId);
//           localStorage.setItem('role', data.role);

//           navigate('/employer');
//         } else {
//           setModalMsg('Tài khoản này không phải nhà tuyển dụng.');
//           setShowModal(true);
//         }
//       }
//     } catch (err) {
//       console.error(err);
//       setModalMsg('Có lỗi xảy ra, vui lòng thử lại!');
//       setShowModal(true);
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
//         <h2 className="text-2xl font-bold mb-4">Đăng nhập nhà tuyển dụng</h2>

//         <div className="mb-4">
//           <label className="block mb-1">Tên đăng nhập (Email)</label>
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

//         <button type="submit" className="w-full bg-primary text-white py-2 rounded cursor-pointer">
//           Đăng nhập
//         </button>

//         <div className="mt-4 text-center">
//           <span>Nếu chưa có tài khoản, </span>
//           <Link to="/employer/register" className="text-accent underline">
//             Đăng ký
//           </Link>
//         </div>
//       </form>

//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
//           <div className="bg-white p-6 rounded shadow-lg">
//             <h3 className="text-lg font-bold mb-2">Thông báo</h3>
//             <p className="mb-4">{modalMsg}</p>
//             <button
//               className="bg-primary text-white px-4 py-2 rounded"
//               onClick={() => setShowModal(false)}
//             >
//               Đóng
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Employerloginpage;






  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await fetch(variables.API_URL + "Register/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       credentials: "include",
  //       body: JSON.stringify({
  //         mail: form.username,
  //         password: form.password,
  //       }),
  //     });

  //     const data = await res.json();

  //     if (!res.ok) {
  //       setModalMsg(data.message || "Sai thông tin đăng nhập.");
  //       setShowModal(true);
  //       return;
  //     }

  //     // ✅ Lưu token vào cookie (thời hạn 2h)
  //     Cookies.set("jwt_token", data.token, {
  //       expires: 1 / 12, // 2h
  //       secure: true,
  //       sameSite: "None",
  //     });

  //     // ✅ Lưu thông tin khác trong localStorage
  //     localStorage.setItem("tkName", data.tkName);
  //     localStorage.setItem("tkId", data.tkId);
  //     localStorage.setItem("role", data.role);
     

  //     if (data.role === "NhaTuyenDung") {
  //       navigate("/employer");
  //     } else {
  //       setModalMsg("Tài khoản này không phải nhà tuyển dụng.");
  //       setShowModal(true);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     setModalMsg("Có lỗi xảy ra, vui lòng thử lại!");
  //     setShowModal(true);
  //   }
  // };

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { variables } from "../../variables";
// import Cookies from "js-cookie";
// import EmployerNavbar from "../../components/employernavbar";
// import Footer from "../../components/footer";

// function Employerloginpage() {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [showModal, setShowModal] = useState(false);
//   const [modalMsg, setModalMsg] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };


//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const res = await fetch(variables.API_URL + "Register/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({
//         mail: form.username,
//         password: form.password,
//       }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       setModalMsg(data.message || "Sai thông tin đăng nhập.");
//       setShowModal(true);
//       return;
//     }

//     // ✅ Lưu token vào cookie
//     Cookies.set("jwt_token", data.token, {
//       expires: 1 / 12, // 2h
//       secure: true,
//       sameSite: "None",
//     });

//     // ✅ Lưu thông tin khác trong localStorage
//     localStorage.setItem("tkName", data.tkName);
//     localStorage.setItem("tkId", data.tkId);
//     localStorage.setItem("role", data.role);
//     localStorage.setItem("ctID", data.ctID);

//     // ✅ Lưu thông tin công ty
//     if (data.role === "NhaTuyenDung") {

//       navigate("/employer");
//     } else {
//       setModalMsg("Tài khoản này không phải nhà tuyển dụng.");
//       setShowModal(true);
//     }
//   } catch (err) {
//     console.error(err);
//     setModalMsg("Có lỗi xảy ra, vui lòng thử lại!");
//     setShowModal(true);
//   }
// };

//   async function handleLogin() {
//     const res = await fetch(variables.API_URL + "Auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ mail, password }),
//     });

//     const data = await res.json();

//     if (res.ok && data.token) {
//       // Lưu token vào cookie (an toàn hơn localStorage)
//       Cookies.set("token", data.token, { expires: 1 }); // hết hạn 1 ngày
//       localStorage.setItem("role", data.role); // lưu role để kiểm tra quyền
//       navigate("/employer/postjob"); // chuyển đến trang đăng tin
//     } else {
//       alert(data.Message || "Đăng nhập thất bại");
//     }
//   };
//   return (
//     <>
//     <EmployerNavbar />
//       <form
//         onSubmit={handleSubmit}
//         className="max-w-md mx-auto p-6 bg-white rounded shadow"
//       >
//         <h2 className="text-2xl font-bold mb-4">Đăng nhập nhà tuyển dụng</h2>

//         <div className="mb-4">
//           <label className="block mb-1">Tên đăng nhập (Email)</label>
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

//         <button
//           type="submit"
//           className="w-full bg-primary text-white py-2 rounded cursor-pointer"
//         >
//           Đăng nhập
//         </button>

//         <div className="mt-4 text-center">
//           <span>Nếu chưa có tài khoản, </span>
//           <Link to="/employer/register" className="text-accent underline">
//             Đăng ký
//           </Link>
//         </div>

//         <div className="mt-4 text-center">
//           <span>Quên mật khẩu? </span>
//           <Link to="/reset" className="text-accent underline">
//             Đặt lại
//           </Link>
//         </div>
//       </form>

//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
//           <div className="bg-white p-6 rounded shadow-lg">
//             <h3 className="text-lg font-bold mb-2">Thông báo</h3>
//             <p className="mb-4">{modalMsg}</p>
//             <button
//               className="bg-primary text-white px-4 py-2 rounded"
//               onClick={() => setShowModal(false)}
//             >
//               Đóng
//             </button>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </>
//   );
// }

// export default Employerloginpage;





import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { variables } from "../../variables";
import Cookies from "js-cookie";
import EmployerNavbar from "../../components/employernavbar";
import Footer from "../../components/footer";
import { GoogleLogin } from "@react-oauth/google";
import background from '../../assets/bg.jpg';


function Employerloginpage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Login thông thường
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(variables.API_URL + "Register/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          mail: form.username,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setModalMsg(data.message || "Sai thông tin đăng nhập.");
        setShowModal(true);
        return;
      }

      Cookies.set("jwt_token", data.token, {
        expires: 1 / 12, // ~2 giờ
        secure: true,
        sameSite: "None",
      });

      localStorage.setItem("tkName", data.tkName);
      localStorage.setItem("tkId", data.tkId);
      localStorage.setItem("role", data.role);
      localStorage.setItem("ctID", data.ctID);

      if (data.role === "NhaTuyenDung") {
        navigate("/employer");
      } else {
        setModalMsg("Tài khoản này không phải Nhà Tuyển Dụng.");
        setShowModal(true);
      }
    } catch (err) {
      console.error(err);
      setModalMsg("Có lỗi xảy ra, vui lòng thử lại!");
      setShowModal(true);
    }
  };

  // Google Login callback
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await fetch(variables.API_URL + "Register/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        setModalMsg(data.message || "Đăng nhập Google thất bại.");
        setShowModal(true);
        return;
      }

      // Nếu chưa có trong DB -> chuyển sang đăng ký Employer
      if (data.requireRegister === true) {
        navigate("/employer/register", {
          state: {
            email: data.email,
            realname: data.realName,
          },
        });
        return;
      }

      // User đã tồn tại -> lưu info
      Cookies.set("jwt_token", data.token, {
        expires: 1 / 12,
        secure: true,
        sameSite: "None",
      });

      localStorage.setItem("tkName", data.tkName);
      localStorage.setItem("tkId", data.tkId);
      localStorage.setItem("role", data.role);
      localStorage.setItem("ctID", data.ctID);

      if (data.role === "NhaTuyenDung") {
        navigate("/employer");
      } else {
        setModalMsg("Tài khoản Google này không phải Nhà Tuyển Dụng.");
        setShowModal(true);
      }
    } catch (err) {
      console.error(err);
      setModalMsg("Không thể đăng nhập bằng Google.");
      setShowModal(true);
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
        <h2 className="text-2xl font-bold mb-4 text-center">
          Đăng nhập Nhà Tuyển Dụng
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1">Tên đăng nhập (Email)</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
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
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded cursor-pointer"
        >
          Đăng nhập
        </button>

        {/* Divider */}
        <div className="text-center my-4 text-gray-500">Hoặc</div>

        {/* Google Login */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              setModalMsg("Google Sign-In thất bại.");
              setShowModal(true);
            }}
            useOneTap={false}
            auto_select={false}
            prompt="select_account"
          />
        </div>

        <div className="mt-4 text-center">
          <span>Nếu chưa có tài khoản, </span>
          <Link to="/employer/register" className="text-accent underline">
            Đăng ký
          </Link>
        </div>

        <div className="mt-4 text-center">
          <span>Quên mật khẩu? </span>
          <Link to="/reset" className="text-accent underline">
            Đặt lại
          </Link>
        </div>
      </form>
</div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded shadow-lg min-w-[300px]">
            <p className="text-lg mb-4">{modalMsg}</p>
            <button
              className="bg-primary text-white px-4 py-2 rounded w-full"
              onClick={() => setShowModal(false)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Employerloginpage;

