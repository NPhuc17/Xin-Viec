import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SignupPage() {
  const [form, setForm] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý đăng ký ở đây (gửi dữ liệu lên server)
    console.log(form);
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
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
          Đăng ký
        </button>
        <div className="mt-4 text-center">
          <span>Đã có tài khoản? </span>
          <Link to="/login" className="text-blue-500 underline">Đăng nhập</Link>
        </div>
      </form>
    </>
  );
}

export default SignupPage;