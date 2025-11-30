// import React, { useState, useEffect } from "react";
// import { variables } from "../../variables";
// import { useNavigate, useParams } from "react-router-dom";
// import Employernavbar from "../../components/Employernavbar";

// function JobModify() {
//     const navigate = useNavigate();
//     const { id } = useParams(); // lấy ttdid từ URL
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [loading, setLoading] = useState(true);

//     const [form, setForm] = useState({
//         tieuDe: "",
//         mieuTa: "",
//         daDuyet: false,
//         trangThai: "Chờ duyệt",
//         yeuCau: "",
//         tuoi: "",
//         hanNop: "",
//         loaihinhID: "",
//         chucdanhID: "",
//         kinhnghiemID: "",
//         bangcapID: "",
//         linhvucIID: "",
//         vitriID: "",
//     });

//     const [options, setOptions] = useState({
//         loaihinh: [],
//         chucdanh: [],
//         kinhnghiem: [],
//         bangcap: [],
//         linhvuc: [],
//         vitri: [],
//     });

//     const [modalMsg, setModalMsg] = useState("");
//     const [showModal, setShowModal] = useState(false);
//     const [modalType, setModalType] = useState("info");

//     // ✅ Kiểm tra đăng nhập
//     useEffect(() => {
//         const role = localStorage.getItem("role");
//         if (role !== "NhaTuyenDung") {
//             setModalMsg("Bạn cần đăng nhập bằng tài khoản nhà tuyển dụng để chỉnh sửa tin.");
//             setModalType("error");
//             setShowModal(true);
//             setTimeout(() => navigate("/employer/login"), 2000);
//         } else {
//             setIsAuthenticated(true);
//         }
//     }, [navigate]);

//     // ✅ Lấy danh sách dropdown
//     useEffect(() => {
//         if (!isAuthenticated) return;
//         const opts = { credentials: "include" };
//         Promise.all([
//             fetch(variables.API_URL + "LoaiHinhLamViec/list", opts).then((r) => r.json()),
//             fetch(variables.API_URL + "ChucDanh/list", opts).then((r) => r.json()),
//             fetch(variables.API_URL + "KinhNghiem/list", opts).then((r) => r.json()),
//             fetch(variables.API_URL + "BangCap/list", opts).then((r) => r.json()),
//             fetch(variables.API_URL + "LinhVuc/list", opts).then((r) => r.json()),
//             fetch(variables.API_URL + "ViTri/list", opts).then((r) => r.json()),
//         ])
//             .then(([loaihinh, chucdanh, kinhnghiem, bangcap, linhvuc, vitri]) => {
//                 setOptions({
//                     loaihinh: loaihinh.data || [],
//                     chucdanh: chucdanh.data || [],
//                     kinhnghiem: kinhnghiem.data || [],
//                     bangcap: bangcap.data || [],
//                     linhvuc: linhvuc.data || [],
//                     vitri: vitri.data || [],
//                 });
//             })
//             .then(() => fetchJob())
//             .catch((err) => {
//                 console.error("Lỗi tải dữ liệu:", err);
//                 setLoading(false);
//             });
//     }, [isAuthenticated]);

//     // ✅ Lấy dữ liệu tin cần sửa
//     const fetchJob = async () => {
//         try {
//             const res = await fetch(variables.API_URL + `TInTuyenDung/${id}`, {
//                 credentials: "include",
//             });
//             const data = await res.json();
//             if (res.ok && data.data) {
//                 setForm({
//                     tieuDe: data.data.tieuDe || "",
//                     mieuTa: data.data.mieuTa || "",
//                     trangThai:  "Chờ duyệt",
//                     yeuCau: data.data.yeuCau || "",
//                     tuoi: data.data.tuoi || "",
//                     hanNop: data.data.hanNop?.slice(0, 10) || "",
//                     loaihinhID: data.data.loaihinhID || "",
//                     chucdanhID: data.data.chucdanhID || "",
//                     kinhnghiemID: data.data.kinhnghiemID || "",
//                     bangcapID: data.data.bangcapID || "",
//                     linhvucIID: data.data.linhvucIID || "",
//                     vitriID: data.data.vitriID || "",
//                 });
//             } else {
//                 setModalMsg(data.message || "Không tải được tin tuyển dụng.");
//                 setModalType("error");
//                 setShowModal(true);
//             }
//         } catch (err) {
//             console.error("Fetch job error:", err);
//             setModalMsg("Lỗi kết nối khi tải tin.");
//             setModalType("error");
//             setShowModal(true);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // ✅ Xử lý input
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setForm((prev) => ({ ...prev, [name]: value }));
//     };

//     // ✅ Cập nhật tin
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const payload = {
//                 ttdid: Number(id),
//                 ...form,
//                 daDuyet: false,
//                 yeuCau: Number(form.yeuCau) || 0,
//                 tuoi: Number(form.tuoi) || 0,
//                 loaihinhID: Number(form.loaihinhID) || 0,
//                 chucdanhID: Number(form.chucdanhID) || 0,
//                 kinhnghiemID: Number(form.kinhnghiemID) || 0,
//                 bangcapID: Number(form.bangcapID) || 0,
//                 linhvucIID: Number(form.linhvucIID) || 0,
//                 vitriID: Number(form.vitriID) || 0,
//             };

//             const res = await fetch(
//                 variables.API_URL + `TInTuyenDung/update/${id}`,  // 🔹 thêm /${id}
//                 {
//                     method: "PUT",
//                     headers: { "Content-Type": "application/json" },
//                     credentials: "include",
//                     body: JSON.stringify(payload),
//                 }
//             );

//             const data = await res.json();
//             if (res.ok) {
//                 setModalMsg(data.message || "Cập nhật thành công!");
//                 setModalType("success");
//             } else {
//                 setModalMsg(data.message || "Cập nhật thất bại!");
//                 setModalType("error");
//             }
//             setShowModal(true);
//         } catch (err) {
//             console.error("Update error:", err);
//             setModalMsg("Lỗi kết nối máy chủ!");
//             setModalType("error");
//             setShowModal(true);
//         }
//     };

//     if (loading) return <p className="text-center mt-6">Đang tải dữ liệu...</p>;
//     if (!isAuthenticated) return null;

//     return (
//         <>
//         <Employernavbar />
//         <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
//             <h2 className="text-2xl font-bold mb-6 text-center">Chỉnh sửa tin tuyển dụng</h2>

//             <form onSubmit={handleSubmit} className="space-y-4">
//                 {/* Tiêu đề */}
//                 <div>
//                     <label className="block font-medium mb-1">Tiêu đề công việc</label>
//                     <input
//                         type="text"
//                         name="tieuDe"
//                         value={form.tieuDe}
//                         onChange={handleChange}
//                         className="w-full border rounded px-3 py-2"
//                         required
//                     />
//                 </div>

//                 {/* Miêu tả */}
//                 <div>
//                     <label className="block font-medium mb-1">Miêu tả công việc</label>
//                     <textarea
//                         name="mieuTa"
//                         value={form.mieuTa}
//                         onChange={handleChange}
//                         className="w-full border rounded px-3 py-2 h-24"
//                         required
//                     ></textarea>
//                 </div>

//                 {/* Yêu cầu & Tuổi */}
//                 <div>
//                     <label className="block font-medium mb-1">Yêu cầu</label>
//                     <input
//                         type="number"
//                         name="yeuCau"
//                         value={form.yeuCau}
//                         onChange={handleChange}
//                         className="w-full border rounded px-3 py-2"
//                     />
//                 </div>

//                 <div>
//                     <label className="block font-medium mb-1">Độ tuổi yêu cầu</label>
//                     <input
//                         type="number"
//                         name="tuoi"
//                         value={form.tuoi}
//                         onChange={handleChange}
//                         className="w-full border rounded px-3 py-2"
//                     />
//                 </div>

//                 {/* Hạn nộp */}
//                 <div>
//                     <label className="block font-medium mb-1">Hạn nộp hồ sơ</label>
//                     <input
//                         type="date"
//                         name="hanNop"
//                         value={form.hanNop}
//                         onChange={handleChange}
//                         className="w-full border rounded px-3 py-2"
//                     />
//                 </div>

//                 {/* Dropdowns */}
//                 <div className="grid grid-cols-2 gap-4">
//                     {[
//                         ["loaihinhID", "Loại hình làm việc", options.loaihinh, "lhid", "lhName"],
//                         ["chucdanhID", "Chức danh", options.chucdanh, "cdid", "cdName"],
//                         ["kinhnghiemID", "Kinh nghiệm", options.kinhnghiem, "knid", "knName"],
//                         ["bangcapID", "Bằng cấp", options.bangcap, "bcid", "bcName"],
//                         ["linhvucIID", "Lĩnh vực", options.linhvuc, "lvid", "lvName"],
//                         ["vitriID", "Vị trí", options.vitri, "vtid", "vtName"],
//                     ].map(([name, label, arr, idKey, textKey]) => (
//                         <div key={name}>
//                             <label className="block font-medium mb-1">{label}</label>
//                             <select
//                                 name={name}
//                                 value={form[name]}
//                                 onChange={handleChange}
//                                 className="w-full border rounded px-3 py-2"
//                                 required
//                             >
//                                 <option value="">-- Chọn {label.toLowerCase()} --</option>
//                                 {arr.map((item) => (
//                                     <option key={item[idKey]} value={item[idKey]}>
//                                         {item[textKey]}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                     ))}
//                 </div>

//                 <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
//                     Lưu thay đổi
//                 </button>
//             </form>

//             {showModal && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
//                     <div className="bg-white p-6 rounded shadow-lg">
//                         <p
//                             className={`text-lg mb-4 ${modalType === "error"
//                                     ? "text-red-600"
//                                     : modalType === "success"
//                                         ? "text-green-600"
//                                         : "text-gray-700"
//                                 }`}
//                         >
//                             {modalMsg}
//                         </p>
//                         <button
//                             onClick={() => setShowModal(false)}
//                             className="bg-blue-600 text-white px-4 py-2 rounded"
//                         >
//                             Đóng
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//         </>
//     );
// }

// export default JobModify;




import React, { useState, useEffect } from "react";
import { variables } from "../../variables";
import { useNavigate, useParams } from "react-router-dom";
import Employernavbar from "../../components/Employernavbar";
import Footer from "../../components/footer";

function JobModify() {
    const navigate = useNavigate();
    const { id } = useParams(); // lấy ttdid từ URL
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        tieuDe: "",
        mieuTa: "",
        trangThai: "Chờ duyệt",
        yeuCau: "",
        tuoi: "",
        hanNop: "",
        loaihinhID: "",
        chucdanhID: "",
        kinhnghiemID: "",
        bangcapID: "",
        linhvucIID: "",
        vitriID: "",
    });

    const [options, setOptions] = useState({
        loaihinh: [],
        chucdanh: [],
        kinhnghiem: [],
        bangcap: [],
        linhvuc: [],
        vitri: [],
    });

    const [modalMsg, setModalMsg] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("info");
    const [canEdit, setCanEdit] = useState(true); // 🔹 kiểm soát quyền sửa

    // ✅ Kiểm tra đăng nhập
    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role !== "NhaTuyenDung") {
            setModalMsg("Bạn cần đăng nhập bằng tài khoản nhà tuyển dụng để chỉnh sửa tin.");
            setModalType("error");
            setShowModal(true);
            setTimeout(() => navigate("/employer/login"), 1000);
        } else {
            setIsAuthenticated(true);
        }
    }, [navigate]);

    // ✅ Lấy danh sách dropdown
    useEffect(() => {
        if (!isAuthenticated) return;
        const opts = { credentials: "include" };
        Promise.all([
            fetch(variables.API_URL + "LoaiHinhLamViec/list", opts).then((r) => r.json()),
            fetch(variables.API_URL + "ChucDanh/list", opts).then((r) => r.json()),
            fetch(variables.API_URL + "KinhNghiem/list", opts).then((r) => r.json()),
            fetch(variables.API_URL + "BangCap/list", opts).then((r) => r.json()),
            fetch(variables.API_URL + "LinhVuc/list", opts).then((r) => r.json()),
            fetch(variables.API_URL + "ViTri/list", opts).then((r) => r.json()),
        ])
            .then(([loaihinh, chucdanh, kinhnghiem, bangcap, linhvuc, vitri]) => {
                setOptions({
                    loaihinh: loaihinh.data || [],
                    chucdanh: chucdanh.data || [],
                    kinhnghiem: kinhnghiem.data || [],
                    bangcap: bangcap.data || [],
                    linhvuc: linhvuc.data || [],
                    vitri: vitri.data || [],
                });
            })
            .then(() => fetchJob())
            .catch((err) => {
                console.error("Lỗi tải dữ liệu:", err);
                setLoading(false);
            });
    }, [isAuthenticated]);

    // ✅ Lấy dữ liệu tin cần sửa
    const fetchJob = async () => {
        try {
            const res = await fetch(variables.API_URL + `TInTuyenDung/${id}`, {
                credentials: "include",
            });
            const data = await res.json();
            if (res.ok && data.data) {
                setForm({
                    tieuDe: data.data.tieuDe || "",
                    mieuTa: data.data.mieuTa || "",
                    trangThai: data.data.trangThai || "Chờ duyệt",
                    yeuCau: data.data.yeuCau || "",
                    tuoi: data.data.tuoi || "",
                    hanNop: data.data.hanNop?.slice(0, 10) || "",
                    loaihinhID: data.data.loaihinhID || "",
                    chucdanhID: data.data.chucdanhID || "",
                    kinhnghiemID: data.data.kinhnghiemID || "",
                    bangcapID: data.data.bangcapID || "",
                    linhvucIID: data.data.linhvucIID || "",
                    vitriID: data.data.vitriID || "",
                });

                // 🔹 Khoá form nếu đã duyệt
                if (data.data.daDuyet || data.data.trangThai === "Đã duyệt") {
                    setCanEdit(false);
                    setModalMsg("Tin tuyển dụng này đã được duyệt, không thể chỉnh sửa.");
                    setModalType("info");
                    setShowModal(true);
                }
            } else {
                setModalMsg(data.message || "Không tải được tin tuyển dụng.");
                setModalType("error");
                setShowModal(true);
            }
        } catch (err) {
            console.error("Fetch job error:", err);
            setModalMsg("Lỗi kết nối khi tải tin.");
            setModalType("error");
            setShowModal(true);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Xử lý input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // ✅ Cập nhật tin
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (!canEdit) return; // 🔹 không cho submit nếu khóa

    //     try {
    //         const payload = {
    //             tieuDe: form.tieuDe,
    //             mieuTa: form.mieuTa,
    //             yeuCau: form.yeuCau,
    //             tuoi: Number(form.tuoi) || 0,
    //             hanNop: form.hanNop,
    //             loaihinhID: Number(form.loaihinhID) || 0,
    //             chucdanhID: Number(form.chucdanhID) || 0,
    //             kinhnghiemID: Number(form.kinhnghiemID) || 0,
    //             bangcapID: Number(form.bangcapID) || 0,
    //             linhvucIID: Number(form.linhvucIID) || 0,
    //             vitriID: Number(form.vitriID) || 0,
    //             trangThai: "Chờ duyệt",
    //         };

    //         const res = await fetch(`${variables.API_URL}TInTuyenDung/update/${id}`, {
    //             method: "PUT",
    //             headers: { "Content-Type": "application/json" },
    //             credentials: "include",
    //             body: JSON.stringify(payload),
    //         });

    //         const data = await res.json();
    //         setModalMsg(res.ok ? data.message : data.message || "Cập nhật thất bại!");
    //         setModalType(res.ok ? "success" : "error");
    //         setShowModal(true);
    //     } catch (err) {
    //         console.error("Update error:", err);
    //         setModalMsg("Lỗi kết nối máy chủ!");
    //         setModalType("error");
    //         setShowModal(true);
    //     }
    // };
    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canEdit) return;

    try {
        const payload = {
            tieuDe: form.tieuDe,
            mieuTa: form.mieuTa,
            yeuCau: form.yeuCau,
            tuoi: Number(form.tuoi) || 0,
            hanNop: form.hanNop,
            loaihinhID: Number(form.loaihinhID) || 0,
            chucdanhID: Number(form.chucdanhID) || 0,
            kinhnghiemID: Number(form.kinhnghiemID) || 0,
            bangcapID: Number(form.bangcapID) || 0,
            linhvucIID: Number(form.linhvucIID) || 0,
            vitriID: Number(form.vitriID) || 0,
            trangThai: "Chờ duyệt",
        };

        const res = await fetch(`${variables.API_URL}TInTuyenDung/update/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
            // Nếu backend trả validation lỗi
            if (data.errors) {
                const allErrors = Object.values(data.errors).flat().join("\n");
                setModalMsg(allErrors);
            } else {
                setModalMsg(data.message || "Cập nhật thất bại!");
            }
            setModalType("error");
            setShowModal(true);
            return;
        }

        // Thành công
        setModalMsg(data.message || "Cập nhật thành công!");
        setModalType("success");
        setShowModal(true);

    } catch (err) {
        console.error("Update error:", err);
        setModalMsg("Lỗi kết nối máy chủ!");
        setModalType("error");
        setShowModal(true);
    }
};


    if (loading) return <p className="text-center mt-6">Đang tải dữ liệu...</p>;
    if (!isAuthenticated) return null;

    return (
        <>
            <Employernavbar />
            <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
                <h2 className="text-2xl font-bold mb-6 text-center">Chỉnh sửa tin tuyển dụng</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium mb-1">Tiêu đề công việc</label>
                        <input
                            type="text"
                            name="tieuDe"
                            value={form.tieuDe}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                            disabled={!canEdit}
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Miêu tả công việc</label>
                        <textarea
                            name="mieuTa"
                            value={form.mieuTa}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 h-24"
                            required
                            disabled={!canEdit}
                        ></textarea>
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Yêu cầu công việc</label>
                        <textarea
                            name="yeuCau"
                            value={form.yeuCau}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 h-24"
                            required
                            disabled={!canEdit}
                        ></textarea>
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Độ tuổi yêu cầu</label>
                        <input
                            type="number"
                            name="tuoi"
                            value={form.tuoi}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            disabled={!canEdit}
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Hạn nộp hồ sơ</label>
                        <input
                            type="date"
                            name="hanNop"
                            value={form.hanNop}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            disabled={!canEdit}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {[
                            ["loaihinhID", "Loại hình làm việc", options.loaihinh, "lhid", "lhName"],
                            ["chucdanhID", "Chức danh", options.chucdanh, "cdid", "cdName"],
                            ["kinhnghiemID", "Kinh nghiệm", options.kinhnghiem, "knid", "knName"],
                            ["bangcapID", "Bằng cấp", options.bangcap, "bcid", "bcName"],
                            ["linhvucIID", "Lĩnh vực", options.linhvuc, "lvid", "lvName"],
                            ["vitriID", "Vị trí", options.vitri, "vtid", "vtName"],
                        ].map(([name, label, arr, idKey, textKey]) => (
                            <div key={name}>
                                <label className="block font-medium mb-1">{label}</label>
                                <select
                                    name={name}
                                    value={form[name]}
                                    onChange={handleChange}
                                    className="w-full border rounded px-3 py-2"
                                    required
                                    disabled={!canEdit}
                                >
                                    <option value="">-- Chọn {label.toLowerCase()} --</option>
                                    {arr.map((item) => (
                                        <option key={item[idKey]} value={item[idKey]}>
                                            {item[textKey]}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-2 rounded ${canEdit ? "bg-green-600 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
                        disabled={!canEdit}
                    >
                        Lưu thay đổi
                    </button>
                </form>

                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                        <div className="bg-white p-6 rounded shadow-lg">
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
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default JobModify;
