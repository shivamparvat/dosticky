import React, { useEffect, useState } from "react";
import Product from "../../component/Product/Product";
import CartProduct from "./componenrt/CartProduct";
import Title from "../Home/component/Titel";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { AllProductCategory } from "../../redux/actions/product";
import RecommendedProduct from "../../component/RecommendedProduct";
import { Getcart, getTotleCartPrice } from "../../redux/actions/cart";
import CartTotleWidget from "../../component/CartTotleWidget";
function Cart() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.products);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(Getcart());
    dispatch(getTotleCartPrice());
    dispatch(AllProductCategory("marvel"));
  }, [dispatch]);

  return (
    <>
      {cart.loading ? (
        <>Loading...</>
      ) : cart.error === true ? (
        <>{cart.message}</>
      ) : (
        <div className="cartconteiner">
          {console.log(cart.cartTotle)}
          <div className="title">
            <div>
              <h2>
                cart item{" "}
                <span className="primary-color">
                  {cart && cart.cart && cart.cart.items.length}
                </span>
              </h2>
              <h2 className="totalPrice">
                total{" "}
                <span className="primary-color">
                  ₹{cart.cartTotle && cart.cartTotle.totleOriginalPrice}
                </span>
              </h2>
            </div>
            <hr />
          </div>
          <div className="cartProducts">
            <div className="cartlist">
              <div>
                {cart.cart &&
                  cart.cart.items &&
                  cart.cart.items.map((item) => <CartProduct product={item} />)}
              </div>
              {/* products */}
              <div className="randomProduct">
                <Title title="recommendation" />
                <RecommendedProduct img="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/610VAbGYPpL._SL1500_.jpg" />
                <div className="productCartRandom">
                  {product &&
                    product["marvel"].data.map((item, index) => (
                      <Product product={item} />
                    ))}
                </div>
              </div>
            </div>
            <CartTotleWidget cart={cart}/>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
