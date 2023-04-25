import React, { useEffect, useState } from "react";
import "./productPage.css";
import productIMG from "../../assets/sticker.webp";
import { TbDiscount2, TbTruckDelivery } from "react-icons/tb";
import { GoLocation } from "react-icons/go";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Title from "../Home/component/Titel";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AllProductCategory, GetOneProduct } from "../../redux/actions/product";
import { AddTocart, Getcart } from "../../redux/actions/cart";
import ProductCart from "../../component/Product/Product";

function Product() {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const id = queryParams.get("id");
  const category = queryParams.get("category");

  const product = useSelector((state) => state.product);
  const productCategory = useSelector((state) => state.product?.category);
  const cart = useSelector((state) => state.cart);

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [imgIndex, setImgIndex] = useState(0);
  const [productData, setProductData] = useState(product?.product?.variants[0]);

  const categoryList = [category, "random"];

  useEffect(() => {
    dispatch(GetOneProduct(id));
    dispatch(Getcart());
    categoryList.map((category) => dispatch(AllProductCategory(category)));
  }, [dispatch, id]);

  useEffect(() => {
    for (let i = 0; i < product?.product?.variants.length; i++) {
      if (product?.product?.variants[i].quantity !== 0) {
        setProductData(product?.product?.variants[i]);
        setSize(product?.product?.variants[i].size);
        break;
      }
    }
  }, [product]);

  useEffect(() => {
    product?.product?.variants.map((item) => {
      if (item.size === size) {
        setSize(item.size);
        setProductData(item);
      }
    });
  }, [size, onRadiocheacked]);

  function onRadiocheacked(e) {
    setSize(e.target.value);
    setQuantity(1);
    product?.product?.variants.map((item) => {
      if (item.size === size) {
        setProductData(item);
      }
    });
  }

  function onAddToCart(e) {
    e.preventDefault();
    if (!size) window.alert("size not selected");
    const data = {
      quantity,
      size,
      product: id,
    };
    dispatch(AddTocart(data));
  }

  return (
    <div className="mainProductPage">
      <div className="PageproductContainer">
        <div className="productImagesContainer">
          <div className="mainImageContainer">
            <img src={product?.product?.images[imgIndex]?.image_url} alt="" />
          </div>
          <div className="subImageContainer">
            {product?.product?.images?.map((img, index) => (
              <div onClick={() => setImgIndex(index)} className="subImage">
                <img src={img?.image_url} alt="" />
              </div>
            ))}
          </div>
        </div>
        <div className="productDetailsContainer">
          <p className="category">{product?.product?.category[0]}</p>
          <h1 className="ProductTitle">{product?.product?.title}</h1>
          <div className="productPriceing">
            <div className="discountPercentage">
              {/* icon */}
              <p className="discountConteiner">
                <TbDiscount2 className="discountIcone" size={25} /> 20%
                <del> ₹{product?.product?.variants[0]?.price}</del>
                <h2>₹{product?.product?.variants[0]?.discountprice}</h2>
              </p>
            </div>
          </div>
          <div className="productVeriants">
            <h2>Size</h2>
            <div className="stickerSize">
              {product?.product?.variants?.map((item, index) => (
                <label key={index} htmlFor={item._id}>
                  <span>{item.discretion}</span>
                  <input
                    onChange={onRadiocheacked}
                    defaultChecked={
                      product?.product?.variants[0].size === item.size
                    }
                    type="radio"
                    name="size"
                    id={item._id}
                    disabled={item?.quantity === 0}
                    value={item.size}
                  />
                </label>
              ))}
            </div>
          </div>
          <div className="discriptionContainer">
            <h2>About Sticker</h2>
            <p className="productDiscription">
              {product?.product?.description}
            </p>
          </div>
          <div className="shippingDetails">
            <hr />
            <h3>Shpping</h3>
            <div className="deliveryTime flex">
              <TbTruckDelivery size={23} />
              <p>4-5 days</p>
            </div>
            <div className="deliveryTime flex">
              <GoLocation size={23} />
              <p>
                <span className="gray">Sent from</span> indore
              </p>
            </div>
          </div>
        </div>
        <div className="ProductPricingContainer">
          <h2>order summary</h2>
          {/* quantity */}
          <div className="quantity flex">
            <div>
              <h4>Quantity</h4> <span>(stoke {productData?.quantity})</span>
            </div>
            <div className="buyButton">
              <div
                className="Minus"
                onClick={() =>
                  setQuantity(quantity > 1 ? quantity - 1 : quantity)
                }
              >
                <AiOutlineMinus />
              </div>
              <div className="quantity">{quantity}</div>
              <div
                className="plus"
                onClick={() =>
                  setQuantity(
                    productData.quantity > quantity ? quantity + 1 : quantity
                  )
                }
              >
                <AiOutlinePlus />
              </div>
            </div>
          </div>
          {/* size */}
          <div className="sizeShowContainer flex">
            <h4>size</h4>
            <p>{productData?.discretion}</p>
          </div>
          <div className="deliveryShowContainer flex">
            <h4>delivery</h4>
            <p>
              <del>₹40</del> ₹0
            </p>
          </div>
          <hr />
          <div className="feature product flex">
            <div className="imageConteiner">
              <img src={product?.product?.images[0]?.image_url} alt="" />
            </div>

            <div className="ditails flex">
              <h4>{product?.product?.title}</h4>
              <div className="priceAndQunatity flex">
                <p>₹{product?.product?.variants[0]?.discountprice}</p>
                <p>{quantity}x</p>
              </div>
            </div>
          </div>
          <div className="button" onClick={onAddToCart}>
            Add To Cart
          </div>
          <Link to="/cart">
            <div className="button">view cart</div>
          </Link>
        </div>
      </div>
      <div className="productPageProducts">
        {productCategory &&
          categoryList.map((item, index) => {
            if (item === "undefined") return;
            return (
              <div key={index}>
                <Title title={item} />
                <div className="productGrid">
                  {productCategory[item]?.data.map((item) => (
                    <ProductCart
                      key={item?._id}
                      product={item}
                      cart={cart?.cart}
                      loading={cart?.loading}
                    />
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Product;

{
  /* <Product
                    key={item._id}
                    product={item}
                    cart={cart?.cart}
                    loading={cart?.loading}
                  /> */
}
