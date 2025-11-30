import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { variables } from "../../variables";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

function PersonalInfoPage() {
    const [formData, setFormData] = useState({
        hoVaTen: "",
        gioiTinh: "",
        ngaySinh: "",
        sdt: "",
        email: "",
        quocGia: "",
        tinh: "",
        huyen: "",
        diaChi: "",
        cccd: "",
        noiSinh: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const token = Cookies.get("jwt_token");

    useEffect(() => {
        async function fetchInfo() {
            try {
                const res = await fetch(`${variables.API_URL}ThongTinCaNhan/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                if (data) {
                    setFormData(data);
                    setIsEditing(true);
                }
            } catch (err) {
                console.error("Fetch failed:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchInfo();
    }, [token]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const url = `${variables.API_URL}ThongTinCaNhan/${isEditing ? "update" : "create"}`;
    const method = isEditing ? "PUT" : "POST";

    try {
        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (res.ok) {
            setMessage(data.message || "Lưu thành công!");
            setIsEditing(true);
        } else {
            // ----- Xử lý lỗi validation từ API -----
            if (data.errors) {
                const message = Object.values(data.errors).flat().join("\n");
                alert(message);
                setMessage(message);
            } else {
                alert(data.title || "Đã xảy ra lỗi!");
                setMessage(data.title || "Đã xảy ra lỗi!");
            }
        }
    } catch (err) {
        setMessage("Lỗi kết nối máy chủ");
        alert("Lỗi kết nối máy chủ");
    }
};


    if (loading) return <div>Đang tải...</div>;

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-6 max-w-2xl">
                <h2 className="text-2xl font-bold mb-4 text-center">Thông tin cá nhân</h2>

                {message && <div className="text-green-600 mb-3 text-center">{message}</div>}

                <form onSubmit={handleSubmit} className="space-y-4 bg-white p-5 rounded-2xl shadow">
                    {/* Họ và tên */}
                    <div>
                        <label className="block mb-1 font-medium">Họ và tên</label>
                        <input
                            type="text"
                            name="hoVaTen"
                            value={formData.hoVaTen || ""}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2"
                            required
                        />
                    </div>

                    {/* Giới tính (dropdown) */}
                    <div>
                        <label className="block mb-1 font-medium">Giới tính</label>
                        <select
                            name="gioiTinh"
                            value={formData.gioiTinh || ""}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 bg-white"
                            required
                        >
                            <option value="">-- Chọn giới tính --</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Khác">Khác</option>
                        </select>
                    </div>

                    {/* Ngày sinh */}
                    <div>
                        <label className="block mb-1 font-medium">Ngày sinh</label>
                        <input
                            type="date"
                            name="ngaySinh"
                            value={formData.ngaySinh ? formData.ngaySinh.split("T")[0] : ""}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2"
                            required
                        />
                    </div>

                    {/* Các trường khác */}
                    {[
                        { label: "Số điện thoại", name: "sdt" },
                        { label: "Email", name: "email" },
                        { label: "Quốc gia", name: "quocGia" },
                        { label: "Tỉnh/Thành phố", name: "tinh" },
                        { label: "Huyện/Quận", name: "huyen" },
                        { label: "Địa chỉ", name: "diaChi" },
                        { label: "CCCD", name: "cccd" },
                        { label: "Nơi sinh", name: "noiSinh" },
                    ].map((field) => (
                        <div key={field.name}>
                            <label className="block mb-1 font-medium">{field.label}</label>
                            <input
                                type="text"
                                name={field.name}
                                value={formData[field.name] || ""}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>
                    ))}

                    {/* Nút submit */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
                    >
                        {isEditing ? "Cập nhật thông tin" : "Tạo thông tin"}
                    </button>
                </form>

            </div>

            <Footer />
        </>
    );
}

export default PersonalInfoPage;
