import React, { useEffect, useState } from "react";

function MultipleImage({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(intervalId);
  }, [images]);
  return (
    <img
      key={images[currentIndex] && images[currentIndex].image_id}
      src={images[currentIndex] && images[currentIndex].image_url}
      alt=""
    />
  );
}

export default MultipleImage;
