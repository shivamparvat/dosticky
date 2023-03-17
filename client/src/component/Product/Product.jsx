import React, { useState } from "react";
import "./index.css";
import sticker from "../../assets/sticker.webp";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";

function Product() {

  const [like, setLike] = useState(false);
  // useState

  return (
    <div className="productCardcontainer">
      <div className="card">
        <div className="productImagecontainer">
          <img src={sticker} alt="" />
          <div className="ProductLikeCardContener">
            {like ? (
              <div className="like" onClick={()=>setLike(false)}>
                <AiFillHeart className="LikeIcone" size={20} />
              </div>
            ) : (
              <div className="unlike" onClick={()=>setLike(true)}>
                <AiOutlineHeart size={20} />
              </div>
            )}  
          </div>
        </div>
        <div className="productNmae">
          <span>Lorem ipsum dolor sit amet.</span>
        </div>
        <div className="priceCardContainer">
          <span>price ₹39</span>
          <br />
          <span className="delPrice">
            <del>₹49</del>
          </span>
          <span className="decount"> 10% Off</span>
        </div>
        {true ? (
          <div className="buyButton">
            <div className="Minus">
              <AiOutlineMinus />
            </div>
            <div className="qunatity">0</div>
            <div className="plus">
              <AiOutlinePlus />
            </div>
          </div>
        ) : (
          <div className="addToCart">
            <div className="plus">
              <AiOutlinePlus />
            </div>
            <div>
              <span>Add To Cart</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Product;
