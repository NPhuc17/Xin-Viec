import React, { useEffect, useState } from "react";
import { variables } from "../../variables";

function Linhvuc() {
    const [linhvucs, setLinhvucs] = useState([]);
    const [form, setForm] = useState({ lvName: "" });
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState("");

    const API_URL = variables.API_URL + "LinhVuc/";

    // 🔹 Load danh sách
    const loadData = async () => {
        try {
            const res = await fetch(API_URL + "list");
            const data = await res.json();
            setLinhvucs(data.data || data.Data || []);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.lvName.trim()) {
            alert("⚠️ Tên lĩnh vực không được để trống!");
            return;
        }

        const method = editId ? "PUT" : "POST";
        const url = editId ? API_URL + `update/${editId}` : API_URL + "add";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ LvName: form.lvName }),
            });

            const data = await res.json().catch(() => ({}));

            if (res.ok) {
                alert(data.Message || "✅ Thao tác thành công!");
                setForm({ lvName: "" });
                setEditId(null);
                loadData();
            } else {
                // Hiển thị lỗi logic từ backend
                alert(data.Message || "❌ Thao tác thất bại! Vui lòng thử lại.");
            }
        } catch (err) {
            console.error(err);
            alert("⚠️ Lỗi kết nối server: " + err.message);
        }
    };

    // 🔹 Chỉnh sửa
    const handleEdit = (lv) => {
        setForm({ lvName: lv.lvName });
        setEditId(lv.lvid);
        alert("📝 Đang chỉnh sửa lĩnh vực: " + lv.lvName);
    };

    // 🔹 Xóa
    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa lĩnh vực này?")) return;

        try {
            const res = await fetch(variables.API_URL + 'LinhVuc/delete/' + id, {
                method: 'DELETE',
            });

            const data = await res.json().catch(() => ({})); // tránh lỗi khi không có JSON

            if (!res.ok) {
                // Nếu backend trả lỗi 400/500 có kèm Message, hiển thị ra
                if (data.message) {
                    alert("❌ Lỗi: " + data.message);
                } else {
                    alert("❌ Lỗi không xác định từ server.");
                }
                return;
            }

            alert("✅ Xóa thành công!");
            fetchLinhVucList(); // refresh danh sách
        } catch (err) {
            alert("⚠️ Lỗi kết nối server: " + err.message);
        }
    };


    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Quản lý lĩnh vực</h2>

            {/* Form thêm/sửa */}
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded p-4 mb-6 flex gap-4 items-end"
            >
                <div className="flex-1">
                    <label className="block text-gray-600 mb-1">Tên lĩnh vực</label>
                    <input
                        type="text"
                        name="lvName"
                        value={form.lvName}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        placeholder="Nhập tên lĩnh vực..."
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
                            setForm({ lvName: "" });
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
                        <th className="border px-4 py-2 text-left">Tên lĩnh vực</th>
                        <th className="border px-4 py-2 text-center w-40">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {linhvucs.length > 0 ? (
                        linhvucs.map((lv) => (
                            <tr key={lv.lvid} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{lv.lvid}</td>
                                <td className="border px-4 py-2">{lv.lvName}</td>
                                <td className="border px-4 py-2 text-center">
                                    <button
                                        onClick={() => handleEdit(lv)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        onClick={() => handleDelete(lv.lvid)}
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
                                Không có lĩnh vực nào.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Linhvuc;
