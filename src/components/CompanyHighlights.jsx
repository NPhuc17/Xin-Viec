

import React, { useEffect, useState } from "react";
import axios from "axios";
import { variables } from "../variables";
import { useNavigate } from "react-router-dom";

function CompanyHighlights() {
  const [companies, setCompanies] = useState([]);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const itemsPerPage = 6; //Hiển thị 2 công ty mỗi trang

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(variables.API_URL + "CongTy/list");
        if (response.data && response.data.data) {
          setCompanies(response.data.data); // lấy toàn bộ danh sách
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách công ty:", error);
      }
    };

    fetchCompanies();
  }, []);

  // 👉 Khi click vào 1 công ty
  const handleCompanyClick = (company) => {
    navigate(`/search?congTyId=${company.ctid}&query=${encodeURIComponent(company.ctName)}`);
  };

  // 👉 Tính phân trang
  const totalPages = Math.ceil(companies.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const currentCompanies = companies.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="py-12 px-6">
      <h2 className="text-2xl font-bold mb-6 text-primary">Công ty nổi bật</h2>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        {currentCompanies.map((company) => (
          <div
            key={company.ctid}
            onClick={() => handleCompanyClick(company)}
            className="p-4 bg-white rounded shadow hover:shadow-lg cursor-pointer text-center transition"
          >
            <img
              src={`${variables.API_URL}CongTy/logo/${company.logo.replace(/^\/Upload\//, "")}`}
              className="w-20 h-20 object-cover rounded mx-auto mb-2"
              alt={company.ctName}
            />
            <h3 className="font-semibold">{company.ctName}</h3>
          </div>
        ))}
      </div>

      {/* 🔄 Thanh phân trang */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            ← Trước
          </button>

          <span>
            Trang {page} / {totalPages}
          </span>

          <button
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Sau →
          </button>
        </div>
      )}
    </section>
  );
}

export default CompanyHighlights;
