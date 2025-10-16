import React, { useEffect, useState } from "react";
import { variables } from "../../variables";

function Kinhnghiem() {
  const [kinhnghiems, setKinhnghiems] = useState([]);
  const [form, setForm] = useState({ knName: "" });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  const API_URL = variables.API_URL + "KinhNghiem/";

  // 🔹 Load danh sách
  const loadData = async () => {
    try {
      const res = await fetch(API_URL + "list");
      const data = await res.json();
      setKinhnghiems(data.data || data.Data || []);
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

  // 🔹 Thêm hoặc cập nhật
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.knName.trim()) {
      alert("⚠️ Tên kinh nghiệm không được để trống!");
      return;
    }

    const method = editId ? "PUT" : "POST";
    const url = editId ? API_URL + `update/${editId}` : API_URL + "add";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ knName: form.knName }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        alert(data.Message || (editId ? "✅ Cập nhật thành công!" : "✅ Thêm mới thành công!"));
        setForm({ knName: "" });
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
  const handleEdit = (kn) => {
    setForm({ knName: kn.knName });
    setEditId(kn.knid);
    alert("📝 Đang chỉnh sửa kinh nghiệm: " + kn.knName);
  };

  // 🔹 Xóa
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa kinh nghiệm này?")) return;

    try {
      const res = await fetch(API_URL + "delete/" + id, {
        method: "DELETE",
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        alert(data.Message || "❌ Không thể xóa! Có thể đang được sử dụng trong tin tuyển dụng.");
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
      <h2 className="text-2xl font-bold mb-4">Quản lý kinh nghiệm</h2>

      {/* Form thêm/sửa */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-4 mb-6 flex gap-4 items-end"
      >
        <div className="flex-1">
          <label className="block text-gray-600 mb-1">Tên kinh nghiệm</label>
          <input
            type="text"
            name="knName"
            value={form.knName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Nhập tên kinh nghiệm..."
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
              setForm({ knName: "" });
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
            <th className="border px-4 py-2 text-left">Tên kinh nghiệm</th>
            <th className="border px-4 py-2 text-center w-40">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {kinhnghiems.length > 0 ? (
            kinhnghiems.map((kn) => (
              <tr key={kn.knid} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{kn.knid}</td>
                <td className="border px-4 py-2">{kn.knName}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleEdit(kn)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(kn.knid)}
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
                Không có kinh nghiệm nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Kinhnghiem;
