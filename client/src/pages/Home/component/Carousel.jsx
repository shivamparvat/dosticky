import React, { useEffect, useState } from "react";
import "./Couousel.css";

import { GrPrevious, GrNext } from "react-icons/gr";

function Carousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, 4000); // Change image every 2 seconds

    return () => clearInterval(intervalId);
  }, [images]);

  function previousCarouel() {
    if (currentIndex === 0) {
      setCurrentIndex(images.length-1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  }
  function nextCarouel() {
    if (currentIndex === images.length-1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }
  return (
    <div className="Carousel">
      <div className="carouselImgContainer">
        <div>
          <img key={images[currentIndex]} src={images[currentIndex]} alt="" />
        </div>
      </div>
      <div className="carouselButton">
        <div className="pre" onClick={previousCarouel}>
          <GrPrevious />
        </div>
        <div className="next" onClick={nextCarouel}>
          <GrNext />
        </div>
      </div>
      <div className="curoselDot">
        {images.map((item, index) => {
          return (
            <div className={index === currentIndex ? "active" : ""}>.</div>
          );
        })}
      </div>
    </div>
  );
}

export default Carousel;
