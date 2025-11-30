import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { variables } from "../../variables";
import Navbar from "../../components/navbar";

function AddProfile() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        hsName: "",
        file: null,
        tenUngVien: "",
        gioiTinh: "",
        ngaySinh: "",
        phoneHoSo: "",
        mailHoSo: "",
        quocGia: "",
        tinh: "",
        quanHuyen: "",
        diaChi: "",
        hocVan: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) setForm({ ...form, [name]: files[0] });
        else setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.file || !form.hsName) {
            alert("Vui lòng nhập tên hồ sơ và chọn file!");
            return;
        }
        setLoading(true);

        try {
            // 🟢 Bước 1: Upload file hồ sơ
            const fileData = new FormData();
            fileData.append("hsName", form.hsName);
            fileData.append("file", form.file);

            const res1 = await fetch(`${variables.API_URL}HoSo/create`, {
                method: "POST",
                body: fileData,
                credentials: "include",
            });
            const data1 = await res1.json();
            console.log("📦 Response HoSo/create:", data1);

            const hosoID = data1.hsId; // 👈 lấy từ backend
            if (!hosoID) throw new Error("Không lấy được ID hồ sơ");

            // 🟢 Bước 2: Gửi thông tin chi tiết hồ sơ
            const info = {
                tenUngVien: form.tenUngVien,
                gioiTinh: form.gioiTinh,
                ngaySinh: form.ngaySinh,
                phoneHoSo: form.phoneHoSo,
                mailHoSo: form.mailHoSo,
                quocGia: form.quocGia,
                tinh: form.tinh,
                quanHuyen: form.quanHuyen,
                diaChi: form.diaChi,
                hocVan: form.hocVan,
                hosoID: hosoID,
            };

            const res2 = await fetch(`${variables.API_URL}NoiDungHoSo`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(info),
                credentials: "include",
            });

            const data2 = await res2.json();
            if (!res2.ok) throw new Error(data2.message || "Lỗi lưu nội dung hồ sơ");

            alert("Tạo hồ sơ mới thành công!");
            navigate("/profile");
        } catch (err) {
            console.error(err);
            alert("Lỗi: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <Navbar/>
        <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Tạo Hồ sơ Mới</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="font-medium">Tên hồ sơ</label>
                    <input
                        type="text"
                        name="hsName"
                        value={form.hsName}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="font-medium">Chọn File (.pdf, .doc, .docx)</label>
                    <input
                        type="file"
                        name="file"
                        onChange={handleChange}
                        accept=".pdf,.doc,.docx"
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <hr className="my-4" />
                <h3 className="text-lg font-semibold text-primary">Thông tin ứng viên</h3>

                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="tenUngVien"
                        placeholder="Tên ứng viên"
                        value={form.tenUngVien}
                        onChange={handleChange}
                        className="border rounded px-3 py-2"
                    />
                    <select
                        name="gioiTinh"
                        value={form.gioiTinh}
                        onChange={handleChange}
                        className="border rounded px-3 py-2"
                    >
                        <option value="">-- Giới tính --</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>
                    <input
                        type="date"
                        name="ngaySinh"
                        value={form.ngaySinh}
                        onChange={handleChange}
                        className="border rounded px-3 py-2"
                    />
                    <input
                        type="text"
                        name="phoneHoSo"
                        placeholder="Số điện thoại"
                        value={form.phoneHoSo}
                        onChange={handleChange}
                        className="border rounded px-3 py-2"
                    />
                    <input
                        type="email"
                        name="mailHoSo"
                        placeholder="Email"
                        value={form.mailHoSo}
                        onChange={handleChange}
                        className="border rounded px-3 py-2"
                    />
                    <input
                        type="text"
                        name="hocVan"
                        placeholder="Học vấn"
                        value={form.hocVan}
                        onChange={handleChange}
                        className="border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <input
                        type="text"
                        name="quocGia"
                        placeholder="Quốc gia"
                        value={form.quocGia}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-full"
                    />
                    <input
                        type="text"
                        name="tinh"
                        placeholder="Tỉnh"
                        value={form.tinh}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-full mt-2"
                    />
                    <input
                        type="text"
                        name="quanHuyen"
                        placeholder="Quận/Huyện"
                        value={form.quanHuyen}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-full mt-2"
                    />
                    <textarea
                        name="diaChi"
                        placeholder="Địa chỉ chi tiết"
                        value={form.diaChi}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-full mt-2"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary text-white w-full py-2 rounded hover:bg-primary/90"
                >
                    {loading ? "Đang lưu..." : "Lưu hồ sơ"}
                </button>
            </form>
        </div>
        </>
    );
}

export default AddProfile;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { variables } from "../../variables";

// function AddProfile() {
//     const navigate = useNavigate();
//     const [form, setForm] = useState({
//         tenUngVien: "",
//         gioiTinh: "",
//         ngaySinh: "",
//         phoneHoSo: "",
//         mailHoSo: "",
//         quocGia: "",
//         tinh: "",
//         quanHuyen: "",
//         diaChi: "",
//         hocVan: "",
//         // file: null, // 🟢 Bỏ phần file nếu không cần
//         // hsName: "", // 🟢 Bỏ phần tên hồ sơ nếu không cần
//     });
//     const [loading, setLoading] = useState(false);

//     const handleChange = (e) => {
//         const { name, value /*, files */ } = e.target;
//         // if (files) setForm({ ...form, [name]: files[0] });
//         setForm({ ...form, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             // Chỉ gửi thông tin cá nhân
//             const res = await fetch(`${variables.API_URL}NoiDungHoSo`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(form),
//                 credentials: "include",
//             });

//             const data = await res.json();
//             if (!res.ok) throw new Error(data.message || "Lỗi lưu nội dung hồ sơ");

//             alert("Tạo hồ sơ mới thành công!");
//             navigate("/profile");
//         } catch (err) {
//             console.error(err);
//             alert("Lỗi: " + err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
//             <h3 className="text-lg font-semibold text-primary mb-4">Thông tin ứng viên</h3>

//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                     <input
//                         type="text"
//                         name="tenUngVien"
//                         placeholder="Tên ứng viên"
//                         value={form.tenUngVien}
//                         onChange={handleChange}
//                         className="border rounded px-3 py-2"
//                     />
//                     <select
//                         name="gioiTinh"
//                         value={form.gioiTinh}
//                         onChange={handleChange}
//                         className="border rounded px-3 py-2"
//                     >
//                         <option value="">-- Giới tính --</option>
//                         <option value="Nam">Nam</option>
//                         <option value="Nữ">Nữ</option>
//                     </select>
//                     <input
//                         type="date"
//                         name="ngaySinh"
//                         value={form.ngaySinh}
//                         onChange={handleChange}
//                         className="border rounded px-3 py-2"
//                     />
//                     <input
//                         type="text"
//                         name="phoneHoSo"
//                         placeholder="Số điện thoại"
//                         value={form.phoneHoSo}
//                         onChange={handleChange}
//                         className="border rounded px-3 py-2"
//                     />
//                     <input
//                         type="email"
//                         name="mailHoSo"
//                         placeholder="Email"
//                         value={form.mailHoSo}
//                         onChange={handleChange}
//                         className="border rounded px-3 py-2"
//                     />
//                     <input
//                         type="text"
//                         name="hocVan"
//                         placeholder="Học vấn"
//                         value={form.hocVan}
//                         onChange={handleChange}
//                         className="border rounded px-3 py-2"
//                     />
//                 </div>

//                 <div>
//                     <input
//                         type="text"
//                         name="quocGia"
//                         placeholder="Quốc gia"
//                         value={form.quocGia}
//                         onChange={handleChange}
//                         className="border rounded px-3 py-2 w-full"
//                     />
//                     <input
//                         type="text"
//                         name="tinh"
//                         placeholder="Tỉnh"
//                         value={form.tinh}
//                         onChange={handleChange}
//                         className="border rounded px-3 py-2 w-full mt-2"
//                     />
//                     <input
//                         type="text"
//                         name="quanHuyen"
//                         placeholder="Quận/Huyện"
//                         value={form.quanHuyen}
//                         onChange={handleChange}
//                         className="border rounded px-3 py-2 w-full mt-2"
//                     />
//                     <textarea
//                         name="diaChi"
//                         placeholder="Địa chỉ chi tiết"
//                         value={form.diaChi}
//                         onChange={handleChange}
//                         className="border rounded px-3 py-2 w-full mt-2"
//                     />
//                 </div>

//                 <button
//                     type="submit"
//                     disabled={loading}
//                     className="bg-primary text-white w-full py-2 rounded hover:bg-primary/90"
//                 >
//                     {loading ? "Đang lưu..." : "Lưu hồ sơ"}
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default AddProfile;

