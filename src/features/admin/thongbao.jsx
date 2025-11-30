import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { variables } from '../../variables';
import { useNavigate } from 'react-router-dom';

function ThongBao() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = Cookies.get('jwt_token');
        if (!token) return;

        const res = await fetch(`${variables.API_URL}ThongTinCaNhan/thong-bao-cua-toi`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Lỗi khi tải thông báo');

        const data = await res.json();
        setNotifications(data.danhSachThongBao || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // 👉 Khi click bất kỳ thông báo -> chuyển đến /admin/jobs
  const goToJobs = () => {
    navigate('/admin/jobs');
  };

  return (
    <div className="flex-1 p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Tất cả thông báo</h2>

      {loading ? (
        <div>Đang tải thông báo...</div>
      ) : notifications.length === 0 ? (
        <div>Không có thông báo nào.</div>
      ) : (
        <ul className="space-y-4">
          {notifications.map((item) => (
            <li
              key={item.thongBaoId}
              onClick={goToJobs}
              className={`p-4 rounded-lg border cursor-pointer transition 
                ${item.daXem ? 'bg-white' : 'bg-gray-100 font-semibold'} 
                hover:bg-gray-200`}
            >
              <div dangerouslySetInnerHTML={{ __html: item.noiDung }}></div>
              <div className="text-sm text-gray-500 mt-1">{item.ngayBao}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ThongBao;
