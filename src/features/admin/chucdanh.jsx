import React, { useEffect, useState } from "react";
import { variables } from "../../variables";

function Chucdanh() {
  const [chucdanhs, setChucdanhs] = useState([]);
  const [form, setForm] = useState({ cdName: "" });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  const API_URL = variables.API_URL + "ChucDanh/";

  // 🔹 Load danh sách
  const loadData = async () => {
    try {
      const res = await fetch(API_URL + "list");
      const data = await res.json();
      setChucdanhs(data.data || data.Data || []);
    } catch (err) {
      console.error("Lỗi load:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 🔹 Xử lý thay đổi input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Gửi form (thêm hoặc cập nhật)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.cdName.trim()) {
      alert("⚠️ Tên chức danh không được để trống!");
      return;
    }

    const method = editId ? "PUT" : "POST";
    const url = editId ? API_URL + `update/${editId}` : API_URL + "add";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cdName: form.cdName }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        alert(data.Message || "✅ Thao tác thành công!");
        setForm({ cdName: "" });
        setEditId(null);
        loadData();
      } else {
        alert(data.Message || "❌ Thao tác thất bại! Vui lòng thử lại.");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Lỗi kết nối server: " + err.message);
    }
  };

  // 🔹 Chỉnh sửa
  const handleEdit = (cd) => {
    setForm({ cdName: cd.cdName });
    setEditId(cd.cdid);
    alert("📝 Đang chỉnh sửa chức danh: " + cd.cdName);
  };

  // 🔹 Xóa
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa chức danh này?")) return;

    try {
      const res = await fetch(API_URL + `delete/${id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data.Message) alert("❌ " + data.Message);
        else alert("❌ Lỗi không xác định từ server.");
        return;
      }

      alert("✅ Xóa thành công!");
      loadData();
    } catch (err) {
      alert("⚠️ Lỗi kết nối server: " + err.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Quản lý chức danh</h2>

      {/* Form thêm/sửa */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-4 mb-6 flex gap-4 items-end"
      >
        <div className="flex-1">
          <label className="block text-gray-600 mb-1">Tên chức danh</label>
          <input
            type="text"
            name="cdName"
            value={form.cdName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Nhập tên chức danh..."
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary"
        >
          {editId ? "Cập nhật" : "Thêm mới"}
        </button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setForm({ cdName: "" });
            }}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Hủy
          </button>
        )}
      </form>

      {/* Thông báo */}
      {message && (
        <div className="mb-4 text-accent font-semibold">{message}</div>
      )}

      {/* Bảng danh sách */}
      <table className="min-w-full bg-white border rounded shadow">
        <thead className="bg-blue-100">
          <tr>
            <th className="border px-4 py-2 text-left w-20">ID</th>
            <th className="border px-4 py-2 text-left">Tên chức danh</th>
            <th className="border px-4 py-2 text-center w-40">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {chucdanhs.length > 0 ? (
            chucdanhs.map((cd) => (
              <tr key={cd.cdid} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{cd.cdid}</td>
                <td className="border px-4 py-2">{cd.cdName}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleEdit(cd)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(cd.cdid)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                className="text-center text-gray-500 py-4 italic"
              >
                Không có chức danh nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Chucdanh;
