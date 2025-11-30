// components/Footer.jsx
import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-secondary text-white mt-5 bottom-0 left-0 right-0">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo / Brand */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-accent">JobConnect</h2>
          <p className="text-gray-300 text-sm">
            Kết nối nhà tuyển dụng và ứng viên tiềm năng nhanh chóng và hiệu quả.
          </p>
          <div className="flex space-x-3">
            <a href="#" className="hover:text-accent transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-accent transition"><FaTwitter /></a>
            <a href="#" className="hover:text-accent transition"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-accent transition"><FaInstagram /></a>
          </div>
        </div>

        {/* Liên kết nhanh */}
        <div>
          <h3 className="font-semibold mb-4">Liên kết nhanh</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/" className="hover:text-accent transition">Trang chủ</a></li>
            <li><a href="/search" className="hover:text-accent transition">Tìm việc</a></li>
            <li><a href="/employer" className="hover:text-accent transition">Nhà tuyển dụng</a></li>
            <li><a href="/jobcreate" className="hover:text-accent transition">Đăng tin tuyển dụng</a></li>
          </ul>
        </div>

        {/* Hỗ trợ */}
        <div>
          <h3 className="font-semibold mb-4">Hỗ trợ</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-accent transition">Liên hệ</a></li>
            <li><a href="#" className="hover:text-accent transition">Câu hỏi thường gặp</a></li>
            <li><a href="#" className="hover:text-accent transition">Chính sách bảo mật</a></li>
            <li><a href="#" className="hover:text-accent transition">Điều khoản sử dụng</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-4">Liên hệ</h3>
          <p className="text-gray-300 text-sm mb-2">Địa chỉ: 123, Đường ABC, Quận 1, TP.HCM</p>
          <p className="text-gray-300 text-sm mb-2">Email: tuanvu27102004@gmail.com</p>
          <p className="text-gray-300 text-sm">Hotline: 0901 234 567</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 text-center py-4 text-gray-400 text-sm">
        © {new Date().getFullYear()} JobConnect. Bản quyền thuộc về JobConnect.
      </div>
    </footer>
  );
}

export default Footer;
