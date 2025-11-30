// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { variables } from "../../variables";
// import Cookies from "js-cookie";
// import Navbar from "../../components/navbar";
// import Footer from "../../components/footer";

// export default function ViewCV() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [cv, setCV] = useState(null);
//   const [loadingCV, setLoadingCV] = useState(true);
//   const [errorCV, setErrorCV] = useState(null);

//   const [chucDanhList, setChucDanhList] = useState([]);
//   const [loaiHinhList, setLoaiHinhList] = useState([]);
//   const [linhVucList, setLinhVucList] = useState([]);
//   const [viTriList, setViTriList] = useState([]);
//   const [kinhNghiemList, setKinhNghiemList] = useState([]);
//   const [loadingLists, setLoadingLists] = useState(true);

//   const [bangCaps, setBangCaps] = useState([]);
//   const [loadingBangCaps, setLoadingBangCaps] = useState(true);

//   const parseListResponse = async (res) => {
//     try {
//       const json = await res.json();
//       if (Array.isArray(json)) return json;
//       if (json && Array.isArray(json.data)) return json.data;
//       return [];
//     } catch (err) {
//       console.warn("parseListResponse error:", err);
//       return [];
//     }
//   };

//   const fetchList = async (url) => {
//     try {
//       const res = await fetch(url, {
//         headers: { Authorization: `Bearer ${Cookies.get("jwt_token")}` },
//       });
//       if (!res.ok) return [];
//       return await parseListResponse(res);
//     } catch {
//       return [];
//     }
//   };

//   // Load CV + lists
//   useEffect(() => {
//     let mounted = true;
//     const fetchAll = async () => {
//       setLoadingCV(true);
//       setLoadingLists(true);
//       try {
//         const cvReq = fetch(`${variables.API_URL}NoiDungHoSo/${id}`, {
//           headers: { Authorization: `Bearer ${Cookies.get("jwt_token")}` },
//         });

//         const [chucDanh, loaiHinh, linhVuc, viTri, kinhNghiem, cvRes] = await Promise.all([
//           fetchList(`${variables.API_URL}ChucDanh/list`),
//           fetchList(`${variables.API_URL}LoaiHinhLamViec/list`),
//           fetchList(`${variables.API_URL}LinhVuc/list`),
//           fetchList(`${variables.API_URL}ViTri/list`),
//           fetchList(`${variables.API_URL}KinhNghiem/list`),
//           cvReq,
//         ]);

//         if (!mounted) return;

//         setChucDanhList(chucDanh);
//         setLoaiHinhList(loaiHinh);
//         setLinhVucList(linhVuc);
//         setViTriList(viTri);
//         setKinhNghiemList(kinhNghiem);
//         setLoadingLists(false);

//         const res = await cvReq;
//         if (!res.ok) throw new Error(`CV API error ${res.status}`);
//         const cvJson = await res.json();
//         const cvData = cvJson.data || cvJson;
//         setCV(cvData);
//       } catch (err) {
//         console.error(err);
//         if (mounted) setErrorCV("Không tải được CV. Vui lòng thử lại.");
//       } finally {
//         if (mounted) setLoadingCV(false);
//       }
//     };

//     fetchAll();
//     return () => {
//       mounted = false;
//     };
//   }, [id]);

//   // Load BangCap khi cv hoSoID đã có

//   useEffect(() => {
//     const hoSoId = id; // chữ i thường
//     if (!hoSoId) return;

//     let mounted = true;

//     const fetchBangCap = async () => {
//       setLoadingBangCaps(true);
//       try {
//         const res = await fetch(`${variables.API_URL}HoSo/bang-cap/${hoSoId}`, {
//           headers: { Authorization: `Bearer ${Cookies.get("jwt_token")}` },
//         });

//         console.log("CALL API:", `${variables.API_URL}HoSo/bang-cap/${hoSoId}`);

//         if (!res.ok) throw new Error(`HTTP ${res.status}`);

//         const raw = await res.json();
//         console.log("API Bằng cấp trả về:", raw);

//         const normalized =
//           Array.isArray(raw)
//             ? raw
//             : Array.isArray(raw.data)
//               ? raw.data
//               : [];

//         if (mounted) setBangCaps(normalized);
//       } catch (err) {
//         console.error("Lỗi load bằng cấp:", err);
//         if (mounted) setBangCaps([]);
//       } finally {
//         if (mounted) setLoadingBangCaps(false);
//       }
//     };

//     fetchBangCap();
//     return () => (mounted = false);
//   }, [id]); // phụ thuộc đúng chữ i thường






//   const getNameFromItem = (item) => {
//     if (!item) return null;
//     return item.cdName || item.knName || item.lhName || item.lvName || item.vtName || null;
//   };

//   const matchesId = (item, idToMatch) => {
//     if (!item) return false;
//     const keys = ["cdid", "knid", "lhid", "lvid", "vtid", "id"];
//     return keys.some((k) => item[k] && String(item[k]) === String(idToMatch));
//   };

//   const getName = (list, idToMatch) => {
//     if (!idToMatch) return "Không xác định";
//     const found = list.find((it) => matchesId(it, idToMatch));
//     return getNameFromItem(found) || String(idToMatch);
//   };

//   if (loadingCV || loadingLists) return <p className="p-6">Đang tải CV...</p>;
//   if (errorCV) return <p className="p-6 text-red-600">{errorCV}</p>;
//   if (!cv) return <p className="p-6">Không có dữ liệu CV.</p>;

//   return (
//     <>
//       <Navbar />

//       <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl my-10">
//         <h1 className="text-3xl font-bold mb-6 text-center">{cv.tenHoSo || "Hồ sơ"}</h1>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* LEFT */}
//           <div className="col-span-1 border-r pr-4 flex flex-col items-center">
//             <div className="w-40 h-40 bg-gray-200 rounded-full overflow-hidden mb-4">
//               {cv.avata ? (
//                 <img src={variables.PHOTO_URL + cv.avata} alt="avatar" className="w-full h-full object-cover" />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center text-gray-500">Ảnh đại diện</div>
//               )}
//             </div>
//             <p className="font-semibold">{cv.tenUngVien || "—"}</p>
//             <p>{cv.phoneHoSo || "—"}</p>
//             <p>{cv.mailHoSo || "—"}</p>
//           </div>

//           {/* RIGHT */}
//           <div className="col-span-2 pl-4 space-y-3">
//             <p><strong>Học vấn:</strong> {cv.hocVan || "—"}</p>
//             <p><strong>Năm kinh nghiệm:</strong> {getName(kinhNghiemList, cv.namKinhNghiemID)}</p>
//             <p><strong>Chức danh:</strong> {getName(chucDanhList, cv.chucDanhID)}</p>
//             <p><strong>Loại hình làm việc:</strong> {getName(loaiHinhList, cv.loaiHinhLamViecID)}</p>
//             <p><strong>Lĩnh vực:</strong> {getName(linhVucList, cv.linhVucID)}</p>
//             <p><strong>Vị trí làm việc:</strong> {getName(viTriList, cv.viTriLamViecID)}</p>
//             <p><strong>Mục tiêu nghề nghiệp:</strong> {cv.mucTieu || "—"}</p>
//             <p><strong>Kỹ năng:</strong> {cv.kyNang || "—"}</p>
//             <p><strong>Chứng chỉ:</strong> {cv.chucChi || "—"}</p>

//             {/* Bằng cấp */}
//             {/* Bằng cấp / Chứng chỉ */}
//             <div className="mt-6">
//               <h2 className="text-xl font-bold mb-2">Bằng cấp / Chứng chỉ</h2>

//               {loadingBangCaps ? (
//                 <p>Đang tải bằng cấp...</p>
//               ) : bangCaps.length === 0 ? (
//                 <p>Chưa có bằng cấp nào.</p>
//               ) : (
//                 <ul className="space-y-2">
//                   {bangCaps.map((bc, idx) => (
//                     <li
//                       key={idx}
//                       className="border p-3 rounded flex justify-between items-center"
//                     >
//                       <div>
//                         <p className="font-semibold">{bc.tenBangCap || "—"}</p>
//                         <p className="text-sm text-gray-600">{bc.loai || "—"}</p>
//                         <p className="text-sm text-gray-500">{bc.ngayUpload || ""}</p>
//                       </div>

//                       {bc.fileUrl && (
//                         <a
//                           href={variables.PHOTO_URL + bc.fileUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600 hover:underline text-sm"
//                         >
//                           Xem file
//                         </a>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>

//           </div>
//         </div>

//         <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mt-4" onClick={() => navigate(/edit-cv/${id})} > Sửa CV </button>
//       </div>

//       <Footer />

//     </>
//   );
// }


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { variables } from "../../variables";
import Cookies from "js-cookie";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { useNavigate } from "react-router-dom";

import { FaPhone } from "react-icons/fa6";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { CiMail } from "react-icons/ci";



export default function ViewCV() {
  const { id } = useParams();
  const [cv, setCV] = useState(null);
  const [loadingCV, setLoadingCV] = useState(true);
  const [errorCV, setErrorCV] = useState(null);

  const [chucDanhList, setChucDanhList] = useState([]);
  const [loaiHinhList, setLoaiHinhList] = useState([]);
  const [linhVucList, setLinhVucList] = useState([]);
  const [viTriList, setViTriList] = useState([]);
  const [kinhNghiemList, setKinhNghiemList] = useState([]);
  const [loadingLists, setLoadingLists] = useState(true);

  const [bangCapList, setBangCapList] = useState([]);
  const [loadingBangCap, setLoadingBangCap] = useState(true);


  const [editingBangCapId, setEditingBangCapId] = useState(null);
  const [editTenBangCap, setEditTenBangCap] = useState("");
  const [editLoai, setEditLoai] = useState("");
  const [editFile, setEditFile] = useState(null);
  const [editPreview, setEditPreview] = useState(null);

  const navigate = useNavigate();

  // Helper: safely parse response to array
  const parseListResponse = async (res) => {
    try {
      const json = await res.json();
      // Typical shapes:
      // 1) { message: "...", data: [ ... ] }
      // 2) [ ... ]
      if (Array.isArray(json)) return json;
      if (json && Array.isArray(json.data)) return json.data;
      // maybe API returns { data: { items: [...] } } - try to find first array
      if (json && typeof json === "object") {
        for (const v of Object.values(json)) {
          if (Array.isArray(v)) return v;
        }
      }
      return [];
    } catch (err) {
      console.warn("parseListResponse error:", err);
      return [];
    }
  };

  const fetchList = async (url) => {
    try {
      const res = await fetch(url, { headers: { Authorization: `Bearer ${Cookies.get("jwt_token")}` } });
      if (!res.ok) {
        console.warn("Fetch list failed:", url, res.status);
        return [];
      }
      return await parseListResponse(res);
    } catch (err) {
      console.error("Fetch list error:", url, err);
      return [];
    }
  };

  const fetchBangCap = async (id) => {
    try {
      const res = await fetch(`${variables.API_URL}HoSo/bang-cap/${id}`, {
        headers: { Authorization: `Bearer ${Cookies.get("jwt_token")}` },
      });
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error("Fetch bang cap error:", err);
      return [];
    }
  };

  const startEditBangCap = (bc) => {
    setEditingBangCapId(bc.id);
    setEditTenBangCap(bc.tenBangCap);
    setEditLoai(bc.loai);
    setEditFile(null);
    setEditPreview(bc.fileUrl ? variables.PHOTO_URL + bc.fileUrl : null);
  };

  const handleEditFileChange = (e) => {
    const f = e.target.files[0];
    setEditFile(f);
    setEditPreview(f ? URL.createObjectURL(f) : null);
  };

  const handleSubmitEdit = async () => {
    if (!editTenBangCap || !editLoai) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    try {
      const fd = new FormData();
      fd.append("TenBangCap", editTenBangCap);
      fd.append("Loai", editLoai);
      if (editFile) fd.append("File", editFile);

      const res = await fetch(`${variables.API_URL}HoSo/bang-cap/sua/${editingBangCapId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt_token")}`,
        },
        body: fd,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Sửa bằng cấp thất bại");
        return;
      }

      // Cập nhật lại bangCapList
      setBangCapList(prev =>
        prev.map(bc => bc.id === editingBangCapId ? { ...bc, tenBangCap: editTenBangCap, loai: editLoai, fileUrl: editFile ? data.fileUrl : bc.fileUrl } : bc)
      );

      setEditingBangCapId(null);
      setEditFile(null);
      setEditPreview(null);

      alert("Sửa bằng cấp thành công!");
    } catch (err) {
      console.error(err);
      alert("Lỗi khi sửa bằng cấp");
    }
  };


  const handleDeleteBangCap = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xoá bằng cấp này?")) return;

    try {
      const res = await fetch(`${variables.API_URL}HoSo/bang-cap/xoa/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt_token")}`,
        },
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.message || "Xoá bằng cấp thất bại");
        return;
      }

      setBangCapList(prev => prev.filter(bc => bc.id !== id));
      alert("Xoá bằng cấp thành công!");
    } catch (err) {
      console.error(err);
      alert("Lỗi khi xoá bằng cấp");
    }
  };



  useEffect(() => {
    let mounted = true;

    const fetchAll = async () => {
      setLoadingLists(true);
      setLoadingCV(true);
      setLoadingBangCap(true);
      setErrorCV(null);

      try {
        const cvReq = fetch(`${variables.API_URL}NoiDungHoSo/${id}`, {
          headers: { Authorization: `Bearer ${Cookies.get("jwt_token")}` },
        });

        const [
          chucDanh,
          loaiHinh,
          linhVuc,
          viTri,
          kinhNghiem,
          bangCap,
          cvRes
        ] = await Promise.all([
          fetchList(`${variables.API_URL}ChucDanh/list`),
          fetchList(`${variables.API_URL}LoaiHinhLamViec/list`),
          fetchList(`${variables.API_URL}LinhVuc/list`),
          fetchList(`${variables.API_URL}ViTri/list`),
          fetchList(`${variables.API_URL}KinhNghiem/list`),
          fetchBangCap(id),
          cvReq
        ]);

        if (!mounted) return;

        setChucDanhList(chucDanh);
        setLoaiHinhList(loaiHinh);
        setLinhVucList(linhVuc);
        setViTriList(viTri);
        setKinhNghiemList(kinhNghiem);
        setBangCapList(bangCap);

        setLoadingLists(false);
        setLoadingBangCap(false);

        const res = await cvReq;
        if (!res.ok) {
          const errBody = await res.text().catch(() => null);
          throw new Error(`CV API error ${res.status} ${errBody || ""}`);
        }
        const cvJson = await res.json();
        const cvData = cvJson && cvJson.data ? cvJson.data : cvJson;
        setCV(cvData);

      } catch (err) {
        console.error("Load CV + lists + bangCap error:", err);
        if (mounted) setErrorCV("Không tải được CV. Vui lòng thử lại.");
      } finally {
        if (mounted) {
          setLoadingCV(false);
          setLoadingBangCap(false);
        }
      }
    };

    fetchAll();
    return () => { mounted = false; };
  }, [id]);


  // Generic mapper: try several id/name keys
  const getNameFromItem = (item) => {
    if (!item || typeof item !== "object") return null;
    // common name keys
    return item.cdName || item.knName || item.lhName || item.lvName || item.vtName || item.name || item.title || item.ten || null;
  };

  const matchesId = (item, idToMatch) => {
    if (!item) return false;
    const possibleIdKeys = ["cdid", "knid", "lhid", "lvid", "vtid", "id", "value", "key"];
    for (const k of possibleIdKeys) {
      if (k in item) {
        // compare as numbers or strings
        if (String(item[k]) === String(idToMatch)) return true;
      }
    }
    return false;
  };

  const getName = (list, idToMatch) => {
    if (idToMatch === null || idToMatch === undefined || idToMatch === "") return "Không xác định";
    if (!Array.isArray(list)) return String(idToMatch);
    const found = list.find((it) => matchesId(it, idToMatch));
    const name = getNameFromItem(found);
    return name || String(idToMatch);
  };

  if (loadingCV || loadingLists) return <p className="p-6">Đang tải CV...</p>;
  if (errorCV) return <p className="p-6 text-red-600">{errorCV}</p>;
  if (!cv) return <p className="p-6">Không có dữ liệu CV.</p>;

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl my-10">
        <h1 className="text-3xl font-bold mb-6 text-center">{cv.hoSoName || cv.hoSoName}</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* LEFT: Avatar + Contact */}
          <div className="col-span-1 border-r pr-4  border-dashed border-secondary">
            <div className="flex flex-col bg-highlight/70 h-full">
              <div className="w-40 h-40 bg-gray-200 rounded-full overflow-hidden mb-4 mx-auto">
                {cv.avata ? (
                  <img src={variables.PHOTO_URL + cv.avata} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">Ảnh đại diện</div>
                )}
              </div>
              <div className="flex items-center">
                <MdDriveFileRenameOutline className="mr-2 text-accent" />
                <p className="font-semibold">{cv.tenUngVien || "—"}</p>
              </div>

              <div className="flex items-center">
                <FaPhone className="mr-2 text-accent" />
                <p className=" text-[14px]">{cv.phoneHoSo || "—"}</p>
              </div>

              <div className="flex items-center">
                <CiMail className="mr-2 text-accent" />
               <p className=" text-[14px]">{cv.mailHoSo || "—"}</p>
              </div>
              
              
              <div className="my-2">
                <strong className="p-1 pr-10 bg-accent rounded-[8px] text-white uppercase">Kỹ năng</strong>
                <div className="h-[2px] w-full bg-accent mt-1"></div>

                <p>{cv.kyNang || "—"}</p>
              </div>
            </div>
          </div>

          {/* RIGHT: CV Content */}
          <div className="col-span-2 pl-4 space-y-3">
            <div className="my-4">
              <strong className="p-1 pr-10 bg-accent rounded-[8px] text-white uppercase">Mục tiêu nghề nghiệp</strong>
              <div className="h-[2px] w-full bg-accent mt-1"></div>
              <p>{cv.mucTieu || "—"}</p>
            </div>

            <div className="my-4">
              <strong className="p-1 pr-10 bg-accent rounded-[8px] text-white uppercase">Học vấn</strong>
              <div className="h-[2px] w-full bg-accent mt-1"></div>
              <p>{cv.hocVan || "—"}</p>
            </div>

            <div className="my-4">
              <strong className="p-1 pr-10 bg-accent rounded-[8px] text-white uppercase">Năm kinh nghiệm</strong>
              <div className="h-[2px] w-full bg-accent mt-1"></div>
              <p>{cv.namKinhNghiemID || "—"}</p>
            </div>

            <div className="my-4">
              <strong className="p-1 pr-10 bg-accent rounded-[8px] text-white uppercase">Học vấn</strong>
              <div className="h-[2px] w-full bg-accent mt-1"></div>
              <p>{getName(kinhNghiemList, cv.namKinhNghiemID)}</p>
            </div>

            <div className="my-4">
              <strong className="p-1 pr-10 bg-accent rounded-[8px] text-white uppercase">Chức danh</strong>
              <div className="h-[2px] w-full bg-accent mt-1"></div>
              <p>{getName(chucDanhList, cv.chucDanhID)}</p>
            </div>

            <div className="my-4">
              <strong className="p-1 pr-10 bg-accent rounded-[8px] text-white uppercase">Loại hình làm việc</strong>
              <div className="h-[2px] w-full bg-accent mt-1"></div>
              <p>{getName(loaiHinhList, cv.loaiHinhLamViecID)}</p>
            </div>

            <div className="my-4">
              <strong className="p-1 pr-10 bg-accent rounded-[8px] text-white uppercase">Lĩnh vực</strong>
              <div className="h-[2px] w-full bg-accent mt-1"></div>
              <p>{getName(linhVucList, cv.linhVucID)}</p>
            </div>

            <div className="my-4">
              <strong className="p-1 pr-10 bg-accent rounded-[8px] text-white uppercase">Vị trí làm việc</strong>
              <div className="h-[2px] w-full bg-accent mt-1"></div>
              <p>{getName(viTriList, cv.viTriLamViecID)}</p>
            </div>


            <div className="my-4">
              <strong className="p-1 pr-10 bg-accent rounded-[8px] text-white uppercase">Chứng chỉ</strong>
              <div className="h-[2px] w-full bg-accent mt-1"></div>
              <p>{cv.chucChi || "—"}</p>
            </div>
          </div>




        </div>

        <ul className="space-y-2 mt-5">
          {bangCapList.map((bc) => (
            <li key={bc.id} className="border p-2 rounded flex justify-between items-center">
              {editingBangCapId === bc.id ? (
                <div className="w-full flex flex-col gap-2">
                  <input
                    type="text"
                    value={editTenBangCap}
                    onChange={(e) => setEditTenBangCap(e.target.value)}
                    className="border px-2 py-1 rounded"
                  />
                  <input
                    type="text"
                    value={editLoai}
                    onChange={(e) => setEditLoai(e.target.value)}
                    className="border px-2 py-1 rounded"
                  />
                  <input type="file" accept="image/*,application/pdf" onChange={handleEditFileChange} />
                  {editPreview && (
                    <img src={editPreview} alt="preview" className="w-20 rounded" />
                  )}
                  <div className="flex gap-2">
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded"
                      onClick={handleSubmitEdit}
                    >
                      Lưu
                    </button>
                    <button
                      className="bg-gray-400 text-white px-3 py-1 rounded"
                      onClick={() => setEditingBangCapId(null)}
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <p className="font-medium">{bc.tenBangCap}</p>
                    <p className="text-sm text-gray-500">{bc.loai} - {bc.ngayUpload}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {bc.fileUrl && (
                      <a
                        href={variables.PHOTO_URL + bc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Xem file
                      </a>
                    )}
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                      onClick={() => startEditBangCap(bc)}
                    >
                      Sửa
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleDeleteBangCap(bc.id)}
                    >
                      Xoá
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>


        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mt-4"
          onClick={() => navigate(`/edit-cv/${id}`)}
        >
          Sửa CV
        </button>
      </div>

      <Footer />
    </>
  );
}

