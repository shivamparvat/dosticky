import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
// import img from "../../../assets/sticker.webp";
import "./CartProduct.css";

function CartProduct() {
  return (
    <div className="cartMainContainer">
      <div className="cartImgContainer">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgqERYAMj5t6KvfBI3iy2zpV5mG128cgZIJTk_y7_P&s" alt="" />
      </div>
      <div>
        <div className="productNmae">
          <span>cemera</span>
        </div>
        <div className="priceCardContainer">
          <div>
            <span>price ₹90000</span>
            <br />
            <span className="delPrice">
              <del>₹100000</del>
            </span>
            <span className="decount"> 10% Off</span>
          </div>
          <span className="saveAmount"> saved ₹10000</span>
        </div>
        <div className="options">
          {/* <div className="optionContainer">
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
          </div> */}
          <div className="removeButoon">Remove</div>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
