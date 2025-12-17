import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Cookies from "js-cookie";
import { variables } from "../variables";
import { useNavigate } from "react-router-dom";

function ReportedPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      const token = Cookies.get("jwt_token");

      if (!token) {
        setError("Bạn cần đăng nhập để xem lịch sử tố cáo.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${variables.API_URL}ToCao/to-cao-cua-toi`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        const contentType = res.headers.get("content-type");

        let data;
        if (contentType?.includes("application/json")) {
          data = await res.json();
        } else {
          data = await res.text();
          throw new Error(data);
        }

        if (!res.ok) {
          setError(data.message || "Không thể tải dữ liệu.");
        } else {
          setReports(data.data || []);
        }
      } catch (err) {
        setError("Lỗi tải dữ liệu: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <>
         <div className="min-h-screen flex flex-col justify-between">

      <Navbar />

      <div className=" p-6">

        {/* --- Loading --- */}
        {loading && (
          <div className="text-center text-primary text-lg font-semibold">
            Đang tải danh sách tố cáo...
          </div>
        )}

        {/* --- Error --- */}
        {!loading && error && (
          <div className="text-center text-red-600 font-semibold p-4">
            {error}
          </div>
        )}

        {/* --- Empty --- */}
        {!loading && !error && reports.length === 0 && (
          <div className="text-center text-gray-600">
            Bạn chưa tố cáo tin tuyển dụng nào.
          </div>
        )}

        {/* --- Danh sách tố cáo --- */}
        {!loading && reports.length > 0 && (
          <div>
            <h1 className="text-2xl font-bold text-primary mb-4">
              Lịch sử tố cáo của bạn
            </h1>

            <div className="space-y-4">
              {reports.map((item) => (
                <div
                  key={item.id}
                  className="border border-accent rounded-lg p-4 shadow-sm hover:bg-highlight transition cursor-pointer"
                  onClick={() => navigate(`/jobdetail/${item.tinTuyenDung.ttdid}`)}
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-secondary">
                      {item.tinTuyenDung.tieuDe}
                    </h2>
                    {/* <span className="text-sm text-gray-500">
                      #{item.id}
                    </span> */}
                  </div>

                  <p className="text-gray-700">
                    <span className="font-semibold">Công ty:</span>{" "}
                    {item.tinTuyenDung.ctName}
                  </p>

                  <p className="text-gray-700">
                    <span className="font-semibold">Lý do:</span>{" "}
                    {item.lyDo}
                  </p>

                  <p className="text-gray-700">
                    <span className="font-semibold">Nội dung:</span>{" "}
                    {item.noiDung}
                  </p>

                  <div className="flex justify-between mt-3">
                    <span className="px-3 py-1 bg-primary text-white rounded-md text-sm">
                      {item.trangThai}
                    </span>

                    <span className="text-sm text-gray-600">
                      {item.ngayToCao}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      <Footer />
      </div>
    </>
  );
}

export default ReportedPage;
