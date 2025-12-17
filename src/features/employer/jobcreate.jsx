import React, { useState, useEffect } from "react";
import { variables } from "../../variables";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Footer from "../../components/footer";
import EmployerNavbar from "../../components/employernavbar";
function CompanyPostJob() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);



    const [form, setForm] = useState({
        tieuDe: "",
        mieuTa: "",
        daDuyet: false,
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

    // Kiểm tra đăng nhập
    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role !== "NhaTuyenDung") {
            setModalMsg("Bạn cần đăng nhập bằng tài khoản nhà tuyển dụng để đăng tin.");
            setModalType("error");
            setShowModal(true);
            setTimeout(() => navigate("/employer/login"), 2000);
        } else {
            setIsAuthenticated(true);
        }
    }, [navigate]);

    // Lấy dữ liệu dropdown
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
                setLoading(false);
            })
            .catch((err) => {
                console.error("Lỗi tải dữ liệu:", err);
                setLoading(false);
            });
    }, [isAuthenticated]);

    // Cập nhật form
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Gửi API đăng tin
    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     // Hàm tiện ích để chuyển đổi giá trị, đảm bảo không phải là NaN
    //     const safeNumber = (value) => {
    //         const num = Number(value);
    //         // Trả về số nếu hợp lệ, ngược lại trả về 0
    //         return isNaN(num) ? 0 : num;
    //     };

    //     try {
    //         const payload = {
    //             tieuDe: form.tieuDe,
    //             mieuTa: form.mieuTa,
    //             daDuyet: false,
    //             trangThai: form.trangThai,
    //             // yeuCau, tuoi sử dụng Number() bình thường vì chúng là input number
    //             yeuCau: Number(form.yeuCau) || 0,
    //             tuoi: Number(form.tuoi) || 0,
    //             hanNop: form.hanNop,
    //             // SỬ DỤNG safeNumber ĐỂ ĐẢM BẢO GIÁ TRỊ LUÔN LÀ SỐ HOẶC 0
    //             loaihinhID: safeNumber(form.loaihinhID),
    //             chucdanhID: safeNumber(form.chucdanhID),
    //             kinhnghiemID: safeNumber(form.kinhnghiemID),
    //             bangcapID: safeNumber(form.bangcapID),
    //             linhvucIID: safeNumber(form.linhvucIID),
    //             vitriID: safeNumber(form.vitriID),
    //         };

    //         console.log("Payload gửi đi:", payload); // Kiểm tra payload đã sửa

    //         const res = await fetch(variables.API_URL + "TInTuyenDung/add", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             credentials: "include", // gửi cookie JWT
    //             body: JSON.stringify(payload),
    //         });

    //         const contentType = res.headers.get("content-type");
    //         const data = contentType?.includes("application/json")
    //             ? await res.json()
    //             : { Message: await res.text() };

    //         if (!res.ok) {
    //             setModalMsg(data.Message || "Đăng tin thất bại!");
    //             setModalType("error");
    //             setShowModal(true);
    //             return;
    //         }

    //         setModalMsg(data.Message || "Đăng tin thành công!");
    //         setModalType("success");
    //         setShowModal(true);
    //         setForm({
    //             tieuDe: "",
    //             mieuTa: "",
    //             daDuyet: false,
    //             trangThai: "Đang tuyển",
    //             yeuCau: "",
    //             tuoi: "",
    //             hanNop: "",
    //             loaihinhID: "",
    //             chucdanhID: "",
    //             kinhnghiemID: "",
    //             bangcapID: "",
    //             linhvucIID: "",
    //             vitriID: "",
    //         });
    //     } catch (err) {
    //         console.error("Submit error:", err);
    //         setModalMsg("Lỗi kết nối máy chủ!");
    //         setModalType("error");
    //         setShowModal(true);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const jwt_token = Cookies.get("jwt_token"); // lấy token JWT đã lưu

        if (!jwt_token

        ) {
            setModalMsg("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!");
            setModalType("error");
            setShowModal(true);
            setTimeout(() => navigate("/employer/login"), 1000);
            return;
        }

        const payload = {
            tieuDe: form.tieuDe,
            mieuTa: form.mieuTa,
            daDuyet: false,
            trangThai: form.trangThai,
            yeuCau: form.yeuCau,
            tuoi: Number(form.tuoi) || 0,
            hanNop: form.hanNop,
            loaihinhID: Number(form.loaihinhID) || 0,
            chucdanhID: Number(form.chucdanhID) || 0,
            kinhnghiemID: Number(form.kinhnghiemID) || 0,
            bangcapID: Number(form.bangcapID) || 0,
            linhvucIID: Number(form.linhvucIID) || 0,
            vitriID: Number(form.vitriID) || 0,
        };

        try {
            const res = await fetch(variables.API_URL + "TInTuyenDung/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt_token}`, // 👈 gửi token kèm header
                },
                body: JSON.stringify(payload),
                credentials: "include"
            });

            const data = await res.json();

            if (!res.ok) {
                // Nếu là lỗi validation
                if (data.errors) {
                    const allErrors = Object.values(data.errors).flat().join("\n");
                    setModalMsg(allErrors); // hiện lỗi vào modal
                } else {
                    setModalMsg(data.title || "Đăng tin thất bại!");
                }

                if (
                    data.message &&
                    data.message.includes("kê khai đầy đủ thông tin công ty")
                ) {
                    setModalMsg(data.message);
                    setModalType("need_company");
                    setShowModal(true);
                    return;
                }

                setModalType("error");
                setShowModal(true);
                return;
            }

            setModalMsg(data.Message || "Đăng tin thành công!");
            setModalType("success");
            setShowModal(true);
            setForm({
                tieuDe: "",
                mieuTa: "",
                daDuyet: false,
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
        } catch (err) {
            console.error("Submit error:", err);
            setModalMsg("Lỗi ", err);
            setModalType("error");
            setShowModal(true);
        }
    };

    if (loading) return <p className="text-center mt-6">Đang tải dữ liệu...</p>;
    if (!isAuthenticated) return null;

    return (
        <>
            <EmployerNavbar />
            <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
                <h2 className="text-2xl font-bold mb-6 text-center">Đăng tin tuyển dụng</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Tiêu đề */}
                    <div>
                        <label className="block font-medium mb-1">Tiêu đề công việc</label>
                        <input
                            type="text"
                            name="tieuDe"
                            value={form.tieuDe}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>

                    {/* Miêu tả */}
                    <div>
                        <label className="block font-medium mb-1">Miêu tả công việc</label>
                        <textarea
                            name="mieuTa"
                            value={form.mieuTa}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 h-24"
                            required
                        ></textarea>
                    </div>

                    {/* Yêu cầu */}
                    <div>
                        <label className="block font-medium mb-1">Yêu cầu công việc</label>
                        <textarea
                            name="yeuCau"
                            value={form.yeuCau}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 h-24"
                            placeholder="Lương"
                            required
                        ></textarea>
                    </div>

                    {/* Tuổi */}
                    <div>
                        <label className="block font-medium mb-1">Độ tuổi yêu cầu</label>
                        <input
                            type="number"
                            name="tuoi"
                            value={form.tuoi}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    {/* Hạn nộp */}
                    <div>
                        <label className="block font-medium mb-1">Hạn nộp hồ sơ</label>
                        <input
                            type="date"
                            name="hanNop"
                            value={form.hanNop}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>

                    {/* Dropdowns */}
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            ["loaihinhID", "Loại hình làm việc", options.loaihinh, "lhid", "lhName"], // Đã SỬA lhID -> lhid
                            ["chucdanhID", "Chức danh", options.chucdanh, "cdid", "cdName"], // Đã SỬA cdID -> cdid
                            ["kinhnghiemID", "Kinh nghiệm", options.kinhnghiem, "knid", "knName"], // ĐÚNG
                            ["bangcapID", "Bằng cấp", options.bangcap, "bcid", "bcName"], // Đã SỬA bcID -> bcid
                            ["linhvucIID", "Lĩnh vực", options.linhvuc, "lvid", "lvName"], // Đã SỬA lvID -> lvid
                            ["vitriID", "Vị trí", options.vitri, "vtid", "vtName"], // Đã SỬA vtID -> vtid
                        ].map(([name, label, arr, idKey, textKey]) => (
                            <div key={name}>
                                <label className="block font-medium mb-1">{label}</label>
                                <select
                                    name={name}
                                    value={form[name]}
                                    onChange={handleChange}
                                    className="w-full border rounded px-3 py-2"
                                    required
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

                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
                        Đăng tin
                    </button>
                </form>

                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                        <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                            <p
                                className={`text-lg mb-6 ${modalType === "error"
                                        ? "text-red-600"
                                        : modalType === "success"
                                            ? "text-green-600"
                                            : "text-blue-600"
                                    }`}
                            >
                                {modalMsg}
                            </p>

                            <div className="flex justify-end gap-3">
                                {/* Trường hợp cần kê khai công ty */}
                                {modalType === "need_company" && (
                                    <button
                                        onClick={() => {
                                            setShowModal(false);
                                            navigate("/employer/company"); // 👈 chuyển trang
                                        }}
                                        className="bg-blue-600 text-white px-4 py-2 rounded"
                                    >
                                        Cập nhật công ty
                                    </button>
                                )}

                                <button
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-300 px-4 py-2 rounded"
                                >
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
            <Footer />
        </>
    );
}

export default CompanyPostJob;