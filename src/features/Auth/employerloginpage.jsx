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


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { variables } from '../../variables';

function Employerloginpage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const res = await fetch(variables.API_URL + 'Register/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          mail: form.username,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setModalMsg(data.message || 'Sai thông tin đăng nhập.');
        setShowModal(true);
      } else {
        if (data.role === "NhaTuyenDung") {
          localStorage.setItem('tkName', data.tkName);
          localStorage.setItem('tkId', data.tkId);
          localStorage.setItem('role', data.role);
          
          navigate('/employer');
        } else {
          setModalMsg('Tài khoản này không phải nhà tuyển dụng.');
          setShowModal(true);
        }
      }
    } catch (err) {
      console.error(err);
      setModalMsg('Có lỗi xảy ra, vui lòng thử lại!');
      setShowModal(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Đăng nhập nhà tuyển dụng</h2>

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

        <button type="submit" className="w-full bg-primary text-white py-2 rounded cursor-pointer">
          Đăng nhập
        </button>

        <div className="mt-4 text-center">
          <span>Nếu chưa có tài khoản, </span>
          <Link to="/employer/register" className="text-accent underline">
            Đăng ký
          </Link>
        </div>
      </form>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-2">Thông báo</h3>
            <p className="mb-4">{modalMsg}</p>
            <button
              className="bg-primary text-white px-4 py-2 rounded"
              onClick={() => setShowModal(false)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Employerloginpage;
