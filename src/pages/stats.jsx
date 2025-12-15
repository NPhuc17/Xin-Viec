import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import axios from 'axios'
import Cookies from 'js-cookie'
import { variables } from '../variables'

import {
  BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts'

function Stats() {

  const navigate = useNavigate()

  const [stats, setStats] = useState(null)
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = Cookies.get('jwt_token')
    const role = localStorage.getItem('role')


    if (!token || role !== 'UngVien') {
      navigate('/login', { replace: true })
      return
    }

    const fetchStats = async () => {
      try {
        const res = await axios.get(
          `${variables.API_URL}Admin/thong-ke-ung-tuyen-cua-toi`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        setStats(res.data)

        setChartData([
          { name: 'Từ lúc bắt đầu', value: res.data.tuNgay },
          { name: 'Hôm nay', value: res.data.ngay },
          { name: 'Tuần này', value: res.data.tuan },
          { name: 'Tháng này', value: res.data.thang },
          { name: 'Năm nay', value: res.data.nam }
        ])

      } catch (err) {
        if (err.response?.status === 401) {
          Cookies.remove('jwt_token')
          navigate('/login', { replace: true })
        }
        console.error('Lỗi tải thống kê:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [navigate])

  if (loading) {
    return <div className="text-center mt-10">Đang tải dữ liệu...</div>
  }

  return (
    <>
      <Navbar />

      <div className="container mx-auto p-6">

        {/* <h1 className="text-2xl font-bold mb-6">📊 Thống kê ứng tuyển của tôi</h1> */}

        {/* --- Cards thống kê --- */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-4 shadow rounded">
            <h2 className="font-semibold">Từ lúc bắt đầu</h2>
            <p className="text-2xl">{stats.tuNgay}</p>
          </div>

          <div className="bg-white p-4 shadow rounded">
            <h2 className="font-semibold">Hôm nay</h2>
            <p className="text-2xl">{stats.ngay}</p>
          </div>

          <div className="bg-white p-4 shadow rounded">
            <h2 className="font-semibold">Tuần này</h2>
            <p className="text-2xl">{stats.tuan}</p>
          </div>

          <div className="bg-white p-4 shadow rounded">
            <h2 className="font-semibold">Tháng này</h2>
            <p className="text-2xl">{stats.thang}</p>
          </div>

          <div className="bg-white p-4 shadow rounded">
            <h2 className="font-semibold">Năm nay</h2>
            <p className="text-2xl">{stats.nam}</p>
          </div>
        </div>

        {/* --- Biểu đồ thống kê nhanh --- */}
        <div className="bg-white p-4 shadow rounded mb-10">
          <h2 className="text-lg font-semibold mb-4">
            Biểu đồ thống kê số lượng ứng tuyển
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6439FF" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      <Footer />
    </>
  )
}

export default Stats
