import React from "react";
import img from "../../../assets/sticker.webp";
import "./OrderCard.css"

function OrderCard() {
  return (
    <div className="OrderCardCantainer">
      <div className="productImage">
        <img src={img} alt="" />
      </div>
      <div className="detailsCantainer">
        <div className="titleCantainer">
          <p>Lorem, ipsum dolor.</p>
          <p>4X3 Inch</p>
        </div>
        <div className="price">₹534</div>
        <div className="status"><div className="StatusIndicater"></div> Delivered on Nov 30, 2022</div>
      </div>
    </div>
  );
}

export default OrderCard;
