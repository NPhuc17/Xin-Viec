import React from 'react';
import { NavLink } from 'react-router-dom';

function Leftside() {
    return (
        <nav className="bg-primary text-white h-screen w-64 p-6 flex flex-col gap-4">
            <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                    isActive ? "text-accent" : "hover:text-highlight"
                }
            >
                Dashboard
            </NavLink>
            <NavLink
                to="/admin/employers"
                className={({ isActive }) =>
                    isActive ? "text-accent" : "hover:text-highlight"
                }
            >
                Duyệt nhà tuyển dụng
            </NavLink>
            <NavLink
                to="/admin/jobs"
                className={({ isActive }) =>
                    isActive ? "text-accent" : "hover:text-highlight"
                }
            >
                Duyệt tin tuyển dụng
            </NavLink>
            <NavLink
                to="/admin/reports"
                className={({ isActive }) =>
                    isActive ? "text-accent" : "hover:text-highlight"
                }
            >
                Xử lý báo cáo
            </NavLink>

            <NavLink
                to="/admin/linhvuc"
                className={({ isActive }) =>
                    isActive ? "text-accent" : "hover:text-highlight"
                }
            >
                Quản lý lĩnh vực
            </NavLink>

            <NavLink
                to="/admin/company"
                className={({ isActive }) =>
                    isActive ? "text-accent" : "hover:text-highlight"
                }
            >
                Quản lý công ty
            </NavLink>

            <NavLink
                to="/admin/bangcap"
                className={({ isActive }) =>
                    isActive ? "text-accent" : "hover:text-highlight"
                }
            >
                Quản lý bằng cấp
            </NavLink>

            <NavLink
                to="/admin/chucdanh"
                className={({ isActive }) =>
                    isActive ? "text-accent" : "hover:text-highlight"
                }
            >
                Quản lý chức danh
            </NavLink>

             <NavLink
                to="/admin/kinhnghiem"
                className={({ isActive }) =>
                    isActive ? "text-accent" : "hover:text-highlight"
                }
            >
                Quản lý kinh nghiệm
            </NavLink>
             <NavLink
                to="/admin/loaihinh"
                className={({ isActive }) =>
                    isActive ? "text-accent" : "hover:text-highlight"
                }
            >
                Quản lý loại hình làm việc
            </NavLink>
             <NavLink
                to="/admin/vitri"
                className={({ isActive }) =>
                    isActive ? "text-accent" : "hover:text-highlight"
                }
            >
                Quản lý loại vị trí việc làm
            </NavLink>
        </nav>
    );
}

export default Leftside;