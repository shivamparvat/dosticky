import React, { useEffect } from "react";
import Product from "../../component/Product/Product";
import CartProduct from "./componenrt/CartProduct";
import Title from "../Home/component/Titel";
import { useDispatch, useSelector } from "react-redux";
import "./Cart.css";
import cartempty from "../../assets/cartempty.webp";
import RecommendedProduct from "../../component/RecommendedProduct";
import { Getcart } from "../../redux/actions/cart";
import CartTotalWidget from "../../component/CartTotalWidget";
import { Link, useNavigate } from "react-router-dom";
import { AllProductCategory } from "../../redux/actions/product";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.products);
  const cart = useSelector((state) => state.cart);
  const productCategory = useSelector((state) => state.product?.category);
  const { isAuthenticated } = useSelector((state) => state.user);

  const categoryList = ["random"];

  useEffect(() => {
    dispatch(Getcart());
    categoryList.map((category) => dispatch(AllProductCategory(category)));
  }, [dispatch]);

  function continueButton() {
    const isAuth = isAuthenticated || false;
    if (!isAuth) {
      navigate("/login");
    }
    navigate("/checkout");
  }

  return (
    <>
      {cart.loading ? (
        <>Loading...</>
      ) : cart?.cart?.totalItem === 0 ? (
        <>
          <div className="CartEmptyMsgContainer">
            <div className="emptyCartcontainer">
              <div className="emptyImg">
                <img src={cartempty} alt="" />
              </div>
              <p>Cart is empty</p>
            </div>
            <div className="emptyCartcontainerButton">
              <div className="button backtoHome">
                <Link to="/">back to Home</Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="cartconteiner">
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
                  ₹{cart.cartTotal && cart.cartTotal.totalPrice}
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
                {productCategory &&
                  categoryList.map((item, index) => {
                    if (item === "undefined") return;
                    return (
                      <div key={index}>
                        <Title title={item} />
                        <div className="productGrid">
                          {productCategory[item]?.data.map((item) => (
                            <Product
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
            <CartTotalWidget
              continueButton={continueButton}
              cart={cart}
              ButtonText="Continue"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
