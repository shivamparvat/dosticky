import React from "react";
import "./CategotyCard.css";

function CategotyCard({category}) {
  return (
    <div className="categoruMaincontainer">
      <div className="category">
        {category &&
          category.data.map((item) => (
            <div key={item._id} className="categoryCard">
              <div className="cartegoryImageContaimner">
                <img src={item.images && item.images.image_url} alt="" />
              </div>
              <div>
                <span>{item.category}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CategotyCard;
