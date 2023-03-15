import React from "react";
import logo from "../../assets/logo.jpg";
import "./index.css";

function index() {
  return (
    <div className="home">
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

export default index;
