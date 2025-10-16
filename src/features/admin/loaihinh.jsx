import React, { useState, useEffect } from "react";

function LoaiHinhLamViec() {
  const apiUrl = "https://localhost:7144/api/LoaiHinhLamViec";
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ lhName: "" });
  const [editingId, setEditingId] = useState(null);

  // Load danh sách
  const loadData = async () => {
    try {
      const res = await fetch(`${apiUrl}/list`);
      const data = await res.json();
      setList(data.data || []);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
      alert("Không thể tải danh sách loại hình!");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Xử lý submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.lhName.trim()) {
      alert("Tên loại hình không được để trống!");
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

      alert(data.Message || (editingId ? "Cập nhật thành công!" : "Thêm thành công!"));
      setForm({ lhName: "" });
      setEditingId(null);
      loadData();
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra khi gửi yêu cầu!");
    }
  };

  // Chỉnh sửa
  const handleEdit = (item) => {
    setForm({ lhName: item.lhName });
    setEditingId(item.lhid);
  };

  // Xóa
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa loại hình này?")) return;

    try {
      const res = await fetch(`${apiUrl}/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.Message || "Không thể xóa loại hình!");
        return;
      }

      alert(data.Message);
      loadData();
    } catch (err) {
      console.error(err);
      alert("Lỗi khi xóa loại hình!");
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Quản lý Loại hình làm việc</h2>

      {/* Form thêm / sửa */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-4 mb-6 border p-4 rounded-lg bg-gray-50"
      >
        <input
          type="text"
          name="lhName"
          placeholder="Nhập tên loại hình..."
          value={form.lhName}
          onChange={(e) => setForm({ ...form, lhName: e.target.value })}
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
              setForm({ lhName: "" });
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
            <th className="border px-4 py-2">Tên loại hình</th>
            <th className="border px-4 py-2 w-40 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {list.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center py-3">
                Chưa có loại hình nào.
              </td>
            </tr>
          ) : (
            list.map((item) => (
              <tr key={item.lhid} className="hover:bg-gray-50">
                <td className="border px-4 py-2 text-center">{item.lhid}</td>
                <td className="border px-4 py-2">{item.lhName}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:underline mr-3"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(item.lhid)}
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

export default LoaiHinhLamViec;
