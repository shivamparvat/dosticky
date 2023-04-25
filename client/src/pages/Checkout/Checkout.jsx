import React, { useEffect, useState } from "react";
import "./Checkout.css";
import NewAddress from "./component/NewAddress";
import AddressCard from "./component/AddressCard";
import { AiOutlinePlus } from "react-icons/ai";
import CartTotalWidget from "../../component/CartTotalWidget";
import { useDispatch, useSelector } from "react-redux";
import { Getcart } from "../../redux/actions/cart";
import { AddNewAddress, GetAllAddress } from "../../redux/actions/address";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const address = useSelector((state) => state.address);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  const [newaddress, setNewaddress] = useState(false);
  const [slectedAddress, setSlectedAddress] = useState("");
  const TotalPrice = cart.cart && cart.cartTotal;

  useEffect(() => {
    dispatch(Getcart());
    dispatch(GetAllAddress());
  }, [dispatch]);

  // callback funcations
  async function continueButton() {
    if (!slectedAddress) return window.alert("please select address");

    const razScript = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!razScript) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      const { data } = await axios.post(
        "/payment/new",
        { price: TotalPrice.totalPrice },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const options = {
        key: "rzp_test_itU6wf7HaNZU1p",
        currency: "INR",
        amount: TotalPrice.totalPrice,
        name: "Do sticky",
        description: "find finest stickers",
        image: "../../assets/newLogo2.png",
        order_id: data.id,
        handler: async function ({
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        }) {
          const verifyData = await axios.post(
            "/payment/verification",
            {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
              slectedAddress,
              totalPrice: TotalPrice.totalPrice,
              paymentId: data.paymentId,
              tax:TotalPrice?.tax,
              price:TotalPrice.TotalDiscountedPrice
            },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );
          if (verifyData.data.success) {
            navigate("/paymentsuccess", {
              state: { order: verifyData.data?.order },
            });
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.number,
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
      razorpay.on("payment.failed", function (response) {
        alert(response.error.description);
      });
    } catch (e) {
      return window.alert(e.message);
    }
  }

  function submitAddress(data) {
    dispatch(AddNewAddress(data));
    setNewaddress(false);
  }

  return (
    <>
      {cart.error === true ? (
        <>{cart.message}</>
      ) : (
        <div className="cartconteiner cheackout">
          <div className="title">
            <div>
              <h2>
                cart item{" "}
                <span className="primary-color">
                  {cart.cart?.totalItem}
                </span>
              </h2>
              <h2 className="totalPrice">
                total{" "}
                <span className="primary-color">
                  ₹{cart.cartTotal?.totalPrice}
                </span>
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
                          <NewAddress
                            submitAddress={submitAddress}
                            ButtonText="Save and Deliver Here"
                          />
                          <p
                            className="AddAddressButton"
                            onClick={() => setNewaddress(false)}
                          >
                            cancel
                          </p>
                        </>
                      ) : (
                        <>
                          <p
                            className="AddAddressButton"
                            onClick={() =>
                              newaddress
                                ? setNewaddress(false)
                                : setNewaddress(true)
                            }
                          >
                            <AiOutlinePlus className="AddIcone" />
                            Add New address
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  {address.loading === true ? (
                    <>loading....</>
                  ) : (
                    <AddressCard
                      address={address}
                      slectedAddress={slectedAddress}
                      setSlectedAddress={setSlectedAddress}
                    />
                  )}
                </div>
              </div>
            </div>
            <CartTotalWidget
              continueButton={continueButton}
              cart={cart}
              ButtonText="Payment"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Checkout;
