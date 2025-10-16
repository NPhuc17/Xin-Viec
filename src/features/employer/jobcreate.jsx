import React, { useState, useEffect, use } from "react";
import { variables } from "../../variables";
import { useNavigate } from "react-router-dom";

function CompanyPostJob() {
    const navigate = useNavigate();
    const [userId, setuserId] = useState('');

    const [form, setForm] = useState({
        tieuDe: "",
        mieuTa: "",
        daDuyet: false,
        trangThai: "Đang tuyển",
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

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [options, setOptions] = useState({
        loaihinh: [],
        chucdanh: [],
        kinhnghiem: [],
        bangcap: [],
        linhvuc: [],
        vitri: [],
    });

    const [loading, setLoading] = useState(true);
    const [modalMsg, setModalMsg] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("info");

    useEffect(() => {
        const tkId = localStorage.getItem('tkId');
        const role = localStorage.getItem('role');
        if (!tkId || role !== 'NhaTuyenDung') {
            setModalMsg('Bạn cần đăng nhập với tài khoản nhà tuyển dụng để đăng tin.');
            setModalType('error');
            setShowModal(true);
            setTimeout(() => navigate('/employer/login'), 2000);
        } else {
            setIsAuthenticated(true);
        }
    }, [navigate]);


    useEffect(() => {
        if (!isAuthenticated) return;

        // 🔹 Gọi API lấy thông tin user hiện tại
        fetch(variables.API_URL + "Register/whoami", {
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Không thể lấy thông tin người dùng.");
                return res.json();
            })
            .then((data) => {
                if (data && data.userId) {
                    setuserId(data.userId);
                }
            })
            .catch((err) => {
                console.error("Lỗi lấy ID người dùng:", err);
            });
    }, [isAuthenticated]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    useEffect(() => {
        if (!isAuthenticated) return;
        const fetchOptions = {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        };
        Promise.all([
            fetch(variables.API_URL + "LoaiHinhLamViec/list", fetchOptions).then((r) => r.json()),
            fetch(variables.API_URL + "ChucDanh/list", fetchOptions).then((r) => r.json()),
            fetch(variables.API_URL + "KinhNghiem/list", fetchOptions).then((r) => r.json()),
            fetch(variables.API_URL + "BangCap/list", fetchOptions).then((r) => r.json()),
            fetch(variables.API_URL + "LinhVuc/list", fetchOptions).then((r) => r.json()),
            fetch(variables.API_URL + "ViTri/list", fetchOptions).then((r) => r.json()),
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
                console.error("Lỗi tải dropdown:", err);
                setLoading(false);
            });
    }, [isAuthenticated]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            setModalMsg('Bạn cần đăng nhập để đăng tin.');
            setModalType('error');
            setShowModal(true);
            return;
        }
        try {
            const res = await fetch(variables.API_URL + "TInTuyenDung/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    ...form,
                    ntdid: ntdId, // ✅ thêm ID nhà tuyển dụng
                }),
                credentials: "include",
            });

            let data;
            const contentType = res.headers.get('content-type');

            if (contentType && contentType.includes('application/json')) {
                data = await res.json();
            } else {
                const text = await res.text();
                console.error('Non-JSON response:', text);
                data = { message: text || 'Lỗi từ máy chủ' };
            }

            if (!res.ok) {
                setModalMsg(data.message || data.Message || "Đăng tin thất bại!");
                setModalType('error');
                setShowModal(true);
            } else {
                setModalMsg(data.message || data.Message || "Đăng tin thành công!");
                setModalType('success');
                setShowModal(true);
                setTimeout(() => {
                    setForm({
                        tieuDe: "",
                        mieuTa: "",
                        daDuyet: false,
                        trangThai: "Đang tuyển",
                        yeuCau: "",
                        tuoi: "",
                        hanNop: "",
                        loaihinhID: "",
                        chucdanhID: "",
                        kinhnghiemID: "",
                        kinhnghiemID: "",
                        bangcapID: "",
                        linhvucIID: "",
                        vitriID: "",
                       
                    });
                }, 1500);
            }
        } catch (error) {
            console.error('Submit error:', error);
            setModalMsg(error.message || "Lỗi kết nối máy chủ!");
            setModalType('error');
            setShowModal(true);
        }
    };

    if (loading) return <p className="text-center mt-6">Đang tải dữ liệu...</p>;
    if (!isAuthenticated) return null;

    return (
        // <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
        //     <h2 className="text-2xl font-bold mb-6 text-center">Đăng tin tuyển dụng</h2>

        //     <form onSubmit={handleSubmit} className="space-y-4">
        //         {/* Tiêu đề */}
        //         <div>
        //             <label className="block font-medium mb-1">Tiêu đề công việc</label>
        //             <input
        //                 type="text"
        //                 name="tieuDe"
        //                 value={form.tieuDe}
        //                 onChange={handleChange}
        //                 className="w-full border rounded px-3 py-2"
        //                 required
        //             />
        //         </div>

        //         {/* Miêu tả */}
        //         <div>
        //             <label className="block font-medium mb-1">Miêu tả công việc</label>
        //             <textarea
        //                 name="mieuTa"
        //                 value={form.mieuTa}
        //                 onChange={handleChange}
        //                 className="w-full border rounded px-3 py-2 h-24"
        //                 required
        //             ></textarea>
        //         </div>
        //         {/* Yêu cầu */}
        //         <div>
        //             <label className="block font-medium mb-1">Yêu cầu công việc</label>
        //             <textarea
        //                 name="yeuCau"
        //                 value={form.yeuCau}
        //                 onChange={handleChange}
        //                 className="w-full border rounded px-3 py-2 h-20"
        //             ></textarea>
        //         </div>

        //         {/* Tuổi */}
        //         <div>
        //             <label className="block font-medium mb-1">Độ tuổi yêu cầu</label>
        //             <input
        //                 type="number"
        //                 name="tuoi"
        //                 value={form.tuoi}
        //                 onChange={handleChange}
        //                 className="w-full border rounded px-3 py-2"
        //                 placeholder="VD: 22"
        //             />
        //         </div>

        //         {/* Hạn nộp */}
        //         <div>
        //             <label className="block font-medium mb-1">Hạn nộp hồ sơ</label>
        //             <input
        //                 type="date"
        //                 name="hanNop"
        //                 value={form.hanNop}
        //                 onChange={handleChange}
        //                 className="w-full border rounded px-3 py-2"
        //                 required
        //             />
        //         </div>

        //         {/* Dropdown chọn thông tin */}
        //         <div className="grid grid-cols-2 gap-4">
        //             {/* Loại hình */}
        //             <div>
        //                 <label className="block font-medium mb-1">Loại hình làm việc</label>
        //                 <select
        //                     name="loaihinhID"
        //                     value={form.loaihinhID}
        //                     onChange={handleChange}
        //                     className="w-full border rounded px-3 py-2"
        //                     required
        //                 >
        //                     <option value="">-- Chọn loại hình --</option>
        //                     {options.loaihinh.map((item) => (
        //                         <option key={item.lhID} value={item.lhID}>
        //                             {item.lhName}
        //                         </option>
        //                     ))}
        //                 </select>
        //             </div>

        //             {/* Chức danh */}
        //             <div>
        //                 <label className="block font-medium mb-1">Chức danh</label>
        //                 <select
        //                     name="chucdanhID"
        //                     value={form.chucdanhID}
        //                     onChange={handleChange}
        //                     className="w-full border rounded px-3 py-2"
        //                     required
        //                 >
        //                     <option value="">-- Chọn chức danh --</option>
        //                     {options.chucdanh.map((item) => (
        //                         <option key={item.cdID} value={item.cdID}>
        //                             {item.cdName}
        //                         </option>
        //                     ))}
        //                 </select>
        //             </div>

        //             {/* Kinh nghiệm */}
        //             <div>
        //                 <label className="block font-medium mb-1">Kinh nghiệm</label>
        //                 <select
        //                     name="kinhnghiemID"
        //                     value={form.kinhnghiemID}
        //                     onChange={handleChange}
        //                     className="w-full border rounded px-3 py-2"
        //                     required
        //                 >
        //                     <option value="">-- Chọn kinh nghiệm --</option>
        //                     {options.kinhnghiem.map((item) => (
        //                         <option key={item.knid} value={item.knid}>
        //                             {item.knName}
        //                         </option>
        //                     ))}
        //                 </select>
        //             </div>

        //             {/* Bằng cấp */}
        //             <div>
        //                 <label className="block font-medium mb-1">Bằng cấp</label>
        //                 <select
        //                     name="bangcapID"
        //                     value={form.bangcapID}
        //                     onChange={handleChange}
        //                     className="w-full border rounded px-3 py-2"
        //                     required
        //                 >
        //                     <option value="">-- Chọn bằng cấp --</option>
        //                     {options.bangcap.map((item) => (
        //                         <option key={item.bcID} value={item.bcID}>
        //                             {item.bcName}
        //                         </option>
        //                     ))}
        //                 </select>
        //             </div>

        //             {/* Lĩnh vực */}
        //             <div>
        //                 <label className="block font-medium mb-1">Lĩnh vực</label>
        //                 <select
        //                     name="linhvucIID"
        //                     value={form.linhvucIID}
        //                     onChange={handleChange}
        //                     className="w-full border rounded px-3 py-2"
        //                     required
        //                 >
        //                     <option value="">-- Chọn lĩnh vực --</option>
        //                     {options.linhvuc.map((item) => (
        //                         <option key={item.lvID} value={item.lvID}>
        //                             {item.lvName}
        //                         </option>
        //                     ))}
        //                 </select>
        //             </div>

        //             {/* Vị trí */}
        //             <div>
        //                 <label className="block font-medium mb-1">Vị trí</label>
        //                 <select
        //                     name="vitriID"
        //                     value={form.vitriID}
        //                     onChange={handleChange}
        //                     className="w-full border rounded px-3 py-2"
        //                     required
        //                 >
        //                     <option value="">-- Chọn vị trí --</option>
        //                     {options.vitri.map((item) => (
        //                         <option key={item.vtID} value={item.vtID}>
        //                             {item.vtName}
        //                         </option>
        //                     ))}
        //                 </select>
        //             </div>
        //         </div>


        //         {/* Nút submit */}
        //         <button
        //             type="submit"
        //             className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90 transition"
        //         >
        //             Đăng tin
        //         </button>
        //     </form>

        //     {/* Modal thông báo */}
        //     {showModal && (
        //         <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
        //             <div className="bg-white p-6 rounded shadow-lg">
        //                 <p className={`text-lg mb-4 ${modalType === 'error' ? 'text-red-600' :
        //                     modalType === 'success' ? 'text-green-600' :
        //                         'text-gray-700'
        //                     }`}>{modalMsg}</p>
        //                 <button
        //                     onClick={() => setShowModal(false)}
        //                     className="bg-primary text-white px-4 py-2 rounded"
        //                 >
        //                     Đóng
        //                 </button>
        //             </div>
        //         </div>
        //     )}
        // </div>
        <>
            <div>{userId}</div>
        </>
    );
}

export default CompanyPostJob;
