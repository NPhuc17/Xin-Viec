import React, { useState, useEffect } from "react";

function ViTri() {
  const apiUrl = "https://localhost:7144/api/ViTri";
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ vtName: "" });
  const [editingId, setEditingId] = useState(null);

  // 🌀 Load danh sách vị trí
  const loadData = async () => {
    try {
      const res = await fetch(`${apiUrl}/list`);
      const data = await res.json();
      setList(data.data || []);
    } catch (err) {
      console.error("Lỗi khi tải danh sách:", err);
      alert("Không thể tải danh sách vị trí!");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 💾 Submit (Thêm / Cập nhật)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.vtName.trim()) {
      alert("Tên vị trí không được để trống!");
      return;
    }

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `${apiUrl}/update/${editingId}`
        : `${apiUrl}/add`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.Message || "Thao tác thất bại!");
        return;
      }

      alert(data.Message || (editingId ? "Cập nhật thành công!" : "Thêm vị trí thành công!"));
      setForm({ vtName: "" });
      setEditingId(null);
      loadData();
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra khi gửi yêu cầu!");
    }
  };

  // ✏️ Sửa
  const handleEdit = (item) => {
    setForm({ vtName: item.vtName });
    setEditingId(item.vtid);
  };

  // ❌ Xóa
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa vị trí này?")) return;

    try {
      const res = await fetch(`${apiUrl}/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.Message || "Không thể xóa vị trí!");
        return;
      }

      alert(data.Message);
      loadData();
    } catch (err) {
      console.error(err);
      alert("Lỗi khi xóa vị trí!");
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Quản lý Vị trí</h2>

      {/* Form thêm / sửa */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-4 mb-6 border p-4 rounded-lg bg-gray-50"
      >
        <input
          type="text"
          name="vtName"
          placeholder="Nhập tên vị trí..."
          value={form.vtName}
          onChange={(e) => setForm({ ...form, vtName: e.target.value })}
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Cập nhật" : "Thêm mới"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({ vtName: "" });
            }}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Hủy
          </button>
        )}
      </form>

      {/* Bảng danh sách */}
      <table className="w-full border-collapse border text-left">
        <thead className="bg-blue-100">
          <tr>
            <th className="border px-4 py-2 w-20 text-center">ID</th>
            <th className="border px-4 py-2">Tên vị trí</th>
            <th className="border px-4 py-2 w-40 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {list.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center py-3">
                Chưa có vị trí nào.
              </td>
            </tr>
          ) : (
            list.map((item) => (
              <tr key={item.vtid} className="hover:bg-gray-50">
                <td className="border px-4 py-2 text-center">{item.vtid}</td>
                <td className="border px-4 py-2">{item.vtName}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:underline mr-3"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(item.vtid)}
                    className="text-red-600 hover:underline"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ViTri;
