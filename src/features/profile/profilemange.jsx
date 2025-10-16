import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { variables } from '../../variables';

function ProfileManage() {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  const [modalType, setModalType] = useState('info');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    hsName: '',
    file: null,
  });

  useEffect(() => {
    const tkId = localStorage.getItem('tkId');
    const role = localStorage.getItem('role');
    if (!tkId || role !== 'UngVien') {
      setModalMsg('Bạn cần đăng nhập với tài khoản ứng viên để truy cập trang này.');
      setModalType('error');
      setShowModal(true);
      setTimeout(() => navigate('/login'), 2000);
    } else {
      loadResumes();
    }
  }, [navigate]);

  const loadResumes = async () => {
    try {
      const res = await fetch(variables.API_URL + 'HoSo/list', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      const data = await res.json();
      if (res.ok) {
        setResumes(data.data || []);
      } else {
        console.error('Lỗi tải hồ sơ:', data.message);
      }
    } catch (err) {
      console.error('Lỗi kết nối:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setForm({ ...form, file: files?.[0] || null });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.hsName.trim()) {
      setModalMsg('Vui lòng nhập tên hồ sơ.');
      setModalType('error');
      setShowModal(true);
      return;
    }

    if (!editingId && !form.file) {
      setModalMsg('Vui lòng chọn file để upload.');
      setModalType('error');
      setShowModal(true);
      return;
    }

    const formData = new FormData();
    formData.append('hsName', form.hsName);
    if (form.file) {
      formData.append('file', form.file);
    }

    try {
      const url = editingId
        ? variables.API_URL + `HoSo/update/${editingId}`
        : variables.API_URL + 'HoSo/create';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        body: formData,
        credentials: 'include',
      });

      const data = await res.json();
      if (res.ok) {
        setModalMsg(data.message || (editingId ? 'Cập nhật hồ sơ thành công!' : 'Tạo hồ sơ thành công!'));
        setModalType('success');
        setShowModal(true);
        setForm({ hsName: '', file: null });
        setShowForm(false);
        setEditingId(null);
        setTimeout(() => loadResumes(), 1500);
      } else {
        setModalMsg(data.message || 'Đã có lỗi xảy ra.');
        setModalType('error');
        setShowModal(true);
      }
    } catch (err) {
      console.error('Lỗi:', err);
      setModalMsg('Lỗi kết nối máy chủ!');
      setModalType('error');
      setShowModal(true);
    }
  };

  const handleEdit = (resume) => {
    setEditingId(resume.hsid);
    setForm({ hsName: resume.hsName, file: null });
    setShowForm(true);
  };

  const handleDelete = async (hsid) => {
    if (!window.confirm('Bạn chắc chắn muốn xóa hồ sơ này?')) return;

    try {
      const res = await fetch(variables.API_URL + `HoSo/delete/${hsid}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      const data = await res.json();
      if (res.ok) {
        setModalMsg('Xóa hồ sơ thành công!');
        setModalType('success');
        setShowModal(true);
        setTimeout(() => loadResumes(), 1500);
      } else {
        setModalMsg(data.message || 'Đã có lỗi xảy ra.');
        setModalType('error');
        setShowModal(true);
      }
    } catch (err) {
      console.error('Lỗi:', err);
      setModalMsg('Lỗi kết nối máy chủ!');
      setModalType('error');
      setShowModal(true);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({ hsName: '', file: null });
  };

  if (loading) {
    return <p className="text-center mt-6">Dắng tải dữ liệu...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Quản lý Hồ sơ</h1>

      {!showForm ? (
        <>
          <button
            onClick={() => setShowForm(true)}
            className="mb-6 bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition"
          >
            + Tạo Hồ sơ Mới
          </button>

          {resumes.length === 0 ? (
            <div className="bg-gray-100 p-8 rounded text-center">
              <p className="text-gray-600 mb-4">Bạn chưa có hồ sơ nào.</p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
              >
                Tạo hồ sơ đầu tiên
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              {resumes.map((resume) => (
                <div
                  key={resume.hsid}
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-primary mb-2">{resume.hsName}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        File: <span className="font-mono text-xs">{resume.viTriFile?.split('\\').pop() || 'N/A'}</span>
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(resume)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-sm"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(resume.hsid)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition text-sm"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow">
          <h2 className="text-2xl font-bold mb-4">
            {editingId ? 'Sửa Hồ sơ' : 'Tạo Hồ sơ Mới'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-2">Tên Hồ sơ</label>
              <input
                type="text"
                name="hsName"
                value={form.hsName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                placeholder="VD: Hồ sơ đặc biệt"
                required
              />
            </div>

            {!editingId && (
              <div>
                <label className="block font-medium mb-2">Chọn File</label>
                <input
                  type="file"
                  name="file"
                  onChange={handleChange}
                  accept=".pdf,.doc,.docx"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Chấp nhẫn: .pdf, .doc, .docx</p>
              </div>
            )}

            {editingId && (
              <div>
                <label className="block font-medium mb-2">Cập nhật File (Tùy chọn)</label>
                <input
                  type="file"
                  name="file"
                  onChange={handleChange}
                  accept=".pdf,.doc,.docx"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                />
                <p className="text-xs text-gray-500 mt-1">Nếu không chọn file, hồ sơ cũ sẽ được giữ lại</p>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-primary text-white py-2 rounded hover:bg-primary/90 transition font-medium"
              >
                {editingId ? 'Cập nhật' : 'Tạo'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition font-medium"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm">
            <p
              className={`text-lg mb-4 ${
                modalType === 'error'
                  ? 'text-red-600'
                  : modalType === 'success'
                  ? 'text-green-600'
                  : 'text-gray-700'
              }`}
            >
              {modalMsg}
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileManage;