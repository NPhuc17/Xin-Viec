import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { variables } from "../variables";
import Cookies from "js-cookie";

function NotificationBell({ logoutSignal }) {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasNew, setHasNew] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  let timeout;

  // Fetch thông báo
  const fetchNotifications = async () => {
    const token = Cookies.get("jwt_token");
    if (!token) {
      setNotifications([]);
      setHasNew(false);
      return;
    }

    try {
      const res = await fetch(`${variables.API_URL}ThongTinCaNhan/thong-bao-cua-toi`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) return;

      const data = await res.json();
      if (data.danhSachThongBao) {
        setNotifications(data.danhSachThongBao.slice(0, 5)); // 5 tin gần nhất
        setHasNew(data.danhSachThongBao.some(n => !n.daXem));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Khi component mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Reset khi logout
  useEffect(() => {
    if (logoutSignal) {
      setNotifications([]);
      setHasNew(false);
    }
  }, [logoutSignal]);

  const handleMouseEnter = () => {
    clearTimeout(timeout);
    setShowDropdown(true);
    fetchNotifications();
  };

  const handleMouseLeave = () => {
    timeout = setTimeout(() => setShowDropdown(false), 200);
  };

  return (
  <div
    className="relative"
    ref={dropdownRef}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  >
    {/* Nút chuông */}
    <button className="relative p-2 rounded-full transition-all duration-200 hover:bg-[var(--color-secondary)]">
      {hasNew ? (
        <div className="w-6 h-6 relative">
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.15 2.5C10.06 1.56 12.23 1.38 14.24 1.98C14.64 2.1 14.86 2.52 14.75 2.92C14.63 3.32 14.21 3.54 13.81 3.42C12.16 2.93 10.38 3.07 8.82 3.85C7.08 4.71 5.99 6.48 5.99 8.42V9.75C5.99 11.17 5.63 12.57 4.96 13.82L4.73 14.24C3.82 15.92 4.81 18 6.69 18.35C10.03 18.96 13.45 18.96 16.78 18.35L16.94 18.32C18.82 17.97 19.86 15.95 19.06 14.21L18.8 13.64C18.41 12.8 18.16 11.91 18.05 11C17.99 10.59 18.29 10.22 18.7 10.17C19.11 10.12 19.49 10.41 19.54 10.82C19.63 11.58 19.84 12.32 20.16 13.01L20.42 13.58C21.64 16.2 20.06 19.27 17.21 19.79L17.05 19.82C13.54 20.47 9.93 20.47 6.42 19.82C3.54 19.29 2.02 16.1 3.41 13.53L3.64 13.11C4.19 12.08 4.49 10.92 4.49 9.75V8.42C4.49 5.92 5.91 3.62 8.15 2.5Z"
              fill="#ffffff"
            />
            {/* Chấm đỏ -> highlight theme */}
            <circle cx="18" cy="6" r="3" fill="var(--color-accent)" />
          </svg>
        </div>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-6 h-6 text-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 19.25C15 20.05 14.68 20.81 14.12 21.37C13.56 21.93 12.8 22.25 12 22.25C11.2 22.25 10.44 21.93 9.88 21.37C9.32 20.81 9 20.05 9 19.25"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.58 18.25C5.09 18.15 4.66 17.86 4.37 17.46C4.08 17.05 3.95 16.55 4.01 16.05L5.01 7.94C5.27 6.27 6.12 4.75 7.4 3.66C8.69 2.57 10.32 1.98 12.01 2C13.7 1.98 15.33 2.57 16.62 3.66C17.91 4.75 18.76 6.27 19.01 7.94L20.01 16.05C20.07 16.55 19.95 17.05 19.66 17.45C19.37 17.86 18.94 18.14 18.45 18.25C14.22 19.24 9.81 19.24 5.58 18.25Z"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>

    {/* Dropdown */}
    {showDropdown && (
      <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-[var(--color-highlight)] z-50 overflow-hidden">
        <div className="p-3 font-semibold border-b bg-[var(--color-primary)] text-white rounded-t-2xl">
          Thông báo
        </div>

        {notifications.length === 0 ? (
          <div className="p-3 text-sm text-gray-500">Không có thông báo nào</div>
        ) : (
          <ul className="max-h-80 overflow-y-auto">
            {notifications.map((item) => (
              <li
                key={item.thongBaoId}
                className={`p-3 border-b text-sm transition-all duration-150 ${
                  item.daXem
                    ? "bg-white"
                    : "bg-[var(--color-highlight)]/30 font-medium"
                } hover:bg-[var(--color-secondary)]/10`}
                dangerouslySetInnerHTML={{ __html: item.noiDung }}
              />
            ))}
          </ul>
        )}

        <div
          onClick={() => navigate("/thong-bao")}
          className="text-center py-2 cursor-pointer bg-[var(--color-accent)] text-white hover:bg-[var(--color-secondary)] font-semibold transition-all duration-200"
        >
          Xem tất cả
        </div>
      </div>
    )}
  </div>
);

}

export default NotificationBell;
