import React, { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import "./AutoSlider.css";
import { PosterStore } from "../../../stores/poster.store";

function AutoSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);
  const { getPosters, posters } = PosterStore();

  // getting poster for slider

  useEffect(() => {
    getPosters();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === posters?.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? posters?.length - 1 : prevIndex - 1
    );
  };
  useEffect(() => {
    if (posters.length === 0) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [posters]);

  return (
    <div className="carousel-container">
      <button className="carousel-btn left" onClick={prevSlide}>
        <FaAngleLeft />
      </button>

      <div className="carousel-wrapper" ref={slideRef}>
        <div
          className="carousel-slider"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {posters.map((item) => (
            <div className="carousel-slide" key={item?.id}>
              <div className="slide-content">
                <div className="slide-text">{item?.title}</div>
                <img src={item?.img} alt={`${item?.title} rasmi `} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="carousel-btn right" onClick={nextSlide}>
        <FaAngleRight />
      </button>
    </div>
  );
}

export default AutoSlider;
