

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { variables } from "../variables";
import { useNavigate } from "react-router-dom";

function PopularCategories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [showButtons, setShowButtons] = useState(false);
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(variables.API_URL + "LinhVuc/list");
        if (response.data?.data) {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách lĩnh vực:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const checkOverflow = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const totalWidth = itemsRef.current.reduce(
        (sum, item) => sum + (item?.offsetWidth || 0) + 16,
        0
      );
      setShowButtons(totalWidth > containerWidth);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [categories]);

  const scroll = (direction) => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({
      left: direction === "right" ? 200 : -200,
      behavior: "smooth",
    });
  };

  const handleCategoryClick = (category) => {
    navigate(`/search?linhvuc=${category.lvid}`);
  };

  return (
    <section className="py-12 px-6 bg-secondary text-white rounded-md mx-6 my-6">
      <h2 className="text-2xl font-bold mb-6 text-white">Danh mục công việc phổ biến</h2>
      <div className="relative">
        {showButtons && (
          <>
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
            >
              &#8249;
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
            >
              &#8250;
            </button>
          </>
        )}

        <div
          ref={containerRef}
          className="flex overflow-x-hidden space-x-4 py-2 px-2 justify-evenly"
        >
          {categories.map((category, index) => (
            <div
              key={category.lvid}
              ref={(el) => (itemsRef.current[index] = el)}
              onClick={() => handleCategoryClick(category)}
              className="flex-shrink-0 min-w-[140px] bg-accent rounded-lg shadow-md hover:shadow-xl hover:scale-105 transform transition-all duration-300 cursor-pointer text-center py-4 px-10"
            >
              {category.lvName}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularCategories;
