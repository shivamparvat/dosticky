import React, { useEffect, useState } from "react";
import MultipleImage from "../../utils/MultipleImage";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import "./Product.css";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";

function Product({ product }) {
  const [like, setLike] = useState(false);
  const AddToCart = (id) => {
    console.log(id);
  };

  const [AddToCartAtivate, setAddToCartAtivate] = useState(false);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [productData, setProductData] = useState(product.size[0]);
  const [msg, setMsg] = useState("")

  const options = [];
  product.size.map((item) => {
    options.push({
      label: item.size + "  " + item.discretion,
      value: item.size,
    });
    return;
  });

  function oncheacked(e) {
    setMsg("")
    setSize(e.target.value);
  }
  useEffect(() => {
    product.size.map((item) => {
      if (item.size === size) {
        setProductData(item);
        setQuantity(1);
      }
    });
  }, [product, size]);
  function onsubmitHeadler(e){
    e.preventDefault()
    if(!size){
        setMsg("please select size")
    }
  }




  return (
    <div key={product._id} className="productCardcontainer">
      <div className="card">
        <div className="productImagecontainer">
          <MultipleImage images={product.images} />
          <div className="ProductLikeCardContener">
            {like ? (
              <div className="like" onClick={() => setLike(false)}>
                <AiFillHeart className="LikeIcone" size={20} />
              </div>
            ) : (
              <div className="unlike" onClick={() => setLike(true)}>
                <AiOutlineHeart size={20} />
              </div>
            )}
          </div>
        </div>
        <div className="productNmae">
          <span>
            <b>{product.title}</b>
          </span>
          <br />
          <span className="description">{product.description}</span>
        </div>
        <div className="priceCardContainer">
          <span>
            price <del>₹{product.size[0].price}</del>
          </span>
          <br />
          <span className="delPrice">₹{product.size[0].discountprice}</span>
          <span className="decount">
            {parseInt(
              ((parseInt(product.size[0].price) -
                parseInt(product.size[0].discountprice)) /
                parseInt(product.size[0].price)) *
                100
            )}
            % Off
          </span>
        </div>
        <div
          className="addToCart"
          onClick={() => setAddToCartAtivate(AddToCartAtivate ? false : true)}
        >
          <div className="plus">
            <AiOutlinePlus />
          </div>
          <div>
            <span>Add To Cart</span>
          </div>
        </div>
      </div>

      {/* popup window */}
      {AddToCartAtivate && (
        <div className="fullproduct">
          <form action="" onSubmit={onsubmitHeadler}>
            <div className="cantainer">
              {/* cencel button */}
              <div className="cencelX">
                <RxCross1
                  onClick={() =>
                    setAddToCartAtivate(AddToCartAtivate ? false : true)
                  }
                />
              </div>
              <div className="detailContainer">
                {/* images */}
                <div className="productImagecontainerfullproduct">
                  <MultipleImage images={product.images} />
                </div>
                <div className="cantent">
                  <p className="title">{product.title}</p>
                  <p className="price">
                    price ₹ <del>{productData.price}</del>
                    <span className="discountedPrice">
                      {" "}
                      ₹{productData.discountprice}
                    </span>
                  </p>
                  <p className="savePrice">
                    save ₹
                    {parseInt(productData.price) -
                      parseInt(productData.discountprice)}
                    <span>
                      {" "}
                      {parseInt(
                        ((parseInt(productData.price) -
                          parseInt(productData.discountprice)) /
                          parseInt(productData.price)) *
                          100
                      )}
                      % Off
                    </span>
                  </p>
                  <p className="discription">{product.description}</p>
                  
                    {/* msg box */}
                  <div className="variant">
                    {console.log(productData.quantity)}
                    {productData.quantity == 0 && size ? (
                      <p className="outOfstock">Out off stoke</p>
                    ) : (
                      ""
                    )}
                    {(productData.quantity != 0 &&
                      productData.quantity == quantity) ||
                    (productData.quantity <= 5 && productData.quantity != 0) ? (
                      <p className="outOfstock">
                        Only {productData.quantity} available
                      </p>
                    ) : (
                      ""
                    )}
                    <div className="categoryCantainer sticker-sizeContainer">
                      {product.size.map((item, index) => (
                        <div key={item._id} className="sticker-size">
                          <label htmlFor={item._id}>
                            <span>{item.discretion}</span>

                            <input
                              onChange={(e) => oncheacked(e)}
                              // defaultChecked={product.size[0].size === item.size}
                              type="radio"
                              name="size"
                              id={item._id}
                              disabled={item.quantity == 0}
                              value={item.size}
                            />
                          </label>
                        </div>
                      ))}

                    </div>
                      <div className="msg">
                        <p>{msg}</p>
                      </div>
                  </div>
                  <div className="addToCartContainer">
                    {productData.quantity == 0 && size ? (
                      <div>
                        <div className="inputContainer">
                          <input type="email" placeholder="Email" />
                        </div>
                        <div className="notifyme button">
                          <p>notifyme</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        {size && (
                          <div className="buyButton">
                            <div
                              className="Minus"
                              onClick={() =>
                                setQuantity(
                                  quantity > 1 ? quantity - 1 : quantity
                                )
                              }
                            >
                              <AiOutlineMinus />
                            </div>
                            <div className="quantity">{quantity}</div>
                            <div
                              className="plus"
                              onClick={() =>
                                setQuantity(
                                  productData.quantity > quantity
                                    ? quantity + 1
                                    : quantity
                                )
                              }
                            >
                              <AiOutlinePlus />
                            </div>
                          </div>
                        )}
                        <div>
                          <input
                            type="submit"
                            className="addToCart button"
                            value="Add To Cart"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {false && (
                <div className="gotocartContainer">
                  <div className="gotocard">
                    <Link to="/cart" className=" button">
                      <p>Go to cart</p>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Product;
