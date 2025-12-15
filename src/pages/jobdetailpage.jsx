import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Cookies from "js-cookie";
import { variables } from "../variables";
import Footer from "../components/footer";
import { MdReportProblem } from "react-icons/md";


function Jobdetailpage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State cho thông tin phụ
  const [bangCap, setBangCap] = useState("");
  const [linhVuc, setLinhVuc] = useState("");
  const [chucDanh, setChucDanh] = useState("");
  const [loaiHinh, setLoaiHinh] = useState("");
  const [viTri, setViTri] = useState("");

  // State cho yêu thích
  const [isFavorite, setIsFavorite] = useState(false);

  const isLocked = job?.trangThai === "Đã khóa";



  // State cho báo cáo
  const [showReportModal, setShowReportModal] = useState(false);
  const [lyDo, setLyDo] = useState("");
  const [noiDung, setNoiDung] = useState("");
  const [hasReported, setHasReported] = useState(false);

  // 1️⃣ Load chi tiết tin tuyển dụng
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`${variables.API_URL}TInTuyenDung/${id}`);
        const data = await res.json();

        if (res.ok && data.data) {
          setJob(data.data);
        } else {
          setError(data.message || "Không tìm thấy tin tuyển dụng.");
        }
      } catch (err) {
        console.error(err);
        setError("Lỗi kết nối máy chủ.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // 2️⃣ Load thông tin phụ (Bằng cấp, Lĩnh vực, …)
  useEffect(() => {
    if (!job) return;

    const safeFetch = async (url) => {
      try {
        const res = await fetch(url);
        if (!res.ok) return null;
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) return null;
        const data = await res.json();
        return data.data || null;
      } catch (err) {
        return null;
      }
    };

    const fetchDetails = async () => {
      const [bc, lv, cd, lh, vt] = await Promise.all([
        safeFetch(`${variables.API_URL}BangCap/${job.bangcapID}`),
        safeFetch(`${variables.API_URL}LinhVuc/${job.linhvucIID}`),
        safeFetch(`${variables.API_URL}ChucDanh/${job.chucdanhID}`),
        safeFetch(`${variables.API_URL}LoaiHinhLamViec/${job.loaihinhID}`),
        safeFetch(`${variables.API_URL}ViTri/${job.vitriID}`)
      ]);

      setBangCap(bc?.bcName || "Không có dữ liệu");
      setLinhVuc(lv?.lvName || "Không có dữ liệu");
      setChucDanh(cd?.cdName || "Không có dữ liệu");
      setLoaiHinh(lh?.lhName || "Không có dữ liệu");
      setViTri(vt?.vtName || "Không có dữ liệu");
    };

    fetchDetails();
  }, [job]);


  useEffect(() => {
    const reported = sessionStorage.getItem(`reported_${id}`);
    if (reported === "true") {
      setHasReported(true);
    }
  }, [id]);

  // 3️⃣ Kiểm tra trạng thái yêu thích
  useEffect(() => {
    const checkFavorite = async () => {
      const token = Cookies.get("jwt_token");
      if (!token) return;

      try {
        const res = await fetch(`${variables.API_URL}YeuThich/check/${id}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (!res.ok) return;
        const data = await res.json();
        setIsFavorite(data.isFavorite);
      } catch (err) {
        console.log("Lỗi kiểm tra yêu thích:", err);
      }
    };

    checkFavorite();
  }, [id]);

  // 4️⃣ Hàm nhấn yêu thích (toggle)
  const handleFavorite = async () => {
    const token = Cookies.get("jwt_token");
    if (!token) {
      alert("Bạn cần đăng nhập để lưu tin yêu thích!");
      navigate("/login");
      return;
    }

    try {
      if (isFavorite) {
        // Nếu đang yêu thích -> bỏ yêu thích
        const res = await fetch(`${variables.API_URL}YeuThich/bo-luu/${job.ttdid}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        const data = await res.json();
        if (res.ok) {
          setIsFavorite(false);
          alert(data.Message || "Đã bỏ yêu thích!");
        } else {
          alert(data.Message || "Không thể bỏ yêu thích!");
        }
      } else {
        // Nếu chưa yêu thích -> lưu yêu thích
        const res = await fetch(`${variables.API_URL}YeuThich/luu-yeu-thich`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ tinTuyenDungId: job.ttdid })
        });

        const data = await res.json();
        if (res.ok) {
          setIsFavorite(true);
          alert(data.Message || "Đã lưu tin yêu thích!");
        } else {
          alert(data.Message || "Không thể lưu tin!");
        }
      }
    } catch (err) {
      console.error("Lỗi xử lý yêu thích:", err);
    }
  };


  const handleReport = async () => {
    const token = Cookies.get("jwt_token");

    if (!token) {
      alert("Bạn cần đăng nhập để báo cáo!");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`${variables.API_URL}ToCao/to-cao-tin/${job.ttdid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          lyDo: lyDo,
          noiDung: noiDung
        })
      });

      // ---- ĐỌC RESPONSE ĐÚNG CÁCH ----
      const contentType = res.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        data = await res.text(); // backend trả text: "Bạn đã tố cáo tin này rồi"
      }

      // ---- XỬ LÝ KHI LỖI ----
      if (!res.ok) {
        alert(data); // hiện đúng thông báo backend
        return;
      }

      // ---- THÀNH CÔNG ----
      alert(data.message || "Gửi báo cáo thành công!");

      setShowReportModal(false);
      setLyDo("");
      setNoiDung("");

      // lưu session để disable nút
      sessionStorage.setItem(`reported_${job.ttdid}`, "true");
      setHasReported(true);

    } catch (err) {
      console.error("Lỗi gửi báo cáo:", err);
    }
  };





  if (loading) {
    return (
      <>
        <Navbar />
        <div className="p-6 text-center">Đang tải thông tin tuyển dụng...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="p-6 text-red-500 text-center">{error}</div>
      </>
    );
  }

  if (!job) {
    return (
      <>
        <Navbar />
        <div className="p-6 text-center">Không tìm thấy công việc.</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md mt-6">
        {/* Tiêu đề + trái tim */}
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-primary">{job.tieuDe || "Không có tiêu đề"}</h1>

          {/* <button
          onClick={() => {
            if (hasReported) {
              alert("Bạn đã tố cáo tin này rồi. Không thể tố cáo lại.");
              return;
            }
            setShowReportModal(true);
          }}
          disabled={hasReported}
          className={`bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md mt-4 ml-6 ${hasReported ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          {hasReported ? "Đã báo cáo" : "Báo cáo tin này"}
        </button> */}
          <div className="flex gap-4 items-center">

            <span onClick={() => {
              if (hasReported) {
                alert("Bạn đã tố cáo tin này rồi. Không thể tố cáo lại.");
                return;
              }
              setShowReportModal(true);
            }}
              disabled={hasReported}
              className={` text-red-600 text-2xl cursor-pointer hover:text-red-700 ${hasReported ? "opacity-50 cursor-not-allowed" : ""
                }`}>
              <MdReportProblem />
            </span>
            <span
              className="text-2xl cursor-pointer select-none"
              onClick={handleFavorite}
            >
              {isFavorite ? "❤️" : "🤍"}
            </span>
          </div>
        </div>

        <p className="text-gray-700 mb-4">{job.mieuTa || "Chưa có mô tả."}</p>

        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div>
            <span className="font-semibold">Ngày đăng:</span> {job.ngayDang?.slice(0, 10)}
          </div>
          <div>
            <span className="font-semibold">Hạn nộp:</span> {job.hanNop?.slice(0, 10)}
          </div>
          <div>
            <span className="font-semibold">Tuổi yêu cầu:</span> {job.tuoi}
          </div>
          <div>
            <span className="font-semibold">Năm kinh nghiệm:</span> {job.kinhnghiemID}
          </div>
          <div>
            <span className="font-semibold">Bằng cấp:</span> {bangCap}
          </div>
          <div>
            <span className="font-semibold">Lĩnh vực:</span> {linhVuc}
          </div>
          <div>
            <span className="font-semibold">Chức danh:</span> {chucDanh}
          </div>
          <div>
            <span className="font-semibold">Loại hình:</span> {loaiHinh}
          </div>
          <div>
            <span className="font-semibold">Vị trí:</span> {viTri}
          </div>
        </div>

        <div>
          <span className="font-semibold">Yêu cầu:</span> <br />{job.yeuCau}
        </div>

        <button
          onClick={() => {
            if (isLocked) return;
            navigate(`/apply/${job.ttdid}`);
          }}
          disabled={isLocked}
          className={`px-6 py-2 rounded-md mt-4 text-white cursor-pointer
    ${isLocked
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {isLocked ? "Tin đã bị khóa" : "Ứng tuyển ngay"}
        </button>



      </div>
      {/* Modal báo cáo */}
      {showReportModal && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4 text-red-600">Báo cáo tin tuyển dụng</h2>

            <label className="block mb-2 font-semibold">Lý do</label>
            <input
              type="text"
              value={lyDo}
              onChange={(e) => setLyDo(e.target.value)}
              className="w-full border p-2 rounded mb-4"
              placeholder="Nhập lý do báo cáo"
            />

            <label className="block mb-2 font-semibold">Nội dung chi tiết</label>
            <textarea
              value={noiDung}
              onChange={(e) => setNoiDung(e.target.value)}
              className="w-full border p-2 rounded mb-4 h-24"
              placeholder="Nhập nội dung báo cáo"
            ></textarea>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowReportModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Hủy
              </button>

              <button
                onClick={handleReport}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Jobdetailpage;
