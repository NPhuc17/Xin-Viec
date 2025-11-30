import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { variables } from "../../variables";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

function SavedJob() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSavedJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const token = Cookies.get("jwt_token");
      if (!token) {
        setError("Bạn cần đăng nhập để xem tin yêu thích.");
        setLoading(false);
        return;
      }

      const res = await fetch(`${variables.API_URL}YeuThich/yeu-thich-cua-toi`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        setJobs(data.danhSachYeuThich || []); // ✅ sửa key ở đây
      } else {
        setError(data.message || "Không tải được danh sách tin yêu thích.");
      }
    } catch (err) {
      console.error(err);
      setError("Lỗi kết nối đến máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const handleJobClick = (id) => {
    navigate(`/jobdetail/${id}`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-between">

        <div className="mx-4 my-6 ">
          {/* <h2 className="text-xl font-bold mb-4 text-primary">Tin yêu thích của tôi</h2> */}

          {loading && <p>Đang tải danh sách...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && (
            <>
              {jobs.length === 0 ? (
                <p className="text-gray-500">Bạn chưa lưu tin yêu thích nào.</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {jobs.map((job) => (
                    <div
                      key={job.tinId}
                      onClick={() => handleJobClick(job.tinId)}
                      className="flex items-center border border-accent rounded-md py-4 px-3 bg-white shadow-sm hover:border-highlight hover:shadow-md cursor-pointer transition"
                    >
                      <div className="flex-1">
                        <div className="text-lg font-semibold text-gray-800">{job.tieuDe}</div>
                        <div className="text-gray-600 text-sm">Công ty: {job.congTy}</div>
                        <div className="text-gray-600 text-sm">Ngày thêm: {job.ngayThem}</div>
                      </div>
                      <div className="text-xl text-red-500">❤️</div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

        </div>
      </div>
      <Footer />

    </>
  );
}

export default SavedJob;
