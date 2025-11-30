// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// function LoginPage() {
//   const [form, setForm] = useState({
//     username: '',
//     password: '',
//   });
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Dữ liệu mẫu
//     if (
//       form.username === 'nphuczika@gmail.com' &&
//       form.password === '123'
//     ) {
//       // Lưu username vào localStorage để hiển thị ở homepage
//       localStorage.setItem('username', form.username);
//       navigate('/');
//     } else {
//       setShowModal(true);
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
//         <h2 className="text-2xl font-bold mb-4">Đăng nhập ứng viên</h2>
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
//         <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded cursor-pointer">
//           Đăng nhập
//         </button>
//         <div className="mt-4 text-center">
//           <span>Nếu chưa có tài khoản, </span>
//           <Link to="/register" className="text-blue-500 underline">Đăng ký</Link>
//         </div>
//       </form>
//       {/* Modal báo lỗi */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm bg-opacity-40 z-50">
//           <div className="bg-white p-6 rounded shadow-lg">
//             <h3 className="text-lg font-bold mb-2">Sai thông tin đăng nhập</h3>
//             <p className="mb-4">Vui lòng kiểm tra lại tên tài khoản hoặc mật khẩu.</p>
//             <button
//               className="bg-blue-500 text-white px-4 py-2 rounded"
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

// export default LoginPage;




// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { variables } from '../../variables';

// function LoginPage() {
//   const [form, setForm] = useState({
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
//         credentials: 'include',
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         setModalMsg(data.message || 'Sai thông tin đăng nhập.');
//         setShowModal(true);
//       } else {
//         if (data.role === "UngVien") {
//           localStorage.setItem('tkName', data.tkName);
//           localStorage.setItem('tkId', data.tkId);
//           localStorage.setItem('role', data.role);
//           navigate('/');
//         } else {
//           setModalMsg('Tài khoản này không phải ứng viên.');
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
//         <h2 className="text-2xl font-bold mb-4">Đăng nhập ứng viên</h2>
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
//           <Link to="/register" className="text-accent underline">Đăng ký</Link>
//         </div>
//       </form>
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
//           <div className="bg-white p-6 rounded shadow-lg">
//             <p className="text-lg mb-4">{modalMsg}</p>
//             <button
//               onClick={() => setShowModal(false)}
//               className="bg-primary text-white px-4 py-2 rounded"
//             >
//               Đóng
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default LoginPage;



// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { variables } from "../../variables";
// import Cookies from "js-cookie";
// import Navbar from "../../components/navbar";
// import Footer from "../../components/footer";
// import { GoogleLogin } from "@react-oauth/google";


// function LoginPage() {
//   const [form, setForm] = useState({
//     username: "",
//     password: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [showModal, setShowModal] = useState(false);
//   const [modalMsg, setModalMsg] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//     setErrors({ ...errors, [name]: "" });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});
//     try {
//       const res = await fetch(variables.API_URL + "Register/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           mail: form.username,
//           password: form.password,
//         }),
//         credentials: "include", // Cho phép nhận cookie nếu server set
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setModalMsg(data.message || "Sai thông tin đăng nhập.");
//         setShowModal(true);
//         return;
//       }

//       // ✅ Lưu JWT token vào cookie (hạn 2 giờ)
//       Cookies.set("jwt_token", data.token, {
//         expires: 1 / 12, // 2 giờ
//         secure: true,
//         sameSite: "None", // Cho phép cookie cross-site (frontend khác port backend)
//       });

//       // ✅ Lưu thông tin khác trong localStorage
//       localStorage.setItem("tkName", data.tkName);
//       localStorage.setItem("tkId", data.tkId);
//       localStorage.setItem("role", data.role);

//       // ✅ Kiểm tra role — chỉ cho phép Ứng Viên đăng nhập trang này
//       if (data.role === "UngVien") {
//         navigate("/");
//       } else {
//         setModalMsg("Tài khoản này không phải Ứng Viên.");
//         setShowModal(true);
//       }
//     } catch (err) {
//       console.error(err);
//       setModalMsg("Có lỗi xảy ra, vui lòng thử lại!");
//       setShowModal(true);
//     }
//   };

//   return (
//     <>
//     <Navbar/>
//       <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
//         <h2 className="text-2xl font-bold mb-4">Đăng nhập Ứng Viên</h2>

//         <div className="mb-4">
//           <label className="block mb-1">Tên tài khoản (Email)</label>
//           <input
//             type="text"
//             name="username"
//             value={form.username}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//           {errors.username && (
//             <div className="text-red-500 text-sm mt-1">{errors.username}</div>
//           )}
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
//           {errors.password && (
//             <div className="text-red-500 text-sm mt-1">{errors.password}</div>
//           )}
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-primary text-white py-2 rounded cursor-pointer"
//         >
//           Đăng nhập
//         </button>

//         <div className="mt-4 text-center">
//           <span>Nếu chưa có tài khoản, </span>
//           <Link to="/register" className="text-accent underline">
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
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
//           <div className="bg-white p-6 rounded shadow-lg">
//             <p className="text-lg mb-4">{modalMsg}</p>
//             <button
//               onClick={() => setShowModal(false)}
//               className="bg-primary text-white px-4 py-2 rounded"
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

// export default LoginPage;





import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { variables } from "../../variables";
import Cookies from "js-cookie";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { GoogleLogin } from "@react-oauth/google";
import background from '../../assets/bg.jpg';

function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const res = await fetch(variables.API_URL + "Register/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mail: form.username,
          password: form.password,
        }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        setModalMsg(data.message || "Sai thông tin đăng nhập.");
        setShowModal(true);
        return;
      }

      // Lưu JWT token (2 giờ)
      Cookies.set("jwt_token", data.token, {
        expires: 1 / 12,
        secure: true,
        sameSite: "None",
      });

      // Lưu thông tin vào localStorage
      localStorage.setItem("tkName", data.tkName);
      localStorage.setItem("tkId", data.tkId);
      localStorage.setItem("role", data.role);

      // Chỉ ứng viên mới đăng nhập trang này
      if (data.role === "UngVien") {
        navigate("/");
      } else {
        setModalMsg("Tài khoản này không phải Ứng Viên.");
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
        credentials: "include",   // 🚀 MUST HAVE
      });

      const data = await res.json();

      if (!res.ok) {
        setModalMsg(data.message || "Đăng nhập Google thất bại.");
        setShowModal(true);
        return;
      }

      // User chưa có trong DB -> chuyển sang trang đăng ký
      if (data.requireRegister === true) {
        navigate("/register", {
          state: {
            email: data.email,
            realname: data.realName
          }
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

      navigate("/");
    } catch (error) {
      console.log(error);
      setModalMsg("Không thể đăng nhập bằng Google.");
      setShowModal(true);
    }
  };


  return (
    <>
      <Navbar />
      <div style={{ backgroundImage: `url(${background})` }} className=" bg-center bg-cover bg-no-repeath-full">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 rounded shadow mb-[-1.25rem] bg-white/70"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Đăng nhập Ứng Viên
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1">Tên tài khoản (Email)</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          {errors.username && (
            <div className="text-red-500 text-sm mt-1">{errors.username}</div>
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
          {errors.password && (
            <div className="text-red-500 text-sm mt-1">{errors.password}</div>
          )}
        </div>

        {/* Submit button */}
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
            auto_select={false}   // << NGĂN GOOGLE TỰ LẤY ACCOUNT MẶC ĐỊNH
            prompt="select_account"  // << BẮT BUỘC CHỌN TÀI KHOẢN
          />
        </div>

        {/* Links */}
        <div className="mt-4 text-center">
          <span>Nếu chưa có tài khoản, </span>
          <Link to="/register" className="text-accent underline">
            Đăng ký
          </Link>
        </div>

        <div className="mt-3 text-center">
          <span>Quên mật khẩu? </span>
          <Link to="/reset" className="text-accent underline">
            Đặt lại
          </Link>
        </div>
      </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded shadow-lg min-w-[300px]">
            <p className="text-lg mb-4">{modalMsg}</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-primary text-white px-4 py-2 rounded w-full"
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

export default LoginPage;
