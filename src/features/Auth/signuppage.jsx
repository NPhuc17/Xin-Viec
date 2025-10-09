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





import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { variables } from '../../variables';

function SignupPage() {
  const [form, setForm] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Xóa lỗi khi nhập lại
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const res = await fetch(variables.API_URL + 'Register/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          TkName: form.username,
          Sdt: form.phone,
          Mail: form.email,
          Password: form.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        // Nếu trả về lỗi dạng validation
        if (data.errors) {
          // ASP.NET thường trả về lỗi dạng { field: [msg1, msg2] }
          const newErrors = {};
          Object.keys(data.errors).forEach((key) => {
            newErrors[key] = data.errors[key][0];
          });
          setErrors(newErrors);
        } else if (data.message) {
          alert(data.message);
        }
      } else {
        // Thành công: chuyển về homepage, truyền username
        navigate('/', { state: { username: form.username } });
      }
    } catch (err) {
      alert('Có lỗi xảy ra, vui lòng thử lại!');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Đăng ký ứng viên</h2>
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
          <label className="block mb-1">Số điện thoại</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          {errors.Sdt && <div className="text-red-500 text-sm mt-1">{errors.Sdt}</div>}
        </div>
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
          {errors.Mail && <div className="text-red-500 text-sm mt-1">{errors.Mail}</div>}
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
          Đăng ký
        </button>
        <div className="mt-4 text-center">
          <span>Đã có tài khoản? </span>
          <Link to="/login" className="text-accent underline">Đăng nhập</Link>
        </div>
      </form>
    </>
  );
}

export default SignupPage;