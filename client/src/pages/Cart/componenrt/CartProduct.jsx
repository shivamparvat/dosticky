import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
// import img from "../../../assets/sticker.webp";
import "./CartProduct.css";

function CartProduct() {
  return (
    <div className="cartMainContainer">
      <div className="cartImgContainer">
        {/* <img src={img} alt="" /> */}
      </div>
      <div>
        <div className="productNmae">
          <span>Lorem ipsum dolor sit amet.</span>
        </div>
        <div className="priceCardContainer">
          <div>
            <span>price ₹39</span>
            <br />
            <span className="delPrice">
              <del>₹49</del>
            </span>
            <span className="decount"> 20% Off</span>
          </div>
          <span className="saveAmount"> saved ₹10</span>
        </div>
        <div className="options">
          <div className="optionContainer">
            <select id="type">
              <option value="Mobile">Mobile</option>
              <option value="Leptop">Laptop</option>
            </select>
            <div className="quntity">
              <div className="buyButton">
                <div className="Minus">
                  <AiOutlineMinus />
                </div>
                <div className="qunatity">0</div>
                <div className="plus">
                  <AiOutlinePlus />
                </div>
              </div>
            </div>
          </div>
          <div className="removeButoon">Remove</div>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
