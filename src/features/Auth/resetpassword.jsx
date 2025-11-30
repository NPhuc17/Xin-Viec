import React, { useState } from "react";
import { variables } from "../../variables";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

function Resetpassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch(variables.API_URL + "ResetPassword/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "Link đặt lại mật khẩu đã được gửi đến email của bạn.");
      } else {
        setError(data.message || "Gửi yêu cầu thất bại.");
      }
    } catch (err) {
      console.error(err);
      setError("Không thể kết nối đến máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar />
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-primary to-accent mb-[-1.25rem]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Đặt lại mật khẩu</h2>

        <label className="block mb-2 font-medium">Nhập địa chỉ email của bạn:</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-md w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="example@email.com"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white font-semibold w-full py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Đang gửi..." : "Gửi link đặt lại"}
        </button>

        {message && <p className="text-green-600 mt-4 text-center">{message}</p>}
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </form>
    </div>
    <Footer />
    </>
  );
}

export default Resetpassword;
