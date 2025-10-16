import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { variables } from "../../variables";

function Company() {
  const API_URL = variables.API_URL + "CongTy/";
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  // 🔹 Load danh sách công ty
  const loadData = async () => {
    try {
      const res = await fetch(API_URL + "list");
      const data = await res.json();
      if (res.ok) {
        setCompanies(data.data || []); // ✅ sửa "Data" → "data"
      } else {
        alert(data.message || "Không thể tải danh sách công ty!");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối server!");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 🔹 Xóa công ty
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa công ty này không?")) return;

    try {
      const res = await fetch(API_URL + `delete/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        alert(data.Message || "Xóa thành công!");
        loadData();
      } else {
        alert(data.Message || "Xóa thất bại!");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối server!");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Quản lý công ty</h2>

      <table className="w-full border-collapse border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Tên công ty</th>
            <th className="border p-2">Quốc gia</th>
            <th className="border p-2">Người liên hệ</th>
            <th className="border p-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {companies.length > 0 ? (
            companies.map((ct) => (
              <tr key={ct.ctid}>
                <td className="border p-2 text-center">{ct.ctid}</td>
                <td className="border p-2">{ct.ctName}</td>
                <td className="border p-2">{ct.quocGia || "-"}</td>
                <td className="border p-2">{ct.nguoiLienHe || "-"}</td>
                <td className="border p-2 text-center">
                  <button
                    className="bg-primary text-white px-3 py-1 rounded mr-2 hover:bg-blue-700"
                    onClick={() => navigate(`/admin/companydetail/${ct.ctid}`)}
                  >
                    Xem chi tiết
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    onClick={() => handleDelete(ct.ctid)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-3 text-gray-500">
                Chưa có công ty nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Company;
