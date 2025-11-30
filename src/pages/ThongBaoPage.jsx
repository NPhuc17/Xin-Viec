import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { variables } from "../variables";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/navbar";
import EmployerNavbar from "../components/Employernavbar";
import Footer from "../components/footer";

function ThongBaoPage() {
  const [notifications, setNotifications] = useState([]);
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) setRole(savedRole);

    const token = Cookies.get("jwt_token");
    if (!token) return;

    fetch(`${variables.API_URL}ThongTinCaNhan/thong-bao-cua-toi`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setNotifications(data.danhSachThongBao || []))
      .catch((err) => console.error(err));
  }, []);

  // Navbar theo role
  const renderNavbar = () => {
    if (role === "NhaTuyenDung")
      return (
        <div>
          <EmployerNavbar />
        </div>
      );
    if (role === "UngVien")
      return (
        <div>
          <Navbar />
        </div>
      );
    return null;
  };

  // Hàm chọn route theo role
  const getRedirectLink = (item) => {
    if (item.link) return item.link; // backend có sẵn link

    // backend KHÔNG có link → FE chọn theo role
    if (role === "UngVien") return "/applied-jobs";
    if (role === "NhaTuyenDung") return "/joblist";
    return "/";
  };

  return (
    <>
      {renderNavbar()}

      <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-2xl border border-accent">
        <h2 className="text-2xl font-bold mb-4 text-primary">
          📢 Tất cả thông báo
        </h2>

        {notifications.length === 0 ? (
          <div className="text-gray-600 text-center py-6">
            Không có thông báo nào.
          </div>
        ) : (
          <ul className="divide-y">
            {notifications.map((item) => (
              <li
                key={item.thongBaoId}
                className={`py-4 px-3 rounded-lg cursor-pointer transition-all ${
                  item.daXem
                    ? "bg-white hover:bg-gray-50"
                    : "bg-highlight/20 border-l-4 border-accent hover:bg-highlight"
                }`}
                onClick={() => navigate(getRedirectLink(item))}
              >
                <div
                  className="text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.noiDung }}
                ></div>

                <div className="text-sm text-gray-500 mt-1">
                  {item.ngayBao}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Footer />
    </>
  );
}

export default ThongBaoPage;
