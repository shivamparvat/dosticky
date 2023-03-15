import React from "react";
import "./CategotyCard.css";
import logo from "../../../assets/sticker.webp";

function CategotyCard() {
  return (
    <div className="categoruMaincontainer">
      <div className="category">
        <div className="categoryCard">
          <div className="cartegoryImageContaimner">
            <img src={logo} alt="" />
          </div>
          <div>
            <span>category</span>
          </div>
        </div>
        <div className="categoryCard">
          <div className="cartegoryImageContaimner">
            <img src={logo} alt="" />
          </div>
          <div>
            <span>category</span>
          </div>
        </div>
        <div className="categoryCard">
          <div className="cartegoryImageContaimner">
            <img src={logo} alt="" />
          </div>
          <div>
            <span>category</span>
          </div>
        </div>
        <div className="categoryCard">
          <div className="cartegoryImageContaimner">
            <img src={logo} alt="" />
          </div>
          <div>
            <span>category</span>
          </div>
        </div>
        <div className="categoryCard">
          <div className="cartegoryImageContaimner">
            <img src={logo} alt="" />
          </div>
          <div>
            <span>category</span>
          </div>
        </div>
        <div className="categoryCard">
          <div className="cartegoryImageContaimner">
            <img src={logo} alt="" />
          </div>
          <div>
            <span>category</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategotyCard;
