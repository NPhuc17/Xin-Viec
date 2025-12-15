// import React from 'react';
// import { NavLink } from 'react-router-dom';

// function Leftside() {
//     return (
//         <nav className="bg-primary text-white h-screen w-64 p-6 flex flex-col gap-4">
//             <NavLink
//                 to="/admin/dashboard"
//                 className={({ isActive }) =>
//                     isActive ? "text-accent" : "hover:text-highlight"
//                 }
//             >
//                 Dashboard
//             </NavLink>
//             <NavLink
//                 to="/admin/employers"
//                 className={({ isActive }) =>
//                     isActive ? "text-accent" : "hover:text-highlight"
//                 }
//             >
//                 Duyệt nhà tuyển dụng
//             </NavLink>
//             <NavLink
//                 to="/admin/jobs"
//                 className={({ isActive }) =>
//                     isActive ? "text-accent" : "hover:text-highlight"
//                 }
//             >
//                 Duyệt tin tuyển dụng
//             </NavLink>
//             <NavLink
//                 to="/admin/reports"
//                 className={({ isActive }) =>
//                     isActive ? "text-accent" : "hover:text-highlight"
//                 }
//             >
//                 Xử lý báo cáo
//             </NavLink>

//             <NavLink
//                 to="/admin/linhvuc"
//                 className={({ isActive }) =>
//                     isActive ? "text-accent" : "hover:text-highlight"
//                 }
//             >
//                 Quản lý lĩnh vực
//             </NavLink>

//             <NavLink
//                 to="/admin/company"
//                 className={({ isActive }) =>
//                     isActive ? "text-accent" : "hover:text-highlight"
//                 }
//             >
//                 Quản lý công ty
//             </NavLink>

//             <NavLink
//                 to="/admin/bangcap"
//                 className={({ isActive }) =>
//                     isActive ? "text-accent" : "hover:text-highlight"
//                 }
//             >
//                 Quản lý bằng cấp
//             </NavLink>

//             <NavLink
//                 to="/admin/chucdanh"
//                 className={({ isActive }) =>
//                     isActive ? "text-accent" : "hover:text-highlight"
//                 }
//             >
//                 Quản lý chức danh
//             </NavLink>

//              <NavLink
//                 to="/admin/kinhnghiem"
//                 className={({ isActive }) =>
//                     isActive ? "text-accent" : "hover:text-highlight"
//                 }
//             >
//                 Quản lý kinh nghiệm
//             </NavLink>
//              <NavLink
//                 to="/admin/loaihinh"
//                 className={({ isActive }) =>
//                     isActive ? "text-accent" : "hover:text-highlight"
//                 }
//             >
//                 Quản lý loại hình làm việc
//             </NavLink>
//              <NavLink
//                 to="/admin/vitri"
//                 className={({ isActive }) =>
//                     isActive ? "text-accent" : "hover:text-highlight"
//                 }
//             >
//                 Quản lý loại vị trí việc làm
//             </NavLink>

//             <NavLink
//                 to="/admin/vitri"
//                 className={({ isActive }) =>
//                     isActive ? "text-accent" : "hover:text-highlight"
//                 }
//             >
//                 Thông báo
//             </NavLink>

//         </nav>
//     );
// }

// export default Leftside;


import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { variables } from '../../variables';

function Leftside() {
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = Cookies.get('jwt_token'); // lấy token từ cookie
        if (!token) return;

        const res = await fetch(`${variables.API_URL}ThongTinCaNhan/thong-bao-cua-toi`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) return;
        const data = await res.json();
        if (data?.danhSachThongBao?.some((n) => !n.daXem)) {
          setHasNewNotification(true);
        } else {
          setHasNewNotification(false);
        }
      } catch (err) {
        console.error('Lỗi tải thông báo:', err);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // check 30s
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(variables.API_URL + 'Register/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem('tkName');
      localStorage.removeItem('tkId');
      localStorage.removeItem('role');
      Cookies.remove('jwt_token');

      navigate('/admin/login');
    }
  };

  return (
    <nav className="bg-primary text-white h-screen w-64 p-6 flex flex-col gap-4">
      <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "text-accent" : "hover:text-highlight"}>Dashboard</NavLink>
      {/* <NavLink to="/admin/employers" className={({ isActive }) => isActive ? "text-accent" : "hover:text-highlight"}>Duyệt nhà tuyển dụng</NavLink> */}
      <NavLink to="/admin/jobs" className={({ isActive }) => isActive ? "text-accent" : "hover:text-highlight"}>Duyệt tin tuyển dụng</NavLink>
      {/* <NavLink to="/admin/reports" className={({ isActive }) => isActive ? "text-accent" : "hover:text-highlight"}>Xử lý báo cáo</NavLink> */}
      <NavLink to="/admin/linhvuc" className={({ isActive }) => isActive ? "text-accent" : "hover:text-highlight"}>Quản lý lĩnh vực</NavLink>
      <NavLink to="/admin/company" className={({ isActive }) => isActive ? "text-accent" : "hover:text-highlight"}>Quản lý công ty</NavLink>
      <NavLink to="/admin/bangcap" className={({ isActive }) => isActive ? "text-accent" : "hover:text-highlight"}>Quản lý bằng cấp</NavLink>
      <NavLink to="/admin/chucdanh" className={({ isActive }) => isActive ? "text-accent" : "hover:text-highlight"}>Quản lý chức danh</NavLink>
      <NavLink to="/admin/kinhnghiem" className={({ isActive }) => isActive ? "text-accent" : "hover:text-highlight"}>Quản lý kinh nghiệm</NavLink>
      <NavLink to="/admin/loaihinh" className={({ isActive }) => isActive ? "text-accent" : "hover:text-highlight"}>Quản lý loại hình làm việc</NavLink>
      <NavLink to="/admin/vitri" className={({ isActive }) => isActive ? "text-accent" : "hover:text-highlight"}>Quản lý vị trí việc làm</NavLink>
      <NavLink to="/admin/baocao" className={({ isActive }) => isActive ? "text-accent" : "hover:text-highlight"}>Danh sách báo cáo</NavLink>
      <NavLink to="/admin/baocao-khoa" className={({ isActive }) => isActive ? "text-accent" : "hover:text-highlight"}>Danh sách tin đã khoá</NavLink>

      {/* 🔔 Thông báo */}
      <NavLink
        to="/admin/thong-bao"
        className={({ isActive }) =>
          hasNewNotification
            ? "text-red-500 font-semibold" // có thông báo mới
            : isActive
              ? "text-accent"
              : "hover:text-highlight"
        }
      >
        Thông báo
      </NavLink>
      <button
        onClick={handleLogout}
        className="mt-auto bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded text-left"
      >
        Đăng xuất
      </button>

    </nav>
  );
}

export default Leftside;

