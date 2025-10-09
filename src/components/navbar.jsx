import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ username, setUsername }) {
  return (
    <nav className='flex justify-between items-center p-4 border-b-2 border-gray-300 bg-white relative'>
      {/* Bên trái */}
      <div className='flex items-center gap-6'>
        <img src="/logo.png" alt="Logo" className='w-10 h-10' />

        <div className="relative group">
          <button className="font-medium hover:text-blue-600">
            Tìm việc làm
          </button>
          <ul className="absolute top-full left-0 mt-2 w-52 bg-white border border-gray-200 shadow-lg rounded-md z-50 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
            <li><Link to="/saved-jobs" className="block px-4 py-2 hover:bg-gray-100">Việc làm đã lưu</Link></li>
            <li><Link to="/applied-jobs" className="block px-4 py-2 hover:bg-gray-100">Việc làm đã ứng tuyển</Link></li>
            <li><Link to="/recommended-jobs" className="block px-4 py-2 hover:bg-gray-100">Việc làm phù hợp</Link></li>
          </ul>
        </div>

        <ul>Tạo hồ sơ</ul>
      </div>

      {/* Bên phải */}
      <div className='flex flex-row gap-4'>
        <div className="relative group">
          {username ? (
            <>
              <button className='text-blue-600 font-medium hover:text-blue-800'>
                Xin chào {username}
              </button>
              <ul className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md z-50 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      localStorage.removeItem('username');
                      setUsername('');
                    }}
                  >
                    Đăng xuất
                  </button>
                </li>
              </ul>
            </>
          ) : (
            <Link to="/login">
              <h3 className='hover:text-blue-600'>Đăng nhập/Đăng ký</h3>
            </Link>
          )}
        </div>
        <div>
          <h3 className='hover:text-blue-600'>Cho nhà tuyển dụng</h3>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;