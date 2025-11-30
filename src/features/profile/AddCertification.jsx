// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import { variables } from "../../variables";
// import Navbar from "../../components/navbar";
// import Footer from "../../components/footer";

// function AddCertification() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const hoSoId = location.state?.hoSoId;

//   const [tenBangCap, setTenBangCap] = useState("");
//   const [loai, setLoai] = useState("");
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);

//   const [bangCaps, setBangCaps] = useState([]);

//   if (!hoSoId) {
//     return (
//       <div className="text-center text-red-600 mt-10">
//         ❌ Không tìm thấy hoSoId. Vui lòng tạo hồ sơ trước.
//       </div>
//     );
//   }

//   const handleFileChange = (e) => {
//     const f = e.target.files[0];
//     setFile(f);
//     setPreview(f ? URL.createObjectURL(f) : null);
//   };

//   const handleAddBangCap = () => {
//     if (!tenBangCap || !loai || !file) {
//       alert("Vui lòng điền đủ thông tin và chọn file");
//       return;
//     }

//     setBangCaps(prev => [
//       ...prev,
//       { tenBangCap, loai, file, preview }
//     ]);

//     // reset input
//     setTenBangCap("");
//     setLoai("");
//     setFile(null);
//     setPreview(null);
//   };

//   const handleSubmitAll = async () => {
//     if (bangCaps.length === 0) {
//       alert("Chưa có bằng cấp nào để upload");
//       return;
//     }

//     try {
//       for (let bc of bangCaps) {
//         const fd = new FormData();
//         fd.append("hoSoId", hoSoId);
//         fd.append("tenBangCap", bc.tenBangCap);
//         fd.append("loai", bc.loai);
//         fd.append("file", bc.file);

//         const res = await fetch(`${variables.API_URL}HoSo/upload-bang-cap`, {
//           method: "POST",
//           headers: { Authorization: `Bearer ${Cookies.get("jwt_token")}` },
//           body: fd,
//         });

//         if (!res.ok) {
//           const data = await res.json().catch(() => ({}));
//           alert(`Upload thất bại: ${bc.tenBangCap} - ${data.message || res.status}`);
//           return;
//         }
//       }

//       alert("Tất cả bằng cấp đã upload thành công!");
//       setBangCaps([]);
//       navigate("/"); // hoặc trang tiếp theo

//     } catch (err) {
//       console.error(err);
//       alert("Có lỗi khi upload bằng cấp");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-2xl mx-auto my-10 bg-white p-6 rounded-xl shadow-md">
//         <h1 className="text-2xl font-bold mb-5 text-center">
//           Thêm Bằng Cấp / Chứng Chỉ
//         </h1>

//         {/* FORM THÊM 1 BẰNG CẤP */}
//         <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
//           <div>
//             <label className="font-semibold">Tên bằng cấp</label>
//             <input
//               type="text"
//               value={tenBangCap}
//               onChange={(e) => setTenBangCap(e.target.value)}
//               className="w-full border px-3 py-2 rounded mt-1"
//               placeholder="VD: Chứng chỉ TOEIC 650"
//             />
//           </div>

//           <div>
//             <label className="font-semibold">Loại</label>
//             <input
//               type="text"
//               value={loai}
//               onChange={(e) => setLoai(e.target.value)}
//               className="w-full border px-3 py-2 rounded mt-1"
//               placeholder="VD: Ngoại ngữ, Bằng nghề..."
//             />
//           </div>

//           <div>
//             <label className="font-semibold">File bằng cấp (PDF hoặc hình ảnh)</label>
//             <input
//               type="file"
//               accept="image/*,application/pdf"
//               onChange={handleFileChange}
//               className="mt-2"
//             />
//           </div>

//           {preview && (
//             <div className="mt-3">
//               <p className="font-semibold mb-1">Xem trước</p>
//               <img
//                 src={preview}
//                 alt="preview"
//                 className="w-48 rounded shadow"
//               />
//             </div>
//           )}

//           <button
//             type="button"
//             onClick={handleAddBangCap}
//             className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
//           >
//             Thêm vào danh sách
//           </button>
//         </form>

//         {/* DANH SÁCH BẰNG CẤP ĐÃ THÊM */}
//         {bangCaps.length > 0 && (
//           <div className="mt-6">
//             <h2 className="text-xl font-semibold mb-2">Danh sách bằng cấp sắp upload</h2>
//             <ul className="space-y-2">
//               {bangCaps.map((bc, idx) => (
//                 <li key={idx} className="border p-2 rounded flex justify-between items-center">
//                   <div>
//                     <p className="font-medium">{bc.tenBangCap}</p>
//                     <p className="text-sm text-gray-500">{bc.loai}</p>
//                   </div>
//                   {bc.preview && (
//                     <img src={bc.preview} alt="preview" className="w-20 rounded" />
//                   )}
//                 </li>
//               ))}
//             </ul>

//             <button
//               onClick={handleSubmitAll}
//               className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//             >
//               Upload tất cả
//             </button>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default AddCertification;





import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { variables } from "../../variables";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

export default function AddCertification() {
  const location = useLocation();
  const navigate = useNavigate();
  const hoSoId = location.state?.hoSoId;

  const [tenBangCap, setTenBangCap] = useState("");
  const [loai, setLoai] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [bangCaps, setBangCaps] = useState([]);

  if (!hoSoId) {
    return <div className="text-center text-red-600 mt-10">❌ Không tìm thấy hoSoId.</div>;
  }

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const handleAddBangCap = () => {
    if (!tenBangCap || !loai || !file) {
      alert("Vui lòng điền đủ thông tin và chọn file");
      return;
    }
    setBangCaps(prev => [...prev, { tenBangCap, loai, file, preview }]);
    setTenBangCap(""); setLoai(""); setFile(null); setPreview(null);
  };

  const handleDeleteBangCap = (index) => {
    setBangCaps(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmitAll = async () => {
    if (bangCaps.length === 0) { alert("Chưa có bằng cấp để upload"); return; }
    try {
      for (let bc of bangCaps) {
        const fd = new FormData();
        fd.append("hoSoId", hoSoId);
        fd.append("tenBangCap", bc.tenBangCap);
        fd.append("loai", bc.loai);
        fd.append("file", bc.file);
        const res = await fetch(`${variables.API_URL}HoSo/upload-bang-cap`, {
          method: "POST",
          headers: { Authorization: `Bearer ${Cookies.get("jwt_token")}` },
          body: fd,
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          alert(`Upload thất bại: ${bc.tenBangCap} - ${data.message || res.status}`);
          return;
        }
      }
      alert("Tất cả bằng cấp đã upload thành công!");
      setBangCaps([]);
      navigate("/"); 
    } catch (err) {
      console.error(err);
      alert("Có lỗi khi upload bằng cấp");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto my-10 bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-5 text-center">Thêm Bằng Cấp / Chứng Chỉ</h1>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label className="font-semibold">Tên bằng cấp</label>
            <input type="text" value={tenBangCap} onChange={(e) => setTenBangCap(e.target.value)} className="w-full border px-3 py-2 rounded mt-1" placeholder="VD: Chứng chỉ TOEIC 650" />
          </div>
          <div>
            <label className="font-semibold">Loại</label>
            <input type="text" value={loai} onChange={(e) => setLoai(e.target.value)} className="w-full border px-3 py-2 rounded mt-1" placeholder="VD: Ngoại ngữ, Bằng nghề..." />
          </div>
          <div>
            <label className="font-semibold">File bằng cấp</label>
            <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} className="mt-2" />
          </div>
          {preview && <img src={preview} alt="preview" className="w-48 rounded mt-2" />}
          <button type="button" onClick={handleAddBangCap} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Thêm vào danh sách</button>
        </form>

        {bangCaps.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Danh sách bằng cấp sắp upload</h2>
            <ul className="space-y-2">
              {bangCaps.map((bc, idx) => (
                <li key={idx} className="border p-2 rounded flex justify-between items-center">
                  <div>
                    <p className="font-medium">{bc.tenBangCap}</p>
                    <p className="text-sm text-gray-500">{bc.loai}</p>
                  </div>
                  {bc.preview && <img src={bc.preview} alt="preview" className="w-20 rounded" />}
                  <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDeleteBangCap(idx)}>Xóa</button>
                </li>
              ))}
            </ul>
            <button onClick={handleSubmitAll} className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Upload tất cả</button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
