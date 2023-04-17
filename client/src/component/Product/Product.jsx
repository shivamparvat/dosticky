import React, { useEffect, useState } from "react";
import MultipleImage from "../../utils/MultipleImage";
import { useDispatch } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import "./Product.css";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import { AddTocart } from "../../redux/actions/cart";

function Product({ product, cart, loading }) {
  const dispatch = useDispatch();
  // finding product in cart
  const cartdataProductChackeIndex =
    typeof cart === String
      ? false
      : cart &&
        cart.items.findIndex(
          (item) => item.product && item.product._id == product._id
        );

  // const CartQuantity =
  //   cartdataProductChackeIndex === -1 ||
  //   cartdataProductChackeIndex === undefined
  //     ? 1
  //     : typeof cart === String
  //     ? false
  //     : cart && cart.items[cartdataProductChackeIndex].quantity;

  const [like, setLike] = useState(false);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [productData, setProductData] = useState(product.variants[0]);
  const [msg, setMsg] = useState("");

  // if product in cart then this value is ture
  const [productInCart, setProductInCart] = useState(false);

  // controlling popup window
  const [AddToCartAtivate, setAddToCartAtivate] = useState(false);

  useEffect(() => {
    // id product in cart then setProductInCart is true
    setProductInCart(
      cartdataProductChackeIndex == -1 ||
        cartdataProductChackeIndex === undefined
        ? false
        : true
    );
  }, [cart, onsubmitHeadler]);


  // setQuantity(CartQuantity);
  // if radio button change
  function onRadiocheacked(e) {
    setMsg("");
    setSize(e.target.value);
    product.variants.map((item) => {
      if (item.size === size) {
        setProductData(item);
      }
    });
  }

  // change quantity accorting to product size
  useEffect(() => {
    product.variants.map((item) => {
      if (item.size === size) {
        setProductData(item);
        setQuantity(1);
      }
    });
  }, [product, size]);

  // when add to cart press
  function onsubmitHeadler(e) {
    e.preventDefault();
    if (!productData) {
      setMsg("please select size");
    }
    const data = {
      product: product._id,
      quantity,
      size: productData.size,
    };
    dispatch(AddTocart(data));
    setAddToCartAtivate(false);
  }

  return (
    <div className="productCardcontainer">
      <div className="card">
        <div className="productImagecontainer">
          <MultipleImage images={product.images} />
          {/* product like */}
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
        {/* product details */}
        <div className="productNmae">
          <span>
            <b>{product.title}</b>
          </span>
          <br />
          <span className="description">{product.description}</span>
        </div>

        {/* price */}
        <div className="priceCardContainer">
          <span>
            price <del>₹{product.variants[0].price}</del>
          </span>
          <br />
          <span className="delPrice">₹{product.variants[0].discountprice}</span>
          <span className="decount">
            {parseInt(
              ((parseInt(product.variants[0].price) -
                parseInt(product.variants[0].discountprice)) /
                parseInt(product.variants[0].price)) *
                100
            )}
            % Off
          </span>
        </div>
        {/* add to cart And view cart button */}
        <div className="CartAndAttoToCartButton">
          {productInCart && (
            <Link to="/cart">
              <div className="button addToCart">Cart</div>
            </Link>
          )}
          <div
            className="addToCart button"
            onClick={() => setAddToCartAtivate(AddToCartAtivate ? false : true)}
          >
            <div className="plus">
              <AiOutlinePlus />
            </div>
            <div>
              <span>Add</span>
            </div>
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

                {/* product details */}
                <div className="cantent">
                  <p className="title">{product.title}</p>
                  {/* price details */}
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
                  {/* discription */}
                  <p className="discription">{product.description}</p>

                  {/* msg box */}
                  <div className="variant">
                    {productData.quantity === 0 && size ? (
                      <p className="outOfstock">Out off stoke</p>
                    ) : (
                      ""
                    )}
                    {(productData.quantity !== 0 &&
                      productData.quantity === quantity) ||
                    (productData.quantity <= 5 &&
                      productData.quantity !== 0) ? (
                      <p className="outOfstock">
                        Only {productData.quantity} available
                      </p>
                    ) : (
                      ""
                    )}
                    {/* radio button options */}
                    <div className="categoryCantainer sticker-sizeContainer">
                      {product.variants.map((item, index) => (
                        <div key={index} className="sticker-size">
                          <label htmlFor={item._id}>
                            <span>{item.discretion}</span>

                            <input
                              onChange={onRadiocheacked}
                              defaultChecked={
                                product.variants[0].size === item.size
                              }
                              type="radio"
                              name="size"
                              id={item._id}
                              disabled={item.quantity === 0}
                              value={item.size}
                            />
                          </label>
                        </div>
                      ))}
                    </div>
                    {/* msg box */}
                    <div className="msg">
                      <p>{msg}</p>
                    </div>
                  </div>
                  <div className="addToCartContainer">
                    {productData.quantity === 0 && size ? (
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
                          <div>
                            <input
                              type="submit"
                              className="addToCart button"
                              value="Add To Cart"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {productInCart && (
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
