import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { variables } from "../../variables";
import EmployerNavbar from "../../components/employernavbar";
import Footer from "../../components/footer";
import { useNavigate } from "react-router-dom";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(variables.API_URL + "TinTuyenDung/list-by-ntd", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setJobs(data.data || []);
        } else {
          setError(data.Message || "Không tải được danh sách tin.");
        }
      } catch (err) {
        // console.error("Fetch error:", err);
        // setError("Lỗi kết nối máy chủ!");
        navigate("/employer/login");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleDelete = async (ttdid) => {
    if (!window.confirm("Bạn có chắc muốn xóa tin tuyển dụng này?")) return;

    try {
      const res = await fetch(variables.API_URL + `TinTuyenDung/delete/${ttdid}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.Message || "Đã xóa thành công!");
        // Cập nhật lại danh sách jobs sau khi xoá
        setJobs((prevJobs) => prevJobs.filter((job) => job.ttdid !== ttdid));
      } else {
        alert(data.Message || "Xóa thất bại vì tin có người ứng tuyển!");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối máy chủ!");
    }
  };

  if (loading) return <p className="text-center mt-6">Đang tải danh sách tin...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      <div className="flex flex-col min-h-screen justify-between">
        <EmployerNavbar />

        <div className="lg:min-w-5xl md:min-w-2xl min-w-10 mx-auto p-6 bg-white rounded shadow">
          <h2 className="text-2xl font-bold mb-4 text-center">Danh sách tin tuyển dụng đã tạo</h2>

          {jobs.length === 0 ? (
            <p className="text-center text-gray-500">Bạn chưa đăng tin tuyển dụng nào.</p>
          ) : (
            <>
              {/* 🟦 TABLE CHO MÀN HÌNH LỚN */}
              <table className="w-full border border-gray-300 hidden md:table">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border">#</th>
                    <th className="p-2 border">Tiêu đề</th>
                    <th className="p-2 border">Trạng thái</th>
                    <th className="p-2 border">Ngày hết hạn</th>
                    <th className="p-2 border">Chỉnh sửa</th>
                    <th className="p-2 border">Ứng tuyển</th>
                    <th className="p-2 border">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job, index) => (
                    <tr key={job.ttdid || index} className="text-center">
                      <td className="p-2 border">{index + 1}</td>
                      <td className="p-2 border">{job.tieuDe}</td>
                      <td className="p-2 border">{job.trangThai}</td>
                      <td className="p-2 border">{job.hanNop?.slice(0, 10)}</td>
                      <td className="p-2 border">
                        <Link to={`/job/${job.ttdid}`} className="text-blue-600 hover:underline">
                          Chỉnh sửa
                        </Link>
                      </td>
                      <td className="p-2 border">
                        <Link to={`/applied/${job.ttdid}`} className="text-green-600 hover:underline">
                          Xem ứng tuyển
                        </Link>
                      </td>
                      <td className="p-2 border">
                        <button
                          onClick={() => handleDelete(job.ttdid)}
                          className="text-red-600 hover:underline"
                        >
                          Xoá
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* 🟩 MOBILE VIEW — DISPLAY DẠNG THẺ DỌC */}
              <div className="md:hidden space-y-4">
                {jobs.map((job, index) => (
                  <div
                    key={job.ttdid || index}
                    className="border rounded p-4 shadow-sm"
                  >
                    <p><span className="font-semibold">#:</span> {index + 1}</p>
                    <p><span className="font-semibold">Tiêu đề:</span> {job.tieuDe}</p>
                    <p><span className="font-semibold">Trạng thái:</span> {job.trangThai}</p>
                    <p><span className="font-semibold">Ngày hết hạn:</span> {job.hanNop?.slice(0, 10)}</p>

                    <div className="mt-3 flex justify-between">
                      <Link
                        to={`/job/${job.ttdid}`}
                        className="text-blue-600 font-semibold hover:underline"
                      >
                        Chỉnh sửa
                      </Link>

                      <Link
                        to={`/applied/${job.ttdid}`}
                        className="text-green-600 font-semibold hover:underline"
                      >
                        Xem ứng tuyển
                      </Link>

                      <td className="">
                        <button
                          onClick={() => handleDelete(job.ttdid)}
                          className="text-red-600 hover:underline"
                        >
                          Xoá
                        </button>
                      </td>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
        <Footer />
      </div>
    </>
  );
}

export default JobList;
