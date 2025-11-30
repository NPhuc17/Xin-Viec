import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { variables } from "../../variables";
import Cookies from "js-cookie";

function Adminloginpage() {
    const [form, setForm] = useState({
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [modalMsg, setModalMsg] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        try {
            const res = await fetch(variables.API_URL + "Register/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    mail: form.username,
                    password: form.password,
                }),
                credentials: "include", // Cho phép nhận cookie nếu server set
            });

            const data = await res.json();

            if (!res.ok) {
                setModalMsg(data.message || "Sai thông tin đăng nhập.");
                setShowModal(true);
                return;
            }

            // ✅ Lưu JWT token vào cookie (hạn 2 giờ)
            Cookies.set("jwt_token", data.token, {
                expires: 1 / 12, // 2 giờ
                secure: true,
                sameSite: "None", // Cho phép cookie cross-site (frontend khác port backend)
            });

            // ✅ Lưu thông tin khác trong localStorage
            localStorage.setItem("tkName", data.tkName);
            localStorage.setItem("tkId", data.tkId);
            localStorage.setItem("role", data.role);

            // ✅ Kiểm tra role — chỉ cho phép Admin đăng nhập trang này
            if (data.role === "Admin") {
                navigate("/admin");
            } else {
                setModalMsg("Tài khoản này không phải Admin.");
                setShowModal(true);
            }
        } catch (err) {
            console.error(err);
            setModalMsg("Có lỗi xảy ra, vui lòng thử lại!");
            setShowModal(true);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
                <h2 className="text-2xl font-bold mb-4">Đăng nhập Admin</h2>

                <div className="mb-4">
                    <label className="block mb-1">Tên tài khoản (Email)</label>
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                    {errors.username && (
                        <div className="text-red-500 text-sm mt-1">{errors.username}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block mb-1">Mật khẩu</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                    {errors.password && (
                        <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded cursor-pointer"
                >
                    Đăng nhập
                </button>

                {/* <div className="mt-4 text-center">
                    <span>Nếu chưa có tài khoản, </span>
                    <Link to="/register" className="text-accent underline">
                        Đăng ký
                    </Link>
                </div> */}

                <div className="mt-4 text-center">
                    <span>Quên mật khẩu? </span>
                    <Link to="/reset" className="text-accent underline">
                        Đặt lại
                    </Link>
                </div>
            </form>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <p className="text-lg mb-4">{modalMsg}</p>
                        <button
                            onClick={() => setShowModal(false)}
                            className="bg-primary text-white px-4 py-2 rounded"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}



export default Adminloginpage