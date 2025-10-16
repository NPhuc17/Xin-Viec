import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { variables } from "../../variables";

function Employersignuppage() {
  const [form, setForm] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    ntdName: "",
    ctID: "", // chọn công ty
  });
  const [companies, setCompanies] = useState([]); // danh sách công ty
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // 🔹 Load danh sách công ty
  useEffect(() => {
  const loadCompanies = async () => {
    try {
      const res = await fetch(variables.API_URL + "CongTy/list");
      const data = await res.json();
      if (res.ok) {
        setCompanies(data.data || []); // ✅ dùng "data.data"
      } else {
        alert(data.message || "Không thể tải danh sách công ty!");
      }
    } catch (err) {
      console.error("Lỗi tải công ty:", err);
      alert("Lỗi kết nối server khi tải danh sách công ty!");
    }
  };
  loadCompanies();
}, []);

  // 🔹 Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" }); // clear lỗi khi nhập lại
  };

  // 🔹 Gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const res = await fetch(variables.API_URL + "Register/register-ntd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          TkName: form.username,
          Sdt: form.phone,
          Mail: form.email,
          Password: form.password,
          NtdName: form.ntdName,
          CtID: form.ctID ? Number(form.ctID) : null,
        }),
      });

      const text = await res.text(); // tránh lỗi Unexpected end of JSON input
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
          alert("Đăng ký thất bại, vui lòng kiểm tra lại thông tin!");
        }
        return;
      }

      alert(data.Message || "Đăng ký thành công!");
      navigate("/employer", { state: { username: form.username } });
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded shadow"
    >
      <h2 className="text-2xl font-bold mb-4">Đăng ký nhà tuyển dụng</h2>

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

      <div className="mb-4">
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
      </div>

      <div className="mb-4">
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
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded cursor-pointer"
      >
        Đăng ký
      </button>

      <div className="mt-4 text-center">
        <span>Đã có tài khoản? </span>
        <Link to="/employer/login" className="text-accent underline">
          Đăng nhập
        </Link>
      </div>
    </form>
  );
}

export default Employersignuppage;
