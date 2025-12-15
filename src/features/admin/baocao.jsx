import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { variables } from '../../variables'

function BaoCao() {
  const [baoCaos, setBaoCaos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetch(variables.API_URL + 'ToCao')
      .then(res => {
        if (!res.ok) throw new Error('Không thể tải danh sách tố cáo')
        return res.json()
      })
      .then(data => {
        setBaoCaos(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Đang tải dữ liệu...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="p-5">
      {baoCaos.map(item => (
        <div
          key={item.id}
          onClick={() => navigate(`/admin/bao-cao/${item.id}`)}
          className="
            border-2 border-accent rounded-2xl mb-4 p-4
            cursor-pointer hover:bg-gray-50 transition
          "
        >
          <div className="flex justify-between">
            <span
              className={`font-bold ${
                item.trangThai === 'Chờ xử lý'
                  ? 'text-orange-500'
                  : 'text-green-500'
              }`}
            >
              {item.trangThai}
            </span>
          </div>

          <p><strong>Tin:</strong> {item.tinTuyenDung?.tieuDe}</p>
          <p><strong>Công ty:</strong> {item.tinTuyenDung?.ctName}</p>
          <p><strong>Lý do:</strong> {item.lyDo}</p>

          <p className="text-sm text-gray-400">
            {item.ngayToCao}
          </p>
        </div>
      ))}
    </div>
  )
}

export default BaoCao
