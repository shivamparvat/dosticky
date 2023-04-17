import React, { useEffect, useState } from "react";
import { TbDiscount } from "react-icons/tb";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Checkout.css";
import NewAddress from "./component/NewAddress";
import AddressCard from "./component/AddressCard";
import { AiOutlinePlus } from "react-icons/ai";
import CartTotleWidget from "../../component/CartTotleWidget";
import { useDispatch, useSelector } from "react-redux";
import { Getcart, getTotleCartPrice } from "../../redux/actions/cart";

function Checkout() {
  const dispatch = useDispatch();

  const [newaddress, setNewaddress] = useState(false)
  useEffect(() => {
    dispatch(Getcart());
    dispatch(getTotleCartPrice());
  }, [dispatch]);


  const cart = useSelector((state) => state.cart);

  return (
    <div className="cartconteiner cheackout">
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
        <div>
          <div className="addreses">
            <div className="oldAddress">
              <div>
                <div className="headding">
                  <h2>Delivery Address</h2>
                  {newaddress ? (
                   <>
                    <NewAddress newaddress={setNewaddress}/>
                    <p className="AddAddressButton" onClick={()=>newaddress?setNewaddress(false):setNewaddress(true)}>
                        cancel
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="AddAddressButton" onClick={()=>newaddress?setNewaddress(false):setNewaddress(true)}>
                        <AiOutlinePlus className="AddIcone" />
                        Add New address
                      </p>
                    </>
                  )}
                </div>
              </div>
              <AddressCard />
            </div>
          </div>
        </div>
        <CartTotleWidget cart={cart}/>
      </div>
    </div>
  );
}

export default Checkout;
