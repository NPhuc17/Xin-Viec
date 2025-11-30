// src/pages/search/components/filterbar.jsx
import React, { useEffect, useState } from "react";
import { variables } from "../../../variables";

function FilterBar({ onFilter }) {
  const [bangcap, setBangcap] = useState([]);
  const [chucdanh, setChucdanh] = useState([]);
  const [kinhnghiem, setKinhnghiem] = useState([]);
  const [linhvuc, setLinhvuc] = useState([]);
  const [loaihinh, setLoaihinh] = useState([]);
  const [vitri, setVitri] = useState([]);

  const [filters, setFilters] = useState({
    bangcap: "all",
    chucdanh: "all",
    kinhnghiem: "all",
    linhvuc: "all",
    loaihinh: "all",
    vitri: "all",
  });

  // 🧩 Hàm load tất cả dropdown
  useEffect(() => {
    const fetchData = async (endpoint, setter) => {
      try {
        const res = await fetch(`${variables.API_URL}${endpoint}`);
        const data = await res.json();
        setter(data.data || []);
      } catch (err) {
        console.error(`Lỗi tải ${endpoint}:`, err);
      }
    };

    fetchData("BangCap/list", setBangcap);
    fetchData("ChucDanh/list", setChucdanh);
    fetchData("KinhNghiem/list", setKinhnghiem);
    fetchData("LinhVuc/list", setLinhvuc);
    fetchData("LoaiHinhLamViec/list", setLoaihinh);
    fetchData("ViTri/list", setVitri);
  }, []);

  // Khi người dùng chọn filter
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  return (
    <div className="bg-white shadow-sm border-b px-6 py-3 flex flex-wrap justify-center gap-2">
      <select
        name="bangcap"
        value={filters.bangcap}
        onChange={handleChange}
        className="border rounded p-2"
      >
        <option value="all">-- Bằng cấp --</option>
        {bangcap.map((item) => (
          <option key={item.bcid} value={item.bcid}>
            {item.bcName}
          </option>
        ))}
      </select>

      <select
        name="chucdanh"
        value={filters.chucdanh}
        onChange={handleChange}
        className="border rounded p-2"
      >
        <option value="all">-- Chức danh --</option>
        {chucdanh.map((item) => (
          <option key={item.cdid} value={item.cdid}>
            {item.cdName}
          </option>
        ))}
      </select>

      <select
        name="kinhnghiem"
        value={filters.kinhnghiem}
        onChange={handleChange}
        className="border rounded p-2"
      >
        <option value="all">-- Kinh nghiệm --</option>
        {kinhnghiem.map((item) => (
          <option key={item.knid} value={item.knid}>
            {item.knName}
          </option>
        ))}
      </select>

      <select
        name="linhvuc"
        value={filters.linhvuc}
        onChange={handleChange}
        className="border rounded p-2"
      >
        <option value="all">-- Lĩnh vực --</option>
        {linhvuc.map((item) => (
          <option key={item.lvid} value={item.lvid}>
            {item.lvName}
          </option>
        ))}
      </select>

      <select
        name="loaihinh"
        value={filters.loaihinh}
        onChange={handleChange}
        className="border rounded p-2"
      >
        <option value="all">-- Loại hình --</option>
        {loaihinh.map((item) => (
          <option key={item.lhid} value={item.lhid}>
            {item.lhName}
          </option>
        ))}
      </select>

      <select
        name="vitri"
        value={filters.vitri}
        onChange={handleChange}
        className="border rounded p-2"
      >
        <option value="all">-- Vị trí --</option>
        {vitri.map((item) => (
          <option key={item.vtid} value={item.vtid}>
            {item.vtName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterBar;
