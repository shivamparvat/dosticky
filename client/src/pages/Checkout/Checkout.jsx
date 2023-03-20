import React, { useState } from "react";
import { TbDiscount } from "react-icons/tb";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Checkout.css";
import NewAddress from "./component/NewAddress";
import AddressCard from "./component/AddressCard";
import { AiOutlinePlus } from "react-icons/ai";

function Checkout() {
  const [newaddress, setNewaddress] = useState(false)
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (false) {
  //     navigate("/login");
  //   }
  // }, []);

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
                    <NewAddress />
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
                save ₹100 with
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
                  Payment
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

export default Checkout;
