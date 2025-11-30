// src/components/ProtectedAdminRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

function ProtectedAdminRoute() {
  const token = Cookies.get("jwt_token");
  const role = localStorage.getItem("role");

  // ❌ Nếu chưa đăng nhập hoặc không phải admin → chuyển về trang login
  if (!token || role !== "Admin") {
    return <Navigate to="/admin/login" replace />;
  }

  // ✅ Nếu có token và đúng quyền admin → cho phép vào
  return <Outlet />;
}

export default ProtectedAdminRoute;
