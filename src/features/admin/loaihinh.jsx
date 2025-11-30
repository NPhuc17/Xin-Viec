// import React, { useState, useEffect } from "react";

// function LoaiHinhLamViec() {
//   const apiUrl = "https://localhost:7144/api/LoaiHinhLamViec";
//   const [list, setList] = useState([]);
//   const [form, setForm] = useState({ lhName: "" });
//   const [editingId, setEditingId] = useState(null);

//   // Load danh sách
//   const loadData = async () => {
//     try {
//       const res = await fetch(`${apiUrl}/list`);
//       const data = await res.json();
//       setList(data.data || []);
//     } catch (err) {
//       console.error("Lỗi khi tải dữ liệu:", err);
//       alert("Không thể tải danh sách loại hình!");
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   // Xử lý submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.lhName.trim()) {
//       alert("Tên loại hình không được để trống!");
//       return;
//     }

//     try {
//       const method = editingId ? "PUT" : "POST";
//       const url = editingId
//         ? `${apiUrl}/update/${editingId}`
//         : `${apiUrl}/add`;

//       const res = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.Message || "Thao tác thất bại!");
//         return;
//       }

//       alert(data.Message || (editingId ? "Cập nhật thành công!" : "Thêm thành công!"));
//       setForm({ lhName: "" });
//       setEditingId(null);
//       loadData();
//     } catch (err) {
//       console.error(err);
//       alert("Có lỗi xảy ra khi gửi yêu cầu!");
//     }
//   };

//   // Chỉnh sửa
//   const handleEdit = (item) => {
//     setForm({ lhName: item.lhName });
//     setEditingId(item.lhid);
//   };

//   // Xóa
//   const handleDelete = async (id) => {
//     if (!window.confirm("Bạn có chắc muốn xóa loại hình này?")) return;

//     try {
//       const res = await fetch(`${apiUrl}/delete/${id}`, {
//         method: "DELETE",
//       });
//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.Message || "Không thể xóa loại hình!");
//         return;
//       }

//       alert(data.Message);
//       loadData();
//     } catch (err) {
//       console.error(err);
//       alert("Lỗi khi xóa loại hình!");
//     }
//   };

//   return (
//     <div className="p-8 max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4 text-center">Quản lý Loại hình làm việc</h2>

//       {/* Form thêm / sửa */}
//       <form
//         onSubmit={handleSubmit}
//         className="flex items-center gap-4 mb-6 border p-4 rounded-lg bg-gray-50"
//       >
//         <input
//           type="text"
//           name="lhName"
//           placeholder="Nhập tên loại hình..."
//           value={form.lhName}
//           onChange={(e) => setForm({ ...form, lhName: e.target.value })}
//           className="flex-1 p-2 border rounded"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           {editingId ? "Cập nhật" : "Thêm mới"}
//         </button>
//         {editingId && (
//           <button
//             type="button"
//             onClick={() => {
//               setEditingId(null);
//               setForm({ lhName: "" });
//             }}
//             className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//           >
//             Hủy
//           </button>
//         )}
//       </form>

//       {/* Bảng danh sách */}
//       <table className="w-full border-collapse border text-left">
//         <thead className="bg-blue-100">
//           <tr>
//             <th className="border px-4 py-2 w-20 text-center">ID</th>
//             <th className="border px-4 py-2">Tên loại hình</th>
//             <th className="border px-4 py-2 w-40 text-center">Hành động</th>
//           </tr>
//         </thead>
//         <tbody>
//           {list.length === 0 ? (
//             <tr>
//               <td colSpan="3" className="text-center py-3">
//                 Chưa có loại hình nào.
//               </td>
//             </tr>
//           ) : (
//             list.map((item) => (
//               <tr key={item.lhid} className="hover:bg-gray-50">
//                 <td className="border px-4 py-2 text-center">{item.lhid}</td>
//                 <td className="border px-4 py-2">{item.lhName}</td>
//                 <td className="border px-4 py-2 text-center">
//                   <button
//                     onClick={() => handleEdit(item)}
//                     className="text-blue-600 hover:underline mr-3"
//                   >
//                     Sửa
//                   </button>
//                   <button
//                     onClick={() => handleDelete(item.lhid)}
//                     className="text-red-600 hover:underline"
//                   >
//                     Xóa
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default LoaiHinhLamViec;


import React, { useEffect, useState } from "react";
import { variables } from "../../variables";

function LoaiHinhLamViec() {
  const [loaihinhList, setLoaihinhList] = useState([]);
  const [form, setForm] = useState({ lhName: "" });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  const API_URL = variables.API_URL + "LoaiHinhLamViec/";

  // 🔹 Load danh sách loại hình
  const loadData = async () => {
    try {
      const res = await fetch(API_URL + "list");
      const data = await res.json();
      setLoaihinhList(data.data || []);
    } catch (err) {
      console.error("Lỗi load:", err);
      alert("⚠️ Không thể tải danh sách loại hình!");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 🔹 Thay đổi input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Thêm / Cập nhật
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.lhName.trim()) {
      alert("⚠️ Tên loại hình không được để trống!");
      return;
    }

    const method = editId ? "PUT" : "POST";
    const url = editId ? API_URL + `update/${editId}` : API_URL + "add";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lhName: form.lhName }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setForm({ lhName: "" });
        setEditId(null);
        await loadData(); // cập nhật danh sách trước khi alert
        alert(data.message || (editId ? "✅ Cập nhật thành công!" : "✅ Thêm mới thành công!"));
      } else {
        alert(data.message || "❌ Thao tác thất bại! Vui lòng thử lại.");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Lỗi kết nối server: " + err.message);
    }
  };

  // 🔹 Chỉnh sửa
  const handleEdit = (item) => {
    setForm({ lhName: item.lhName });
    setEditId(item.lhid);
    alert("📝 Đang chỉnh sửa loại hình: " + item.lhName);
  };

  // 🔹 Xóa
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa loại hình này?")) return;

    try {
      const res = await fetch(API_URL + "delete/" + id, {
        method: "DELETE",
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        alert(data.message || "❌ Không thể xóa! Có thể đang được sử dụng.");
        return;
      }

      await loadData(); // refresh danh sách
      alert("✅ Xóa thành công!");
    } catch (err) {
      alert("⚠️ Lỗi kết nối server: " + err.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Quản lý Loại hình</h2>

      {/* Form thêm/sửa */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-4 mb-6 flex gap-4 items-end"
      >
        <div className="flex-1">
          <label className="block text-gray-600 mb-1">Tên loại hình</label>
          <input
            type="text"
            name="lhName"
            value={form.lhName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Nhập tên loại hình..."
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
              setForm({ lhName: "" });
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
            <th className="border px-4 py-2 text-left">Tên loại hình</th>
            <th className="border px-4 py-2 text-center w-40">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {loaihinhList.length > 0 ? (
            loaihinhList.map((item) => (
              <tr key={item.lhid} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{item.lhid}</td>
                <td className="border px-4 py-2">{item.lhName}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(item.lhid)}
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
                Không có loại hình nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LoaiHinhLamViec;
