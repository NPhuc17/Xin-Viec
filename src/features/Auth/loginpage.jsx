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




import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { variables } from '../../variables';

function LoginPage() {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
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
        body: JSON.stringify({
          mail: form.username,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.errors) {
          // Ghép tất cả lỗi thành một chuỗi để hiển thị trong modal
          const errorMsgs = Object.values(data.errors)
            .map(arr => arr.join(', '))
            .join('\n');
          setModalMsg(errorMsgs);
          setShowModal(true);
        } else if (data.message) {
          setModalMsg(data.message);
          setShowModal(true);
        } else {
          setModalMsg('Sai thông tin đăng nhập. Vui lòng kiểm tra lại.');
          setShowModal(true);
        }
      } else {
        // Lưu username vào localStorage để hiển thị ở homepage
        localStorage.setItem('username', form.username);
        navigate('/');
      }
    } catch (err) {
      setModalMsg('Có lỗi xảy ra, vui lòng thử lại!');
      setShowModal(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Đăng nhập ứng viên</h2>
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
          {errors.TkName && <div className="text-red-500 text-sm mt-1">{errors.TkName}</div>}
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
          {errors.Password && <div className="text-red-500 text-sm mt-1">{errors.Password}</div>}
        </div>
        <button type="submit" className="w-full bg-primary text-white py-2 rounded cursor-pointer">
          Đăng nhập
        </button>
        <div className="mt-4 text-center">
          <span>Nếu chưa có tài khoản, </span>
          <Link to="/register" className="text-accent underline">Đăng ký</Link>
        </div>
      </form>
      {/* Modal báo lỗi */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-2">Đăng nhập thất bại</h3>
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

export default LoginPage;