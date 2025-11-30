
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { variables } from '../variables';
import logo from '../assets/logo.png';
import NotificationBell from './NotificationBell';
import Cookies from 'js-cookie';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
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
      Cookies.remove('jwt_token');
      setUsername('');
      navigate('/login');
    }
  };

  return (
    <nav className='flex justify-between items-center p-4 bg-primary relative'>

      {/* ====== LEFT ====== */}
      <div className='flex items-center gap-6'>

        <Link to="/">
          <img src={logo} alt="Logo" className='w-15 h-15' />
        </Link>

        {/* --- MENU DESKTOP --- */}
        <div className="hidden md:flex items-center gap-6">

          <div className="relative group">
            <button className=" hover:text-highlight text-white">Việc làm</button>
            <ul className="absolute top-full left-0 mt-2 w-52 bg-white border border-gray-200 shadow-lg rounded-md z-50 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
              <li><Link to="/search" className="block px-4 py-2 hover:bg-gray-100">Tìm kiếm việc làm</Link></li>
              <li><Link to="/saved-jobs" className="block px-4 py-2 hover:bg-gray-100">Việc làm đã lưu</Link></li>
              <li><Link to="/applied-jobs" className="block px-4 py-2 hover:bg-gray-100">Việc làm đã ứng tuyển</Link></li>
              <li><Link to="/recommended-jobs" className="block px-4 py-2 hover:bg-gray-100">Việc làm phù hợp</Link></li>
            </ul>
          </div>

          <ul className='text-white hover:text-highlight'>
            <Link to="/profile">Tạo hồ sơ</Link>
          </ul>
        </div>
      </div>

      {/* ====== RIGHT (DESKTOP) ====== */}
      <div className='hidden md:flex flex-row gap-4'>

        <div className="relative group">
          {username ? (
            <>
              <button className='text-accent font-medium hover:text-highlight'>
                Xin chào {username}
              </button>
              <ul className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md z-50 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                <li><button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={handleLogout}>Đăng xuất</button></li>
                <li><button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => navigate("/personal-info")}>Thông tin cá nhân</button></li>
              </ul>
            </>
          ) : (
            <Link to="/login">
              <h3 className='hover:text-highlight text-white'>Đăng nhập/Đăng ký</h3>
            </Link>
          )}
        </div>

        <div>
          <Link to="/employer">
            <h3 className='hover:text-highlight text-white'>Cho nhà tuyển dụng</h3>
          </Link>
        </div>

        <div><NotificationBell logoutSignal={username === ''} /></div>
      </div>

      {/* ====== MOBILE TOP BAR ====== */}
<div className="md:hidden flex items-center justify-between w-full">

  {/* BÊN TRÁI: Đăng nhập / Xin chào */}
  <div className="text-white text-lg ml-5">
    {username ? (
      <span className="text-accent">{username}</span>
    ) : (
      <Link to="/login" className="hover:text-highlight">
        Đăng nhập/Đăng ký
      </Link>
    )}
  </div>

  {/* BÊN PHẢI: Chuông + Hamburger */}
  <div className="flex items-center gap-4">
    <button
      className="text-white text-2xl"
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? <FaTimes /> : <FaBars />}
    </button>
    <NotificationBell logoutSignal={username === ''} />

  </div>

</div>


      {/* ====== MOBILE MENU ====== */}
      {isOpen && (
  <div className="absolute top-full left-0 w-full bg-primary text-white flex flex-col gap-2 p-5 md:hidden shadow-lg z-50">

    <Link to="/search" onClick={() => setIsOpen(false)} className="block w-full text-left py-2">
      Tìm kiếm việc làm
    </Link>

    <Link to="/saved-jobs" onClick={() => setIsOpen(false)} className="block w-full text-left py-2">
      Việc làm đã lưu
    </Link>

    <Link to="/applied-jobs" onClick={() => setIsOpen(false)} className="block w-full text-left py-2">
      Việc làm đã ứng tuyển
    </Link>

    <Link to="/recommended-jobs" onClick={() => setIsOpen(false)} className="block w-full text-left py-2">
      Việc làm phù hợp
    </Link>

    <Link to="/profile" onClick={() => setIsOpen(false)} className="block w-full text-left py-2">
      Tạo hồ sơ
    </Link>

    {username ? (
      <>
        <button 
          onClick={() => { handleLogout(); setIsOpen(false); }} 
          className="block w-full text-left py-2"
        >
          Đăng xuất
        </button>

        <button 
          onClick={() => { navigate("/personal-info"); setIsOpen(false); }} 
          className="block w-full text-left py-2"
        >
          Thông tin cá nhân
        </button>
      </>
    ) : (
      <Link to="/login" onClick={() => setIsOpen(false)} className="block w-full text-left py-2">
        Đăng nhập/Đăng ký
      </Link>
    )}

    <Link to="/employer" onClick={() => setIsOpen(false)} className="block w-full text-left py-2">
      Cho nhà tuyển dụng
    </Link>

    

  </div>
)}

    </nav>
  );
}

export default Navbar;
