import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { variables } from "../variables";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Recommend() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("jwt_token");   // ⚡ lấy token từ cookie

    fetch(variables.API_URL + "UngTuyen/goi-y-thong-minh", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,    // ⚡ gửi token lên server
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Unauthorized hoặc lỗi API");
        }
        return res.json();  // chỉ json khi res hợp lệ
      })
      .then((data) => {
        setList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi:", err);
        setLoading(false);
      });
  }, []);

  const handleClick = (id) => {
    navigate(`/jobdetail/${id}`);
  };

  return (
    <>
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />

      <div className="container mt-4 mb-5">


        {loading ? (
          <p>Đang tải...</p>
        ) : list.length === 0 ? (
          <p>Không có gợi ý phù hợp.</p>
        ) : (
          <div className="row mx-4">
            {list.map((item) => (
              <div
                key={item.tinId}
                onClick={() => handleClick(item.tinId)}
                className="border border-accent rounded-md p-4 bg-white shadow-sm hover:border-highlight hover:shadow-md transition cursor-pointer mb-3"
              >
                <p className="text-lg font-semibold text-gray-800 mb-1">{item.tieuDe}</p>
                <p className="text-gray-600 text-sm mb-1">{item.congTy}</p>
                <p className="text-gray-500 text-sm">
                  Ngày đăng: <b>{item.ngayDang}</b> | Hạn nộp: <b>{item.hanNop}</b>
                </p>
                <p className="mt-1 text-sm">
                  Mức độ phù hợp: <b className="text-green-600">{item.phuHop}%</b>
                </p>
              </div>

            ))}
          </div>
        )}
      </div>

      <Footer />
      </div>
    </>
  );
}
