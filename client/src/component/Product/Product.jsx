import React, { useState } from "react";
import MultipleImage from "../../utils/MultipleImage" 
import "./index.css";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";

function Product({product}) {
  const [like, setLike] = useState(false);
  
  
  return (
    <div key={product._id} className="productCardcontainer">
      <div className="card">
        <div className="productImagecontainer">
          <MultipleImage images={product.images}/>
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
          <span>{product.title}</span>
        </div>
        <div className="priceCardContainer">
          <span>price ₹39</span>
          <br />
          <span className="delPrice">
            <del>₹{product.price}</del>
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
