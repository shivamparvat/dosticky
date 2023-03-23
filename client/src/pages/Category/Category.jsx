import React, { useEffect } from "react";
import Title from "../Home/component/Titel";

import { Link } from "react-router-dom";
import "./index.css";
import {useDispatch, useSelector } from "react-redux";
import { CategoryAll } from "../../redux/actions/category";

function Category() {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category.category);
  useEffect(() => {
    dispatch(CategoryAll())
  }, [dispatch])
  
  return (
    <div className="CategoryCaonponent">
      <Title title="category" />
      <div className="categoryCardCaontainer">
        {category &&
          category.data.map((item) => (
            <div>
              <Link to="/category/all">
                <div className="card">
                  <div className="imgContainer">
                    <img src={item.images && item.images.image_url} alt="" />
                  </div>
                  <div className="categoryTitle">
                    <h2>{item.category}</h2>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Category;
