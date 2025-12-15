import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { variables } from '../../variables'

function BaoCaoChiTiet() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [baoCao, setBaoCao] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [updating, setUpdating] = useState(false)

    useEffect(() => {
        fetch(variables.API_URL + `ToCao/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Không thể tải chi tiết tố cáo')
                return res.json()
            })
            .then(data => {
                setBaoCao(data)
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }, [id])

    const handleChangeTrangThai = async (trangThaiMoi) => {
        if (!window.confirm(`Xác nhận chuyển sang trạng thái "${trangThaiMoi}"?`)) return

        try {
            setUpdating(true)

            const res = await fetch(
                variables.API_URL + `ToCao/cap-nhat-trang-thai/${id}`
                , {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
                    },
                    body: JSON.stringify({
                        trangThai: trangThaiMoi
                    })
                }
            )

            if (!res.ok) throw new Error('Cập nhật trạng thái thất bại')

            setBaoCao(prev => ({
                ...prev,
                trangThai: trangThaiMoi
            }))

            // Nếu xử lý → chuyển sang chi tiết tin tuyển dụng
            if (trangThaiMoi === 'Đã duyệt') {
                navigate(`/admin/jobs/${baoCao.tinTuyenDung?.ttdid}`, {
                    state: {
                        toCaoId: baoCao.id
                    }
                })
            }
        } catch (err) {
            alert(err.message)
        } finally {
            setUpdating(false)
        }
    }
    const handleDelete = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn xoá tố cáo này không?')) return

    try {
        const res = await fetch(
            variables.API_URL + `ToCao/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
                }
            }
        )

        if (!res.ok) throw new Error('Xoá tố cáo thất bại')

        alert('Xoá tố cáo thành công')
        navigate('/admin/baocao')
    } catch (err) {
        alert(err.message)
    }
}

    if (loading) return <p>Đang tải...</p>
    if (error) return <p className="text-red-500">{error}</p>

    return (
        <div className="max-w-3xl mx-auto p-6">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 text-blue-500 no-underline"
            >
                ← Quay lại
            </button>

            <div className="border-2 border-accent rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4">
                    Chi tiết tố cáo
                </h2>

                <p>
                    <strong>Trạng thái hiện tại:</strong>{' '}
                    <span className="font-bold text-green-600">
                        {baoCao.trangThai}
                    </span>
                </p>

                {/* Dropdown trạng thái */}
                <div className="mt-4">
                    <label className="font-semibold mr-2">
                        Cập nhật trạng thái:
                    </label>
                    <select
                        disabled={updating}
                        defaultValue=""
                        onChange={(e) => handleChangeTrangThai(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    >
                        <option value="" disabled>-- Chọn --</option>
                        <option value="Từ chối">Từ chối</option>
                        <option value="Đã duyệt">Xử lý</option>
                    </select>
                </div>

                <hr className="my-4" />

                <p><strong>Tin tuyển dụng:</strong> {baoCao.tinTuyenDung?.tieuDe}</p>

                <hr className="my-4" />

                <p><strong>Ứng viên:</strong> {baoCao.ungVien?.hoTen}</p>
                <p><strong>Email:</strong> {baoCao.ungVien?.email}</p>

                <hr className="my-4" />

                <p><strong>Lý do:</strong> {baoCao.lyDo}</p>
                <p className="whitespace-pre-line">
                    <strong>Nội dung:</strong> {baoCao.noiDung}
                </p>

                <p className="text-sm text-gray-400 mt-4">
                    Ngày tố cáo: {baoCao.ngayToCao}
                </p>
            </div>

            <button className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"  onClick={handleDelete}>
                Xoá
            </button>
        </div>
    )
}

export default BaoCaoChiTiet

