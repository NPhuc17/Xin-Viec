import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { variables } from '../variables';
import logo from '../assets/logo.png';

function EmployerNavbar() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const tkName = localStorage.getItem('tkName');
    if (tkName) {
      setUsername(tkName);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(variables.API_URL + 'Register/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('tkName');
      localStorage.removeItem('tkId');
      localStorage.removeItem('role');
      setUsername('');
      navigate('/employer/login');
    }
  };

  return (
    <nav className='flex justify-between items-center p-4   relative bg-[var(--color-primary)]'>
      {/* Bên trái */}
      <div className='flex items-center gap-6'>
        <Link to="/">
          <img src={logo} alt="Logo" className='w-15 h-15' />
        </Link>
        {/* <div className="relative group">
          <button className="font-medium hover:text-blue-600">
            Tìm việc làm
          </button>
          <ul className="absolute top-full left-0 mt-2 w-52 bg-white border border-gray-200 shadow-lg rounded-md z-50 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
            <li><Link to="/searched-jobs" className="block px-4 py-2 hover:bg-gray-100">Tìm kiếm việc làm</Link></li>
            <li><Link to="/saved-jobs" className="block px-4 py-2 hover:bg-gray-100">Việc làm đã lưu</Link></li>
            <li><Link to="/applied-jobs" className="block px-4 py-2 hover:bg-gray-100">Việc làm đã ứng tuyển</Link></li>
            <li><Link to="/recommended-jobs" className="block px-4 py-2 hover:bg-gray-100">Việc làm phù hợp</Link></li>
          </ul>
        </div>

        <ul>Tạo hồ sơ</ul> */}
        <ul>
          <Link to="/jobcreate" className="text-white hover:text-highlight">Tạo tin tuyển dụng</Link>
        </ul>
      </div>

      {/* Bên phải */}
      <div className='flex flex-row gap-4'>
        <div className="relative group">
          {username ? (
            <>
              <button className='text-accent font-medium hover:text-highlight'>
                Xin chào {username}
              </button>
              <ul className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md z-50 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
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
        <div>
          <Link to="/employer/company">

            <h3 className='hover:text-highlight text-white'>Khai báo công ty</h3>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default EmployerNavbar;