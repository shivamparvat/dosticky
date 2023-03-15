import React from "react";
import "./Couousel.css";
import sticker from "../../../assets/sticker.webp";
import { GrPrevious, GrNext } from "react-icons/gr";

function Carousel() {
  return (
    <div className="Carousel">
      <div className="carouselImgContainer">
        <div>
          <img src={sticker} alt="" />
        </div>
        <div>
          <img src={sticker} alt="" />
        </div>
        <div>
          <img src={sticker} alt="" />
        </div>
      </div>
      <div className="carouselButton">
        <div className="pre"><GrPrevious/></div>
        <div className="next"><GrNext/></div>
      </div>
      <div className="curoselDot">
        <div>.</div>
        <div>.</div>
        <div>.</div>
      </div>
    </div>
  );
}

export default Carousel;
