import React, { useEffect } from "react";
import Product from "../../component/Product/Product";
import CartProduct from "./componenrt/CartProduct";
import Title from "../Home/component/Titel";
import { TbDiscount } from "react-icons/tb";
import { FiChevronRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./index.css";
import { AllProductCategory } from "../../redux/actions/product";
function Cart() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(AllProductCategory("marvel"))
  }, [dispatch]);

  return (
    <div className="cartconteiner">
      <div className="title">
        <div>
          <h2>
            cart item <span className="primary-color">6</span>
          </h2>
          <h2 className="totalPrice">
            total <span className="primary-color">₹360</span>
          </h2>
        </div>
        <hr />
      </div>
      <div className="cartProducts">
        <div className="cartlist">
          <div>
            <CartProduct />
            <CartProduct />
            <CartProduct />
            <CartProduct />
            <CartProduct />
            <CartProduct />
            <CartProduct />
            <CartProduct />
            <CartProduct />
            <CartProduct />
            <CartProduct />
            <CartProduct />
          </div>
          {/* products */}
          <div className="randomProduct">
            <Title title="redom product" />
            <div className="productCartRandom">
              {product && product["marvel"].data.map((item, index) => (
                <Product product={item} />
              ))}
            </div>
          </div>
        </div>
        <div className="priceDetail">
          <div className="offers">
            <div>
              <div className="heading">
                <div>
                  <TbDiscount className="percentage" />
                </div>
                <div>offers & discount</div>
              </div>
              <p className="discountMsg">
                save ₹100 with{" "}
                <span className="primary-color">DOSTICKYNEW</span>
              </p>
            </div>
            <div className="offerTaxtCart">
              <span className="primary-color">offer 3</span>
              <FiChevronRight className="right primary-color" />
            </div>
          </div>
          <div className="totalCartContainer">
            <div className="subTotalBox">
              <div>
                <p>item total {"(3)"}</p>
                <p>delivery fee</p>
              </div>
              <div>
                <p>
                  <del>₹170</del>
                  <span>₹150</span>
                </p>
                <p>
                  <del>₹40</del>
                  <span>₹0</span>
                </p>
              </div>
            </div>
            <div className="totalPrice">
              <div>
                <p>Total Amount</p>
                <p>
                  <b>₹30,900</b>
                </p>
              </div>
            </div>
            <div className="continueButtonContainer">
              <div>
                <Link to="/checkout" className="continueButton">
                  Continue
                </Link>
              </div>
            </div>
            <div className="saveTaxt">
              <p>You will save ₹3,000 on this order</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
