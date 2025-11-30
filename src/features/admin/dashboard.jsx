import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { variables } from '../../variables';

import {
  BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [quickStatsChart, setQuickStatsChart] = useState([]); // 🔥 Thêm state cho biểu đồ nhanh
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");


  const [ungTuyenStats, setUngTuyenStats] = useState(null);
  const [chartTopTin, setChartTopTin] = useState([]);
  const [chartTrangThai, setChartTrangThai] = useState([]);

  // ⭐ Load thống kê nhanh
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = Cookies.get('jwt_token');

        const res = await axios.get(
          `${variables.API_URL}Admin/tin-tuyen-dung`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setStats(res.data);

        // ⭐ Chuyển dữ liệu thành dạng biểu đồ
        const quickChart = [
          { name: "Từ ngày", value: res.data.tuNgay },
          { name: "Hôm nay", value: res.data.ngay },
          { name: "Tuần này", value: res.data.tuan },
          { name: "Tháng này", value: res.data.thang },
          { name: "Năm nay", value: res.data.nam }
        ];
        setQuickStatsChart(quickChart);

        const res2 = await axios.get(
          `${variables.API_URL}Admin/ung-tuyen`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setUngTuyenStats(res2.data);

        // ⭐ Chuẩn bị dữ liệu biểu đồ Tin nhiều nhất
        const topTinChart = [
          { name: "Từ ngày", value: res2.data.tinNhieuNhat.tuNgay?.soLuong || 0 },
          { name: "Hôm nay", value: res2.data.tinNhieuNhat.ngay?.soLuong || 0 },
          { name: "Tuần", value: res2.data.tinNhieuNhat.tuan?.soLuong || 0 },
          { name: "Tháng", value: res2.data.tinNhieuNhat.thang?.soLuong || 0 },
          { name: "Năm", value: res2.data.tinNhieuNhat.nam?.soLuong || 0 }
        ];
        setChartTopTin(topTinChart);

        // ⭐ Chuẩn bị dữ liệu biểu đồ trạng thái
        const trangThaiChart = [
          { name: "Từ ngày", ...convertTrangThai(res2.data.trangThai.tuNgay) },
          { name: "Hôm nay", ...convertTrangThai(res2.data.trangThai.ngay) },
          { name: "Tuần", ...convertTrangThai(res2.data.trangThai.tuan) },
          { name: "Tháng", ...convertTrangThai(res2.data.trangThai.thang) },
          { name: "Năm", ...convertTrangThai(res2.data.trangThai.nam) },
        ];

        setChartTrangThai(trangThaiChart);


      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // ⭐ Lọc theo ngày — giữ nguyên code của bạn
  const handleFilter = async () => {
    if (!fromDate || !toDate) return alert("Vui lòng chọn đầy đủ ngày");

    try {
      const token = Cookies.get("jwt_token");

      const res = await axios.get(
        `${variables.API_URL}Admin/tin-tuyen-dung-theo-ngay?fromDate=${fromDate}&toDate=${toDate}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const formatted = res.data.map(item => ({
        Ngay: new Date(item.ngay).toLocaleDateString("vi-VN"),
        SoLuong: item.soLuong
      }));

      setChartData(formatted);
    } catch (err) {
      console.error(err);
      alert("Lỗi tải dữ liệu thống kê theo ngày");
    }
  };


  const convertTrangThai = (arr) => {
    return {
      choDuyet: arr?.find(x => x.trangThai === "Đang chờ duyệt")?.soLuong || 0,
      tuChoi: arr?.find(x => x.trangThai === "Từ chối")?.soLuong || 0,
      phongVan: arr?.find(x => x.trangThai === "Phỏng vấn")?.soLuong || 0,
      daDuyet: arr?.find(x => x.trangThai === "Đã duyệt")?.soLuong || 0
    };
  };


  if (loading) return <div>Đang tải dữ liệu...</div>;

  return (
    <div className="container mx-auto p-4">

      <h1 className="text-2xl font-bold mb-6">📊 Thống kê</h1>

      {/* --- Lọc theo ngày --- */}
      <div className="bg-white p-4 shadow rounded mb-6">
        <h2 className="text-lg font-semibold mb-3">Lọc tin đăng theo ngày</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="date"
            className="border rounded p-2"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            type="date"
            className="border rounded p-2"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          <button
            onClick={handleFilter}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary"
          >
            Xem thống kê
          </button>
        </div>
      </div>

      {/* --- Biểu đồ theo ngày --- */}
      <div className="bg-white p-4 shadow rounded mb-6">
        <h2 className="text-lg font-semibold mb-4">Biểu đồ số tin đăng theo ngày</h2>

        {chartData.length === 0 ? (
          <p className="text-gray-500">Chưa có dữ liệu. Vui lòng chọn ngày.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Ngay" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="SoLuong" fill="#6439FF" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* --- ⭐ Biểu đồ thống kê nhanh --- */}
      <div className="bg-white p-4 shadow rounded mb-6">
        <h2 className="text-lg font-semibold mb-4">Biểu đồ thống kê tin nhanh</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={quickStatsChart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#FF8C00" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* --- Cards thống kê nhanh --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">Từ ngày ban đầu</h2>
          <p className="text-2xl">{stats.tuNgay}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">Hôm nay</h2>
          <p className="text-2xl">{stats.ngay}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">Tuần này</h2>
          <p className="text-2xl">{stats.tuan}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">Tháng này</h2>
          <p className="text-2xl">{stats.thang}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">Năm nay</h2>
          <p className="text-2xl">{stats.nam}</p>
        </div>
      </div>


      <div className="bg-white p-4 shadow rounded mb-6 mt-4">
        <h2 className="text-lg font-semibold mb-4">Tin được ứng tuyển nhiều nhất</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartTopTin}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#00BFFF" />
          </BarChart>
        </ResponsiveContainer>
      </div>


      <div className="bg-white p-4 shadow rounded mb-6">
        <h2 className="text-lg font-semibold mb-4">Thống kê trạng thái ứng tuyển</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartTrangThai}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="choDuyet" stackId="a" fill="#FFA500" name="Đang chờ duyệt" />
            <Bar dataKey="tuChoi" stackId="a" fill="#FF0000" name="Từ chối" />
            <Bar dataKey="phongVan" stackId="a" fill="#00CED1" name="Phỏng vấn" />
            <Bar dataKey="daDuyet" stackId="a" fill="#32CD32" name="Đã duyệt" />
          </BarChart>
        </ResponsiveContainer>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-semibold">Ứng tuyển (từ ngày ban đầu)</h2>
          <p className="text-2xl">{ungTuyenStats?.tuNgay}</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-semibold">Hôm nay</h2>
          <p className="text-2xl">{ungTuyenStats?.ngay}</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-semibold">Tuần</h2>
          <p className="text-2xl">{ungTuyenStats?.tuan}</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-semibold">Tháng</h2>
          <p className="text-2xl">{ungTuyenStats?.thang}</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-semibold">Năm</h2>
          <p className="text-2xl">{ungTuyenStats?.nam}</p>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
