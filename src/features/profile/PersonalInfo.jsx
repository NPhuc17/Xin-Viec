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
        quocGia: "Việt Nam",
        tinh: "",
        huyen: "",
        diaChi: "",
        cccd: "",
        noiSinh: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");


    const [provinces, setProvinces] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvinceId, setSelectedProvinceId] = useState("");

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
                    setFormData({
                        ...data,
                        quocGia: data.quocGia || "Việt Nam",
                    });
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

    useEffect(() => {
        async function fetchProvinces() {
            try {
                const res = await fetch("https://esgoo.net/api-tinhthanh-new/1/0.htm");
                const json = await res.json();
                setProvinces(json.data || []);
            } catch (err) {
                console.error("Lỗi lấy tỉnh:", err);
            }
        }
        fetchProvinces();
    }, []);


    useEffect(() => {
        if (!formData.tinh || provinces.length === 0) return;

        const found = provinces.find(p => p.name === formData.tinh);

        if (found) {
            setSelectedProvinceId(found.id);
        }
    }, [formData.tinh, provinces]);

    useEffect(() => {
        if (!selectedProvinceId) return;

        async function fetchWards() {
            try {
                const res = await fetch(
                    `https://esgoo.net/api-tinhthanh-new/2/${selectedProvinceId}.htm`
                );
                const json = await res.json();
                setWards(json.data || []);
            } catch (err) {
                console.error("Lỗi lấy phường:", err);
            }
        }

        fetchWards();
    }, [selectedProvinceId]);


    const handleProvinceChange = async (e) => {
        const provinceId = e.target.value;
        setSelectedProvinceId(provinceId);

        // lưu tên tỉnh vào form
        const province = provinces.find(p => p.id === provinceId);
        setFormData({
            ...formData,
            tinh: province ? province.name : "",
            huyen: "",
        });

        if (!provinceId) {
            setWards([]);
            return;
        }

        try {
            const res = await fetch(`https://esgoo.net/api-tinhthanh-new/2/${provinceId}.htm`);
            const json = await res.json();
            setWards(json.data || []);
        } catch (err) {
            console.error("Lỗi lấy phường:", err);
        }
    };

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

                    {/* Giới tính */}
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

                    {/* Số điện thoại */}
                    <div>
                        <label className="block mb-1 font-medium">Số điện thoại</label>
                        <input
                            type="text"
                            name="sdt"
                            value={formData.sdt || ""}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email || ""}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>

                    {/* Tỉnh / Thành phố */}
                    <div>
                        <label className="block mb-1 font-medium">Tỉnh / Thành phố</label>
                        <select
                            value={selectedProvinceId}
                            onChange={handleProvinceChange}
                            className="w-full border rounded-lg px-3 py-2 bg-white"
                        >
                            <option value="">-- Chọn tỉnh / thành phố --</option>
                            {provinces.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Phường / Xã */}
                    <div>
                        <label className="block mb-1 font-medium">Phường / Xã</label>
                        <select
                            value={formData.huyen || ""}
                            onChange={(e) =>
                                setFormData({ ...formData, huyen: e.target.value })
                            }
                            disabled={!wards.length}
                            className="w-full border rounded-lg px-3 py-2 bg-white"
                        >
                            <option value="">-- Chọn phường / xã --</option>
                            {wards.map((w) => (
                                <option key={w.id} value={w.name}>
                                    {w.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Các trường còn lại */}
                    {[
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

                    {/* Submit */}
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
