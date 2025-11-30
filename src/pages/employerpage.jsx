// pages/Employerpage.jsx
import React from 'react';
import EmployerNavbar from '../components/employernavbar';
import Footer from '../components/Footer';
import hand from "../assets/hand.jpg";

function Employerpage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <EmployerNavbar />

      {/* Hero Section */}
      <header className="bg-secondary text-white py-24 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--color-highlight)]">
          Đăng tin tuyển dụng, tìm kiếm ứng viên hiệu quả
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Kết nối với hàng ngàn ứng viên tiềm năng chỉ trong vài phút.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="/jobcreate"
            className="px-6 py-3 bg-accent text-white rounded-md font-semibold hover:bg-highlight transition"
          >
            Tạo tin tuyển dụng
          </a>
          <a
            href="/joblist"
            className="px-6 py-3 bg-primary text-white rounded-md font-semibold hover:bg-highlight transition"
          >
            Xem danh sách tin tuyển dụng
          </a>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">Những con số của trang tuyển dụng</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center">
            <div className="text-4xl font-bold text-accent mb-2">120+</div>
            <div className="text-gray-600">Tin tuyển dụng đang hoạt động</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center">
            <div className="text-4xl font-bold text-accent mb-2">500+</div>
            <div className="text-gray-600">Ứng viên tiềm năng</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center">
            <div className="text-4xl font-bold text-accent mb-2">95%</div>
            <div className="text-gray-600">Tỷ lệ kết nối thành công</div>
          </div>
        </div>
      </section>



      {/* Call to Action Section */}
      <section className="py-16 px-6 text-center bg-cover bg-center rounded-md mx-6 my-6" style={{ backgroundImage: `url(${hand})` }}>
        <h2 className="text-3xl font-bold text-accent mb-6">Bắt đầu ngay hôm nay</h2>
        <p className="text-white text-lg mb-6 max-w-xl mx-auto">
          Đăng ký tài khoản nhà tuyển dụng để đăng tin tuyển dụng và tiếp cận ứng viên chất lượng.
        </p>
        <a
          href="/employer/login"
          className="px-8 py-4 bg-accent text-white font-semibold rounded-md hover:bg-highlight transition"
        >
          Đăng ký / Đăng nhập
        </a>
      </section>


      {/* Employer Testimonials Section */}
<section className="py-16 px-6 bg-white">
  <h2 className="text-3xl font-bold text-primary mb-10 text-center">
    Nhà tuyển dụng nói gì về chúng tôi?
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

    {/* Card 1 */}
    <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
      <img
        src="src/assets/emp1.jpg"
        alt="Employer 1"
        className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
      />
      <h3 className="text-xl font-semibold text-center">Nguyễn Hoàng Nam</h3>
      <p className="text-sm text-gray-500 text-center mb-3">HR Manager - FPT Software</p>

      <p className="text-gray-600 text-center">
        “Nền tảng giúp chúng tôi tiếp cận ứng viên nhanh chóng và phù hợp. Chỉ trong 24 giờ đã tìm được ứng viên tiềm năng.”
      </p>
    </div>

    {/* Card 2 */}
    <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
      <img
        src="src/assets/emp2.jpg"
        alt="Employer 2"
        className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
      />
      <h3 className="text-xl font-semibold text-center">Trần Thu Hà</h3>
      <p className="text-sm text-gray-500 text-center mb-3">CEO - AlphaTech</p>

      <p className="text-gray-600 text-center">
        “Giao diện thân thiện, dễ đăng tin, dễ quản lý. Tỷ lệ ứng tuyển cao hơn so với nhiều nền tảng khác.”
      </p>
    </div>

    {/* Card 3 */}
    <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
      <img
        src="src/assets/emp3.jpeg"
        alt="Employer 3"
        className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
      />
      <h3 className="text-xl font-semibold text-center">Lê Minh Tùng</h3>
      <p className="text-sm text-gray-500 text-center mb-3">Talent Acquisition - VNG</p>

      <p className="text-gray-600 text-center">
        “Chúng tôi tìm được các ứng viên phù hợp nhanh và tiết kiệm chi phí hơn nhờ bộ lọc thông minh của hệ thống.”
      </p>
    </div>

  </div>
</section>


      <Footer/>
    </div>

    
  );
}

export default Employerpage;
