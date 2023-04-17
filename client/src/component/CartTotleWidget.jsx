import React from 'react'
import { TbDiscount } from "react-icons/tb";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

function CartTotleWidget({cart}) {
  return (
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
          save ₹1500 with{" "}
          <span className="primary-color">NEWPRO</span>
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
          <p>item total {`(${cart.cart && cart.cart.totalItem})`}</p>
          <p>delivery fee</p>
        </div>
        <div>
          <p>
            <del>
              ₹{cart.cartTotle && cart.cartTotle.totleOriginalPrice}
            </del>
            <span>
              ₹{cart.cartTotle && cart.cartTotle.totleDiscountedPrice}
            </span>
          </p>
          <p>
            <del>₹40</del>
            <span>₹0</span>
          </p>
        </div>
      </div>
      <div className="totalPrice">
        <div className="subTotalBox">
          <div>
            <p>Tax</p>
            <p>Total Amount</p>
          </div>
          <div>
            <p>
              <span>₹{cart.cartTotle && cart.cartTotle.tax}</span>
            </p>
            <p>
              <b>₹{cart.cartTotle && cart.cartTotle.totalPrice}</b>
            </p>
          </div>
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
        <p>
          You will save ₹
          {(cart.cartTotle && cart.cartTotle.totleOriginalPrice) -
            (cart.cartTotle &&
              cart.cartTotle.totleDiscountedPrice)}{" "}
          on this order
        </p>
      </div>
    </div>
  </div>
  )
}

export default CartTotleWidget