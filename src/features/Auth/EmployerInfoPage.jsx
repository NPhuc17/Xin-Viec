import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { variables } from '../../variables';

function EmployerInfoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username || '';

  const [form, setForm] = useState({
    tenNhaTuyenDung: '',
    tenCongTy: '',
    diaChi: '',
    logo: null,
    moTa: '',
    moHinh: '',
    soNhanVien: '',
    quocGia: '',
    nguoiLienHe: '',
    sdtNguoiLienHe: '',
    maThue: '',
    sdtCongTy: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, logo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in form) formData.append(key, form[key]);
    formData.append('username', username);

    try {
      const res = await fetch(variables.API_URL + 'EmployerInfo/create', {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        alert('Cập nhật thông tin thành công!');
        navigate('/'); // hoặc navigate('/employer/dashboard')
      } else {
        alert('Có lỗi xảy ra khi lưu thông tin!');
      }
    } catch (err) {
      alert('Không thể kết nối server.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-primary">Thông tin nhà tuyển dụng</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Tên nhà tuyển dụng</label>
          <input
            type="text"
            name="tenNhaTuyenDung"
            value={form.tenNhaTuyenDung}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Tên công ty</label>
          <input
            type="text"
            name="tenCongTy"
            value={form.tenCongTy}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Địa chỉ</label>
          <input
            type="text"
            name="diaChi"
            value={form.diaChi}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Logo công ty</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block mb-1">Miêu tả</label>
          <textarea
            name="moTa"
            value={form.moTa}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          ></textarea>
        </div>

        <div>
          <label className="block mb-1">Mô hình</label>
          <input
            type="text"
            name="moHinh"
            value={form.moHinh}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Số nhân viên</label>
          <input
            type="number"
            name="soNhanVien"
            value={form.soNhanVien}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Quốc gia</label>
          <input
            type="text"
            name="quocGia"
            value={form.quocGia}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Người liên hệ</label>
          <input
            type="text"
            name="nguoiLienHe"
            value={form.nguoiLienHe}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">SĐT người liên hệ</label>
          <input
            type="text"
            name="sdtNguoiLienHe"
            value={form.sdtNguoiLienHe}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Mã thuế</label>
          <input
            type="text"
            name="maThue"
            value={form.maThue}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">SĐT công ty</label>
          <input
            type="text"
            name="sdtCongTy"
            value={form.sdtCongTy}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button type="submit" className="w-full bg-primary text-white py-2 rounded cursor-pointer">
          Lưu thông tin
        </button>
      </form>
    </div>
  );
}

export default EmployerInfoPage;
