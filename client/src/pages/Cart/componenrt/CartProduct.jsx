import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
// import img from "../../../assets/sticker.webp";
import "./CartProduct.css";
import MultipleImage from "../../../utils/MultipleImage";
import { useDispatch } from "react-redux";
import { AddTocart, RemoveToCart, UpdateCart } from "../../../redux/actions/cart";

function CartProduct({ product }) {
  const productData =
    product &&
    product.product.variants.filter((variant) => product.size === variant.size);

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.quantity);
  const [valueChane, setValueChane] = useState(false);
  const [productSize, setProductSize] = useState(product.size);

  const data = {
    product_id: product.product._id,
    quantity: productSize !== product.size ? 1 : quantity,
    size: productSize,
  };

  function updateCart(e) {
    e.preventDefault();
    dispatch(UpdateCart(data));
  }
  function removeCartProduct(e) {
    e.preventDefault();
    const conform = window.confirm("remove item");
    if (conform) {
      dispatch(RemoveToCart(product.product._id));
    }
  }

  useEffect(() => {
    if (productSize !== product.size || quantity !== product.quantity) {
      setValueChane(true);
    } else {
      setValueChane(false);
    }
  }, [quantity, productSize]);

  return (
    <div className="cartMainContainer">
      <div className="cartImgContainer">
        <MultipleImage images={product.product.images} />
      </div>
      <div>
        <div className="productNmae">
          <span>{product.product.title}</span>
        </div>
        <div className="priceCardContainer">
          <div>
            <span>price ₹{productData[0].discountprice}</span>
            <br />
            <span className="delPrice">
              <del>₹{productData[0].price}</del>
            </span>
            <span className="decount">
              {" "}
              {parseInt(
                ((parseInt(productData[0].price) -
                  parseInt(productData[0].discountprice)) /
                  parseInt(productData[0].price)) *
                  100
              )}
              % Off
            </span>
          </div>
          <span className="saveAmount">
            {" "}
            saved ₹
            {parseInt(productData[0].price) -
              parseInt(productData[0].discountprice)}
          </span>
        </div>
        <div className="options">
          <div className="optionContainer">
            <select id="type" onChange={(e) => setProductSize(e.target.value)}>
              {product.product &&
                product.product.variants.map((item) => (
                  <option
                    selected={item.size === product.size}
                    value={item.size}
                    disabled={item.quantity === 0}
                  >
                    {item.discretion}
                  </option>
                ))}
            </select>
            <div className="quntity">
              <div className="buyButton">
                <div
                  className="Minus"
                  onClick={() =>
                    setQuantity(quantity > 1 ? quantity - 1 : quantity)
                  }
                >
                  <AiOutlineMinus />
                </div>
                <div className="qunatity">{quantity}</div>
                <div
                  className="plus"
                  onClick={() =>
                    setQuantity(
                      productData[0].quantity > quantity
                        ? quantity + 1
                        : quantity
                    )
                  }
                >
                  <AiOutlinePlus />
                </div>
              </div>
            </div>
          </div>
          <div className="removeButoon" onClick={removeCartProduct}>
            Remove
          </div>
          {valueChane && (
            <div className="button" onClick={updateCart}>
              update
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
