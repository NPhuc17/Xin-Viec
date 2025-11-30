import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { variables } from "../../variables";

function CompanyDetail() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDetail = async () => {
      try {
        const res = await fetch(variables.API_URL + "CongTy/list");
        const text = await res.text();
        if (!text) {
          alert("Server không trả về dữ liệu!");
          return;
        }
        const data = JSON.parse(text);

        if (res.ok) {
          const list = data.data || data.Data || [];
          const found = list.find((c) => c.ctid === parseInt(id));
          setCompany(found || null);
        } else {
          alert(data.message || "Không thể tải dữ liệu công ty!");
        }
      } catch (err) {
        console.error("Lỗi khi load chi tiết:", err);
        alert("Lỗi kết nối server hoặc dữ liệu không hợp lệ!");
      }
    };
    loadDetail();
  }, [id]);

  if (!company)
    return (
      <div className="p-6 text-center text-gray-500">
        Đang tải hoặc không tìm thấy công ty.
      </div>
    );

  // 🔹 Xử lý đường dẫn logo giống trang Company
  const logoUrl = company.logo
    ? `${variables.API_URL}CongTy/logo/${company.logo.split("/").pop()}`
    : null;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <button
        className="bg-gray-300 text-gray-700 px-4 py-1 rounded mb-4 hover:bg-gray-400"
        onClick={() => navigate(-1)}
      >
        ← Quay lại
      </button>

      <div className="flex items-center gap-4 mb-4">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt="Logo"
            className="w-24 h-24 object-contain border rounded"
          />
        ) : (
          <div className="w-24 h-24 flex items-center justify-center bg-gray-100 border rounded">
            Không có logo
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold">{company.ctName}</h2>
          <p className="text-gray-600">{company.moHinh}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <p><strong>Địa chỉ:</strong> {company.diaChi || "—"}</p>
        <p><strong>Quốc gia:</strong> {company.quocGia || "—"}</p>
        <p><strong>Mã thuế:</strong> {company.maThue || "—"}</p>
        <p><strong>Số nhân viên:</strong> {company.soNhanVien || "—"}</p>
        <p><strong>Người liên hệ:</strong> {company.nguoiLienHe || "—"}</p>
        <p><strong>SĐT liên hệ:</strong> {company.sdtLienHe || "—"}</p>
        <p><strong>SĐT công ty:</strong> {company.sdtCongTy || "—"}</p>
      </div>

      <div className="mt-4">
        <strong>Miêu tả:</strong>
        <p className="border p-2 mt-1 rounded bg-gray-50 whitespace-pre-line">
          {company.mieuTa || "Không có miêu tả."}
        </p>
      </div>
    </div>
  );
}

export default CompanyDetail;
