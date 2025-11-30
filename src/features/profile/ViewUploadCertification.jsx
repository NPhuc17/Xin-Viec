import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { variables } from "../../variables";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

export default function ViewUploadCertification() {
    const { id } = useParams();              // id của hồ sơ
    const navigate = useNavigate();

    const [bangCapList, setBangCapList] = useState([]);
    const [loading, setLoading] = useState(true);

    // State cho edit
    const [editingBangCapId, setEditingBangCapId] = useState(null);
    const [editTenBangCap, setEditTenBangCap] = useState("");
    const [editLoai, setEditLoai] = useState("");
    const [editFile, setEditFile] = useState(null);
    const [editPreview, setEditPreview] = useState(null);

    // 📌 Lấy bằng cấp
    const fetchBangCap = async () => {
        try {
            const res = await fetch(`${variables.API_URL}HoSo/bang-cap/${id}`, {
                headers: { Authorization: `Bearer ${Cookies.get("jwt_token")}` },
            });

            if (!res.ok) {
                setBangCapList([]);
                return;
            }

            const data = await res.json();
            setBangCapList(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBangCap();
    }, [id]);

    // 📌 Bắt đầu chỉnh sửa
    const startEditBangCap = (bc) => {
        setEditingBangCapId(bc.id);
        setEditTenBangCap(bc.tenBangCap);
        setEditLoai(bc.loai);
        setEditFile(null);
        setEditPreview(bc.fileUrl ? variables.PHOTO_URL + bc.fileUrl : null);
    };

    const handleEditFileChange = (e) => {
        const f = e.target.files[0];
        setEditFile(f);
        setEditPreview(f ? URL.createObjectURL(f) : null);
    };

    // 📌 Lưu chỉnh sửa
    const handleSubmitEdit = async () => {
        if (!editTenBangCap || !editLoai) {
            alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        try {
            const fd = new FormData();
            fd.append("TenBangCap", editTenBangCap);
            fd.append("Loai", editLoai);
            if (editFile) fd.append("File", editFile);

            const res = await fetch(`${variables.API_URL}HoSo/bang-cap/sua/${editingBangCapId}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${Cookies.get("jwt_token")}` },
                body: fd,
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Sửa thất bại");
                return;
            }

            // cập nhật list
            setBangCapList(prev =>
                prev.map((bc) =>
                    bc.id === editingBangCapId
                        ? { ...bc, tenBangCap: editTenBangCap, loai: editLoai, fileUrl: editFile ? data.fileUrl : bc.fileUrl }
                        : bc
                )
            );

            setEditingBangCapId(null);
            setEditFile(null);
            setEditPreview(null);

            alert("Sửa thành công!");
        } catch (err) {
            console.error(err);
            alert("Lỗi khi sửa");
        }
    };

    // 📌 Xóa
    const handleDeleteBangCap = async (bcId) => {
        if (!window.confirm("Bạn có chắc muốn xoá?")) return;

        try {
            const res = await fetch(`${variables.API_URL}HoSo/bang-cap/xoa/${bcId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${Cookies.get("jwt_token")}` },
            });

            if (!res.ok) {
                const d = await res.json().catch(() => ({}));
                alert(d.message || "Xoá thất bại");
                return;
            }

            setBangCapList(prev => prev.filter(bc => bc.id !== bcId));
            alert("Xoá thành công!");
        } catch (err) {
            console.error(err);
            alert("Lỗi khi xoá");
        }
    };

    if (loading) return <p className="p-6">Đang tải...</p>;

    return (
  <>
  <div className=" min-h-screen flex flex-col justify-between">
    <Navbar />
    <div className="p-6">

      <h2 className="text-lg font-bold mb-4 text-primary">Danh sách bằng cấp</h2>

      {/* Nút thêm bằng cấp */}
      <button
        className="mb-4 bg-primary text-white px-4 py-2 rounded hover:bg-highlight"
        onClick={() => navigate("/add-certification", { state: { hoSoId: id } })}
      >
        ➕ Thêm Bằng Cấp
      </button>

      {bangCapList.length === 0 ? (
        <p className="text-gray-500 italic">Chưa có bằng cấp / chứng chỉ nào.</p>
      ) : (
        <ul className="space-y-2">
          {bangCapList.map((bc) => (
            <li key={bc.id} className="border border-accent p-3 rounded flex justify-between items-center">
              {editingBangCapId === bc.id ? (
                <div className="w-full space-y-2">
                  <input
                    type="text"
                    value={editTenBangCap}
                    onChange={(e) => setEditTenBangCap(e.target.value)}
                    className="border px-2 py-1 rounded w-full"
                  />

                  <input
                    type="text"
                    value={editLoai}
                    onChange={(e) => setEditLoai(e.target.value)}
                    className="border px-2 py-1 rounded w-full"
                  />

                  <input type="file" onChange={handleEditFileChange} />

                  {editPreview && (
                    <img src={editPreview} alt="preview" className="w-20 rounded" />
                  )}

                  <div className="flex gap-2">
                    <button className="bg-secondary text-white px-3 py-1 rounded hover:bg-highlight" onClick={handleSubmitEdit}>
                      Lưu
                    </button>
                    <button className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-highlight" onClick={() => setEditingBangCapId(null)}>
                      Hủy
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <p className="font-medium text-accent">{bc.tenBangCap}</p>
                    <p className="text-sm text-gray-500">{bc.loai}</p>
                  </div>

                  <div className="flex gap-2 items-center">
                    {bc.fileUrl && (
                      <a
                        href={variables.PHOTO_URL + bc.fileUrl}
                        target="_blank"
                        className="text-primary underline hover:text-highlight"
                      >
                        Xem
                      </a>
                    )}

                    <button className="bg-secondary text-white px-3 py-1 rounded hover:bg-highlight" onClick={() => startEditBangCap(bc)}>
                      Sửa
                    </button>

                    <button className="bg-accent text-white px-3 py-1 rounded hover:bg-highlight" onClick={() => handleDeleteBangCap(bc.id)}>
                      Xoá
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={() => navigate(-1)}
        className="mt-6 bg-gray-600 text-white px-4 py-2 rounded hover:bg-highlight"
      >
        Đóng
      </button>
    </div>
    <Footer />
    </div>
  </>
);

}
