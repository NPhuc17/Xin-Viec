import React, { useEffect, useState } from "react";
import { variables } from "../../variables";
import { Link } from "react-router-dom";


function BaoCaoList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLockedJobs = async () => {
      try {
        const res = await fetch(
          variables.API_URL + "ToCao/da-khoa",
          { credentials: "include" }
        );

        const data = await res.json();

        if (res.ok) {
          setJobs(data.data || []);
        } else {
          setError(data.message || "Không tải được danh sách tin bị khóa.");
        }
      } catch (err) {
        console.error(err);
        setError("Lỗi kết nối máy chủ!");
      } finally {
        setLoading(false);
      }
    };

    fetchLockedJobs();
  }, []);

  if (loading)
    return <p className="text-center mt-6">Đang tải danh sách tin bị khóa...</p>;

  if (error)
    return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-red-600">
        Danh sách tin tuyển dụng đã bị khóa
      </h2>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">
          Không có tin tuyển dụng nào bị khóa.
        </p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Công ty</th>
              <th className="p-2 border">Nhà tuyển dụng</th>
              <th className="p-2 border">Tiêu đề</th>
              <th className="p-2 border">Trạng thái</th>
              <th className="p-2 border">Ngày đăng</th>
              <th className="p-2 border">Hạn nộp</th>
              <th className="p-2 border">Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={job.ttdid} className="text-center">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{job.ctName}</td>
                <td className="p-2 border">{job.ntdName}</td>
                <td className="p-2 border">{job.tieuDe}</td>
                <td className="p-2 border text-red-600 font-semibold">
                  {job.trangThai}
                </td>
                <td className="p-2 border">
                  {job.ngayDang?.slice(0, 10)}
                </td>
                <td className="p-2 border">
                  {job.hanNop?.slice(0, 10)}
                </td>
                <td className="p-2 border">
                  <Link
                    to={`/admin/jobs/${job.ttdid}`}
                    state={{ viewOnly: true }}   // 👈 flag chỉ xem
                    className="text-blue-600 hover:underline"
                  >
                    Xem chi tiết
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BaoCaoList;
