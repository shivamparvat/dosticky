import React from "react";
import Title from "../Home/component/Titel";
import sticker from "../../assets/sticker.webp";
import { Link } from "react-router-dom";
import "./index.css";

function Category() {
  return (
    <div className="CategoryCaonponent">
      <Title title="category" />
      <div className="categoryCardCaontainer">
        <Link to="/category/all">
          <div className="card">
            <div className="imgContainer">
              <img src={sticker} alt="" />
            </div>
            <div className="categoryTitle">
              <h2>Category</h2>
            </div>
          </div>
        </Link>
        <Link to="/category/all">
          <div className="card">
            <div className="imgContainer">
              <img src={sticker} alt="" />
            </div>
            <div className="categoryTitle">
              <h2>Category</h2>
            </div>
          </div>
        </Link>
        <Link to="/category/all">
          <div className="card">
            <div className="imgContainer">
              <img src={sticker} alt="" />
            </div>
            <div className="categoryTitle">
              <h2>Category</h2>
            </div>
          </div>
        </Link>
        <Link to="/category/all">
          <div className="card">
            <div className="imgContainer">
              <img src={sticker} alt="" />
            </div>
            <div className="categoryTitle">
              <h2>Category</h2>
            </div>
          </div>
        </Link>
        <Link to="/category/all">
          <div className="card">
            <div className="imgContainer">
              <img src={sticker} alt="" />
            </div>
            <div className="categoryTitle">
              <h2>Category</h2>
            </div>
          </div>
        </Link>
        <Link to="/category/all">
          <div className="card">
            <div className="imgContainer">
              <img src={sticker} alt="" />
            </div>
            <div className="categoryTitle">
              <h2>Category</h2>
            </div>
          </div>
        </Link>
        <Link to="/category/all">
          <div className="card">
            <div className="imgContainer">
              <img src={sticker} alt="" />
            </div>
            <div className="categoryTitle">
              <h2>Category</h2>
            </div>
          </div>
        </Link>
        <Link to="/category/all">
          <div className="card">
            <div className="imgContainer">
              <img src={sticker} alt="" />
            </div>
            <div className="categoryTitle">
              <h2>Category</h2>
            </div>
          </div>
        </Link>
        <Link to="/category/all">
          <div className="card">
            <div className="imgContainer">
              <img src={sticker} alt="" />
            </div>
            <div className="categoryTitle">
              <h2>Category</h2>
            </div>
          </div>
        </Link>
        <Link to="/category/all">
          <div className="card">
            <div className="imgContainer">
              <img src={sticker} alt="" />
            </div>
            <div className="categoryTitle">
              <h2>Category</h2>
            </div>
          </div>
        </Link>
        <Link to="/category/all">
          <div className="card">
            <div className="imgContainer">
              <img src={sticker} alt="" />
            </div>
            <div className="categoryTitle">
              <h2>Category</h2>
            </div>
          </div>
        </Link>
        <Link to="/category/all">
          <div className="card">
            <div className="imgContainer">
              <img src={sticker} alt="" />
            </div>
            <div className="categoryTitle">
              <h2>Category</h2>
            </div>
          </div>
        </Link>
        <Link to="/category/all">
          <div className="card">
            <div className="imgContainer">
              <img src={sticker} alt="" />
            </div>
            <div className="categoryTitle">
              <h2>Category</h2>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Category;
