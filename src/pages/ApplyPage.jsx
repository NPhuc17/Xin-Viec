import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { variables } from "../variables";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function ApplyPage() {
  const { id } = useParams(); // id tin tuyển dụng
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [info, setInfo] = useState(null); // null = chưa có TTCN
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);

  const token = Cookies.get("jwt_token");

  // === 1️⃣ Load dữ liệu ban đầu ===
  useEffect(() => {
    if (!token) {
      alert("Vui lòng đăng nhập bằng tài khoản Ứng Viên.");
      navigate("/login");
      return;
    }
    loadResumes();
    loadPersonalInfo();
    checkApplied();
  }, []);

  // === 2️⃣ Lấy danh sách hồ sơ ===
  async function loadResumes() {
    try {
      const res = await fetch(`${variables.API_URL}HoSo/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setResumes(data.data || []);
    } catch (err) {
      console.error(err);
    }
  }

  // === 3️⃣ Lấy thông tin cá nhân ===
  async function loadPersonalInfo() {
    try {
      const res = await fetch(`${variables.API_URL}ThongTinCaNhan/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 404) {
        setInfo(null); // Chưa có TTCN
        setLoading(false);
        return;
      }

      const data = await res.json();
      if (res.ok) setInfo(data);
      else setInfo(null);
    } catch (err) {
      setInfo(null);
    } finally {
      setLoading(false);
    }
  }

  // === 4️⃣ Kiểm tra đã ứng tuyển chưa ===
  async function checkApplied() {
    try {
      const res = await fetch(`${variables.API_URL}UngTuyen/cua-toi`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        const found = data.some((d) => d.tieuDeTin && d.tieuDeTin.includes(String(id)));
        setApplied(found);
      }
    } catch (err) {
      console.error(err);
    }
  }

  // === 5️⃣ Cập nhật thông tin cá nhân form ===
  function handleChange(e) {
    setInfo({ ...info, [e.target.name]: e.target.value });
  }

  // === 6️⃣ Gửi yêu cầu ứng tuyển ===
  async function handleSubmit(e) {
    e.preventDefault();

    if (!info) {
      alert("Vui lòng tạo thông tin cá nhân trước khi ứng tuyển!");
      return;
    }

    if (!selectedResume) {
      alert("Vui lòng chọn hồ sơ trước khi ứng tuyển!");
      return;
    }

    const payload = {
      tinTuyenDungId: parseInt(id),
      hoSoId: selectedResume,
      ...info,
    };

    try {
      const res = await fetch(`${variables.API_URL}UngTuyen/nop-don`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Ứng tuyển thành công!");
        setApplied(true);
      } else {
        alert(data.message || "Ứng tuyển thất bại!");
      }
    } catch (err) {
      alert("Lỗi kết nối máy chủ");
    }
  }

  if (loading) return <div>Đang tải...</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Ứng tuyển công việc</h1>

        {/* 🧾 Chọn hồ sơ */}
        <section className="mb-6 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-3">Chọn hồ sơ của bạn</h2>
          {resumes.length === 0 ? (
            <p>
              Bạn chưa có hồ sơ.{" "}
              <button
                className="text-blue-600 underline"
                onClick={() => navigate("/profile")}
              >
                Tải hồ sơ ngay
              </button>
            </p>
          ) : (
            <select
              className="border rounded px-3 py-2 w-full"
              value={selectedResume || ""}
              onChange={(e) => setSelectedResume(e.target.value)}
              required
            >
              <option value="">-- Chọn hồ sơ --</option>
              {resumes.map((r) => (
                <option key={r.hsid} value={r.hsid}>
                  {r.hsName}
                </option>
              ))}
            </select>
          )}
        </section>

        {/* 👤 Thông tin cá nhân */}
        <section className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-xl font-semibold mb-3">Thông tin cá nhân</h2>

          {info === null ? (
            <div className="text-center">
              <p className="mb-3 text-red-600">Bạn chưa có thông tin cá nhân.</p>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => navigate("/personal-info")}
              >
                Tạo thông tin cá nhân
              </button>
            </div>
          ) : (
            <form className="space-y-3">
              {[
                { label: "Họ và tên", name: "hoVaTen" },
                { label: "Giới tính", name: "gioiTinh" },
                { label: "Ngày sinh", name: "ngaySinh", type: "date" },
                { label: "Số điện thoại", name: "sdt" },
                { label: "Email", name: "email" },
                { label: "Quốc gia", name: "quocGia" },
                { label: "Tỉnh", name: "tinh" },
                { label: "Huyện", name: "huyen" },
                { label: "Địa chỉ", name: "diaChi" },
                { label: "CCCD", name: "cccd" },
                { label: "Nơi sinh", name: "noiSinh" },
              ].map((f) => (
                <div key={f.name}>
                  <label className="block font-medium mb-1">{f.label}</label>
                  <input
                    type={f.type || "text"}
                    name={f.name}
                    value={
                      f.name === "ngaySinh" && info.ngaySinh
                        ? info.ngaySinh.split("T")[0]
                        : info[f.name] || ""
                    }
                    onChange={handleChange}
                    className="border rounded w-full px-3 py-2"
                  />
                </div>
              ))}
            </form>
          )}
        </section>

        {/* ✅ Nút ứng tuyển */}
        <button
          onClick={handleSubmit}
          disabled={applied || !info}
          className={`w-full py-3 rounded text-white text-lg ${
            applied || !info ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {applied ? "Đã ứng tuyển" : "Xác nhận ứng tuyển"}
        </button>
      </div>

      <Footer />
    </>
  );
}

export default ApplyPage;
