// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { variables } from "../../variables";

// function NoiDungHoSoPage() {
//   const { hsid } = useParams();
//   const navigate = useNavigate();
//   const [noiDung, setNoiDung] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadNoiDung();
//   }, [hsid]);

//   const loadNoiDung = async () => {
//     try {
//       const res = await fetch(variables.API_URL + `NoiDungHoSo/${hsid}`, {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//       });

//       if (!res.ok) throw new Error("Không tải được nội dung hồ sơ.");
//       const data = await res.json();
//       setNoiDung(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <p className="text-center mt-6">Đang tải nội dung...</p>;
//   if (!noiDung)
//     return (
//       <div className="text-center mt-6">
//         <p className="text-red-600 mb-4">Không tìm thấy nội dung hồ sơ.</p>
//         <button
//           onClick={() => navigate(-1)}
//           className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//         >
//           Quay lại
//         </button>
//       </div>
//     );

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
//       <h1 className="text-2xl font-bold mb-4 text-primary">Nội dung hồ sơ</h1>

//       <div className="space-y-2">
//         <p><strong>Tên ứng viên:</strong> {noiDung.tenUngVien}</p>
//         <p><strong>Giới tính:</strong> {noiDung.gioiTinh}</p>
//         <p><strong>Ngày sinh:</strong> {noiDung.ngaySinh}</p>
//         <p><strong>Email:</strong> {noiDung.mailHoSo}</p>
//         <p><strong>Số điện thoại:</strong> {noiDung.phoneHoSo}</p>
//         <p><strong>Học vấn:</strong> {noiDung.hocVan}</p>
//         <p><strong>Kinh nghiệm:</strong> {noiDung.kinhNghiem}</p>
//         <p><strong>Tỉnh:</strong> {noiDung.tinh}</p>
//         <p><strong>Quận/Huyện:</strong> {noiDung.quanHuyen}</p>
//         <p><strong>Địa chỉ:</strong> {noiDung.diaChi}</p>
//       </div>

//       <div className="mt-6">
//         <button
//           onClick={() => navigate(-1)}
//           className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
//         >
//           ← Quay lại
//         </button>
//       </div>
//     </div>
//   );
// }

// export default NoiDungHoSoPage;



// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { variables } from "../../variables";

// function NoiDungHoSoPage() {
//   const { ndid } = useParams(); // dùng ndid
//   const navigate = useNavigate();

//   const [noiDung, setNoiDung] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editMode, setEditMode] = useState(false);
//   const [form, setForm] = useState({
//     tenUngVien: "",
//     gioiTinh: "",
//     ngaySinh: "",
//     mailHoSo: "",
//     phoneHoSo: "",
//     hocVan: "",
//     quocGia: "",
//     tinh: "",
//     quanHuyen: "",
//     diaChi: "",
//   });

//   const [modalMsg, setModalMsg] = useState("");
//   const [modalType, setModalType] = useState("info");
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     loadNoiDung();
//   }, [ndid]);

//   const loadNoiDung = async () => {
//     try {
//       const res = await fetch(variables.API_URL + `NoiDungHoSo/${ndid}`, {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//       });

//       if (!res.ok) throw new Error("Không tải được nội dung hồ sơ.");
//       const data = await res.json();
//       setNoiDung(data);
//       setForm({
//         tenUngVien: data.tenUngVien || "",
//         gioiTinh: data.gioiTinh || "",
//         ngaySinh: data.ngaySinh?.split("T")[0] || "",
//         mailHoSo: data.mailHoSo || "",
//         phoneHoSo: data.phoneHoSo || "",
//         hocVan: data.hocVan || "",
//         quocGia: data.quocGia || "",
//         tinh: data.tinh || "",
//         quanHuyen: data.quanHuyen || "",
//         diaChi: data.diaChi || "",
//       });
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleSave = async () => {
//     try {
//       const res = await fetch(variables.API_URL + `NoiDungHoSo/${ndid}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({
//           TenUngVien: form.tenUngVien,
//           GioiTinh: form.gioiTinh,
//           NgaySinh: form.ngaySinh,
//           MailHoSo: form.mailHoSo,
//           PhoneHoSo: form.phoneHoSo,
//           HocVan: form.hocVan,
//           QuocGia: form.quocGia,
//           Tinh: form.tinh,
//           QuanHuyen: form.quanHuyen,
//           DiaChi: form.diaChi,
//           HosoID: noiDung.hosoID, // giữ nguyên hosoID
//         }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setModalMsg(data.message || "Cập nhật thành công!");
//         setModalType("success");
//         setShowModal(true);
//         setEditMode(false);
//         loadNoiDung(); // load lại nội dung mới
//       } else {
//         setModalMsg(data.message || "Lỗi khi cập nhật.");
//         setModalType("error");
//         setShowModal(true);
//       }
//     } catch (err) {
//       console.error(err);
//       setModalMsg("Lỗi kết nối máy chủ!");
//       setModalType("error");
//       setShowModal(true);
//     }
//   };

//   if (loading) return <p className="text-center mt-6">Đang tải nội dung...</p>;

//   if (!noiDung)
//     return (
//       <div className="text-center mt-6">
//         <p className="text-red-600 mb-4">Không tìm thấy nội dung hồ sơ.</p>
//         <button
//           onClick={() => navigate(-1)}
//           className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//         >
//           Quay lại
//         </button>
//       </div>
//     );

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
//       <h1 className="text-2xl font-bold mb-4 text-primary">Nội dung hồ sơ</h1>

//       {!editMode ? (
//         <>
//           <div className="space-y-2">
//             <p><strong>Tên ứng viên:</strong> {noiDung.tenUngVien}</p>
//             <p><strong>Giới tính:</strong> {noiDung.gioiTinh}</p>
//             <p><strong>Ngày sinh:</strong> {noiDung.ngaySinh}</p>
//             <p><strong>Email:</strong> {noiDung.mailHoSo}</p>
//             <p><strong>Số điện thoại:</strong> {noiDung.phoneHoSo}</p>
//             <p><strong>Học vấn:</strong> {noiDung.hocVan}</p>
//             <p><strong>Quốc gia:</strong> {noiDung.quocGia}</p>
//             <p><strong>Tỉnh:</strong> {noiDung.tinh}</p>
//             <p><strong>Quận/Huyện:</strong> {noiDung.quanHuyen}</p>
//             <p><strong>Địa chỉ:</strong> {noiDung.diaChi}</p>
//           </div>

//           <div className="mt-6 flex gap-3">
//             <button
//               onClick={() => setEditMode(true)}
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//             >
//               ✏️ Sửa thông tin
//             </button>
//             <button
//               onClick={() => navigate(-1)}
//               className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
//             >
//               ← Quay lại
//             </button>
//           </div>
//         </>
//       ) : (
//         // === Form chỉnh sửa ===
//         <div className="space-y-4">
//           <div>
//             <label className="block font-medium">Tên ứng viên</label>
//             <input
//               type="text"
//               name="tenUngVien"
//               value={form.tenUngVien}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded focus:outline-none focus:border-primary"
//             />
//           </div>
//           <div>
//             <label className="block font-medium">Giới tính</label>
//             <input
//               type="text"
//               name="gioiTinh"
//               value={form.gioiTinh}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded focus:outline-none focus:border-primary"
//             />
//           </div>
//           <div>
//             <label className="block font-medium">Ngày sinh</label>
//             <input
//               type="date"
//               name="ngaySinh"
//               value={form.ngaySinh}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded focus:outline-none focus:border-primary"
//             />
//           </div>
//           <div>
//             <label className="block font-medium">Email</label>
//             <input
//               type="email"
//               name="mailHoSo"
//               value={form.mailHoSo}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded focus:outline-none focus:border-primary"
//             />
//           </div>
//           <div>
//             <label className="block font-medium">Số điện thoại</label>
//             <input
//               type="text"
//               name="phoneHoSo"
//               value={form.phoneHoSo}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded focus:outline-none focus:border-primary"
//             />
//           </div>
//           <div>
//             <label className="block font-medium">Học vấn</label>
//             <input
//               type="text"
//               name="hocVan"
//               value={form.hocVan}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded focus:outline-none focus:border-primary"
//             />
//           </div>
//           <div>
//             <label className="block font-medium">Quốc gia</label>
//             <input
//               type="text"
//               name="quocGia"
//               value={form.quocGia}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded focus:outline-none focus:border-primary"
//             />
//           </div>
//           <div>
//             <label className="block font-medium">Tỉnh</label>
//             <input
//               type="text"
//               name="tinh"
//               value={form.tinh}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded focus:outline-none focus:border-primary"
//             />
//           </div>
//           <div>
//             <label className="block font-medium">Quận/Huyện</label>
//             <input
//               type="text"
//               name="quanHuyen"
//               value={form.quanHuyen}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded focus:outline-none focus:border-primary"
//             />
//           </div>
//           <div>
//             <label className="block font-medium">Địa chỉ</label>
//             <input
//               type="text"
//               name="diaChi"
//               value={form.diaChi}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded focus:outline-none focus:border-primary"
//             />
//           </div>

//           <div className="mt-4 flex gap-3">
//             <button
//               onClick={handleSave}
//               className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
//             >
//               💾 Lưu
//             </button>
//             <button
//               onClick={() => setEditMode(false)}
//               className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
//             >
//               Hủy
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
//           <div className="bg-white p-6 rounded shadow-lg max-w-sm">
//             <p
//               className={`text-lg mb-4 ${
//                 modalType === "error"
//                   ? "text-red-600"
//                   : modalType === "success"
//                   ? "text-green-600"
//                   : "text-gray-700"
//               }`}
//             >
//               {modalMsg}
//             </p>
//             <button
//               onClick={() => setShowModal(false)}
//               className="w-full bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
//             >
//               Đóng
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default NoiDungHoSoPage;



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { variables } from "../../variables";
import Navbar from "../../components/navbar";

function NoiDungHoSoPage() {
    const { ndid } = useParams(); // dùng ndid từ URL
    const navigate = useNavigate();

    const [noiDung, setNoiDung] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);

    // state form trùng với DTO C# (PascalCase)
    const [form, setForm] = useState({
        TenUngVien: "",
        GioiTinh: "",
        NgaySinh: "",
        MailHoSo: "",
        PhoneHoSo: "",
        HocVan: "",
        QuocGia: "",
        Tinh: "",
        QuanHuyen: "",
        DiaChi: "",
        HosoID: 0,
    });

    const [modalMsg, setModalMsg] = useState("");
    const [modalType, setModalType] = useState("info");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        loadNoiDung();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ndid]);

    const loadNoiDung = async () => {
        try {
            const res = await fetch(variables.API_URL + `NoiDungHoSo/${ndid}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (!res.ok) throw new Error("Không tải được nội dung hồ sơ.");
            const data = await res.json();
            setNoiDung(data);

            // cập nhật form để edit
            setForm({
                TenUngVien: data.tenUngVien || "",
                GioiTinh: data.gioiTinh || "",
                NgaySinh: data.ngaySinh?.split("T")[0] || "",
                MailHoSo: data.mailHoSo || "",
                PhoneHoSo: data.phoneHoSo || "",
                HocVan: data.hocVan || "",
                QuocGia: data.quocGia || "",
                Tinh: data.tinh || "",
                QuanHuyen: data.quanHuyen || "",
                DiaChi: data.diaChi || "",
                HosoID: data.hosoID || 0,
            });
        } catch (err) {
            console.error(err);
            setModalMsg("Không thể tải dữ liệu hồ sơ.");
            setModalType("error");
            setShowModal(true);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const res = await fetch(variables.API_URL + `NoiDungHoSo/${ndid}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (res.ok) {
                setModalMsg(data.message || "Cập nhật thành công!");
                setModalType("success");
                setShowModal(true);
                setEditMode(false);
                loadNoiDung(); // load lại dữ liệu mới
            } else {
                setModalMsg(data.message || "Lỗi khi cập nhật.");
                setModalType("error");
                setShowModal(true);
            }
        } catch (err) {
            console.error(err);
            setModalMsg("Lỗi kết nối máy chủ!");
            setModalType("error");
            setShowModal(true);
        }
    };

    if (loading) return <p className="text-center mt-6">Đang tải nội dung...</p>;
    if (!noiDung)
        return (
            <div className="text-center mt-6">
                <p className="text-red-600 mb-4">Không tìm thấy nội dung hồ sơ.</p>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                    Quay lại
                </button>
            </div>
        );

    const labels = {
        TenUngVien: "Tên ứng viên",
        GioiTinh: "Giới tính",
        NgaySinh: "Ngày sinh",
        MailHoSo: "Email",
        PhoneHoSo: "Số điện thoại",
        HocVan: "Học vấn",
        QuocGia: "Quốc gia",
        Tinh: "Tỉnh",
        QuanHuyen: "Quận/Huyện",
        DiaChi: "Địa chỉ",
    };

    return (
        <>
            <Navbar/>

        <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-4 text-primary">Nội dung hồ sơ</h1>

            {!editMode ? (
                <>
                    <div className="space-y-2">
                        <p><strong>Tên ứng viên:</strong> {noiDung.tenUngVien}</p>
                        <p><strong>Giới tính:</strong> {noiDung.gioiTinh}</p>
                        <p><strong>Ngày sinh:</strong> {noiDung.ngaySinh?.split("T")[0]}</p>
                        <p><strong>Email:</strong> {noiDung.mailHoSo}</p>
                        <p><strong>Số điện thoại:</strong> {noiDung.phoneHoSo}</p>
                        <p><strong>Học vấn:</strong> {noiDung.hocVan}</p>
                        <p><strong>Quốc gia:</strong> {noiDung.quocGia}</p>
                        <p><strong>Tỉnh:</strong> {noiDung.tinh}</p>
                        <p><strong>Quận/Huyện:</strong> {noiDung.quanHuyen}</p>
                        <p><strong>Địa chỉ:</strong> {noiDung.diaChi}</p>
                    </div>

                    <div className="mt-6 flex gap-3">
                        <button
                            onClick={() => setEditMode(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                        >
                            ✏️ Sửa thông tin
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                        >
                            ← Quay lại
                        </button>
                    </div>
                </>
            ) : (
                <div className="space-y-4">
                    {Object.keys(form).map((key) => {
                        if (key === "HosoID") return null;

                        // Dropdown cho GioiTinh
                        if (key === "GioiTinh") {
                            return (
                                <div key={key}>
                                    <label className="block font-medium">{labels[key]}</label>
                                    <select
                                        name={key}
                                        value={form[key]}
                                        onChange={handleChange}
                                        className="w-full border px-3 py-2 rounded focus:outline-none focus:border-primary"
                                    >
                                        <option value="">--Chọn--</option>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                        <option value="Khác">Khác</option>
                                    </select>
                                </div>
                            );
                        }

                        const type = key === "MailHoSo"
                            ? "email"
                            : key === "NgaySinh"
                                ? "date"
                                : "text";
                        return (
                            <div key={key}>
                                <label className="block font-medium">{labels[key]}</label>
                                <input
                                    type={type}
                                    name={key}
                                    value={form[key]}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded focus:outline-none focus:border-primary"
                                />
                            </div>
                        );
                    })}

                    <div className="mt-4 flex gap-3">
                        <button
                            onClick={handleSave}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                        >
                            💾 Lưu
                        </button>
                        <button
                            onClick={() => setEditMode(false)}
                            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-sm">
                        <p
                            className={`text-lg mb-4 ${modalType === "error"
                                ? "text-red-600"
                                : modalType === "success"
                                    ? "text-green-600"
                                    : "text-gray-700"
                                }`}
                        >
                            {modalMsg}
                        </p>
                        <button
                            onClick={() => setShowModal(false)}
                            className="w-full bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )}
        </div>
        </>
    );
}

export default NoiDungHoSoPage;
