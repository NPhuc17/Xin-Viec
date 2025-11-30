import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import SearchBar from '../features/jobsearch/components/searchbar';
import FeaturedJob from '../features/featuredjob/featuredjob';
import CompanyHighlights from '../components/CompanyHighlights';
import PopularCategories from '../components/PopularCategories';
import hero from '../assets/hero.jpg';
import call from '../assets/calltoaction-2-1.png';
import Footer from '../components/Footer';


function Homepage() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('tkName'); // đồng bộ với Navbar
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar username={username} setUsername={setUsername} />

      {/* Hero Section */}
      <section className=" bg-no-repeat bg-cover bg-center text-white py-16 px-6 text-center h-100" style={{ backgroundImage: `url(${hero})` }}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Tìm việc làm mơ ước của bạn</h1>
        <p className="text-lg md:text-xl mb-6">
          Hàng ngàn cơ hội việc làm đang chờ bạn. Bắt đầu tìm kiếm ngay hôm nay!
        </p>
        <div className="max-w-xl mx-auto ">
          <SearchBar onSearch={handleSearch} className="bg-none" />

        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-12 px-6">
        <h2 className="text-2xl font-bold mb-6 text-primary">Việc làm nổi bật</h2>
        <FeaturedJob />
      </section>

      {/* Popular Categories */}
      {/* <section className="py-12 px-6 bg-secondary text-white rounded-md mx-6 my-6">
        <h2 className="text-2xl font-bold mb-6 text-white">Danh mục công việc phổ biến</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-accent rounded hover:bg-highlight cursor-pointer text-center">Công nghệ</div>
          <div className="p-4 bg-accent rounded hover:bg-highlight cursor-pointer text-center">Marketing</div>
          <div className="p-4 bg-accent rounded hover:bg-highlight cursor-pointer text-center">Thiết kế</div>
          <div className="p-4 bg-accent rounded hover:bg-highlight cursor-pointer text-center">Bán hàng</div>
        </div>
      </section> */}
      <PopularCategories />

      {/* Company Highlights */}
      <CompanyHighlights />

     <section className="max-w-6xl mx-auto py-12 px-6">
  <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 bg-white shadow-lg rounded-2xl overflow-hidden">

    {/* Ảnh bên trái */}
    <div className="h-full">
      <img
        src={call}
        alt="Call to Action"
        className="w-full h-full object-cover rounded-l-2xl md:rounded-none"
      />
    </div>

    {/* Nội dung bên phải */}
    <div className="p-8 flex flex-col gap-4">
      <h2 className="text-3xl font-bold text-gray-900">
        Sẵn sàng cho cơ hội nghề nghiệp mới?
      </h2>

      <p className="text-gray-600 text-lg">
        Hàng ngàn vị trí đang chờ bạn. Ứng tuyển dễ dàng và nhanh chóng. Chỉ cần hồ sơ của bạn, chúng tôi sẽ lo phần còn lại!
      </p>
        <div> 
      <button className="mt-4 bg-secondary hover:bg-highlight text-white px-6 py-3 rounded-xl font-semibold w-fit transition-all" onClick={() => navigate('/profile')}>
        Tạo hồ sơ ngay
      </button>
       <button className="mt-4 ml-4 bg-accent  hover:bg-highlight text-white px-6 py-3 rounded-xl font-semibold w-fit transition-all" onClick={() => navigate('/register')}>
        Đăng ký
      </button>
        </div>
    </div>
  </div>
</section>

      <Footer/>
    </div>
    
  );
}

export default Homepage;
