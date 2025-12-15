import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { variables } from '../variables';
import logo from '../assets/logo.png';
import NotificationBell from './NotificationBell';
import Cookies from "js-cookie";
import { FaBars, FaTimes } from "react-icons/fa";

function EmployerNavbar() {
  const [username, setUsername] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const tkName = localStorage.getItem('tkName');
    if (tkName) setUsername(tkName);
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
      localStorage.removeItem('ctID');
      Cookies.remove('jwt_token');
      setUsername('');
      navigate('/employer/login');
    }
  };

  return (
    <nav className='flex justify-between items-center p-4 bg-primary relative'>

      {/* ====== LEFT ====== */}
      <div className="flex items-center gap-6">
        {/* LOGO luôn ở bên trái */}
        <Link to="/employer">
          <img src={logo} alt="Logo" className='w-15 h-15' />
        </Link>

        {/* MENU DESKTOP (bên phải logo) */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/jobcreate" className="text-white hover:text-highlight">Tạo tin tuyển dụng</Link>
          <Link to="/joblist" className="text-white hover:text-highlight">Danh sách tin tuyển dụng</Link>
          <Link to="/employer/stats" className="text-white hover:text-highlight">Thống kê tin tuyển</Link>
        </div>
      </div>

      {/* ====== RIGHT DESKTOP ====== */}
      <div className='hidden md:flex flex-row gap-4'>
        <div className="relative group">
          {username ? (
            <>
              <button className='text-accent font-medium hover:text-highlight'>
                Xin chào {username}
              </button>
              <ul className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 
                shadow-lg rounded-md z-50 opacity-0 group-hover:opacity-100 invisible group-hover:visible 
                transition-all duration-200">
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </button>
                </li>
              </ul>
            </>
          ) : (
            <Link to="/employer/login">
              <h3 className='hover:text-highlight text-white'>Đăng nhập/Đăng ký</h3>
            </Link>
          )}
        </div>

        <Link to="/employer/company" className="text-white hover:text-highlight">
          Khai báo công ty
        </Link>

        <NotificationBell logoutSignal={username === ''} />
      </div>

      {/* ====== MOBILE TOP BAR ====== */}
      <div className="md:hidden flex items-center justify-between w-full">

        {/* BÊN TRÁI: Đăng nhập / Xin chào */}
        <div className="text-white text-lg ml-5">
          {username ? (
            <span className="text-accent">{username}</span>
          ) : (
            <Link to="/employer/login" className="hover:text-highlight">
              Đăng nhập/Đăng ký
            </Link>
          )}
        </div>

        {/* BÊN PHẢI: Chuông + Hamburger */}
        <div className="flex items-center gap-4">
          <NotificationBell logoutSignal={username === ''} />
          <button
            className="text-white text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* ====== MOBILE MENU ====== */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-primary text-white 
          flex flex-col gap-2 p-5 md:hidden shadow-lg z-50">

          <Link to="/jobcreate" onClick={() => setIsOpen(false)} className="block py-2">
            Tạo tin tuyển dụng
          </Link>

          <Link to="/joblist" onClick={() => setIsOpen(false)} className="block py-2">
            Danh sách tin tuyển dụng
          </Link>
          <Link to="/employer/stats" onClick={() => setIsOpen(false)} className="block py-2">
            Thống kê tin tuyển
          </Link>

          <Link to="/employer/company" onClick={() => setIsOpen(false)} className="block py-2">
            Khai báo công ty
          </Link>

          {username ? (
            <button
              onClick={() => { handleLogout(); setIsOpen(false); }}
              className="block text-left py-2"
            >
              Đăng xuất
            </button>
          ) : (
            <Link to="/employer/login" onClick={() => setIsOpen(false)} className="block py-2">
              Đăng nhập/Đăng ký
            </Link>
          )}
        </div>
      )}

    </nav>
  );
}

export default EmployerNavbar;

