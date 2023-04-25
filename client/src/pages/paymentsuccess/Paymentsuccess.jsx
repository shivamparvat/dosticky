import React, { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdDone } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getOneOrder } from "../../redux/actions/order";
import logo from "../../assets/newLogo.png";
import "./Paymentsuccess.css";

function Paymentsuccess() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const order_id = location.state?.order;
  const order = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOneOrder(order_id));
  }, [dispatch]);

  useEffect(() => {
    if(!order_id){
      navigate("/");
    }
  }, [order_id]);

  function PrintFunc() {
    window.print();
  }
  let quantity = 0;
  let TotalPrice = 0;
  return (
    <>
      <div className="orderConformPage">
        <div className="orderConformConatiner">
          <div className="headerPage">
            <div className="doneIcone">
              <MdDone size={30} />
            </div>
            <div className="conformText">
              <p>Order confirmed</p>
            </div>
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            <p className="orderId"> Order Id:- {order?.oneOrder?.orderId}</p>
            <hr />
            <div className="addressContainer">
              <div className="shpping">
                <p>Shipping Address</p>
                <div>
                  <p>
                    <div className="fulladdress">
                      {order?.oneOrder?.address?.street}{" "}
                      <span className="pincode">
                        {order?.oneOrder?.address?.zip}
                      </span>
                    </div>
                    <div className="fulladdress">
                      {order?.oneOrder?.address?.landmark}
                      {"  "}
                      <b>
                        {order?.oneOrder?.address?.city}{" "}
                        {order?.oneOrder?.address?.state}
                      </b>{" "}
                    </div>
                    <div>
                      <span className="addressName">
                        {order?.oneOrder?.address?.name}
                      </span>
                    </div>
                  </p>
                </div>
              </div>
              <div className="billing">
                <p>Billing Address</p>
                <div>
                  <p>
                    <div className="fulladdress">
                      {order?.oneOrder?.address?.street}{" "}
                      <span className="pincode">
                        {order?.oneOrder?.address?.zip}
                      </span>
                    </div>
                    <div className="fulladdress">
                      {order?.oneOrder?.address?.landmark}
                      {"  "}
                      <b>
                        {order?.oneOrder?.address?.city}{" "}
                        {order?.oneOrder?.address?.state}
                      </b>{" "}
                    </div>
                    <div>
                      <span className="addressName">
                        {order?.oneOrder?.address?.name}
                      </span>
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="billingpage">
            <div class="container">
              <table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>IGST</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order?.oneOrder?.items.map((item, index) => {
                    let price = 0;
                    quantity += item?.quantity;
                    item?.product?.variants?.map((variant) => {
                      if (variant.size === item.size) {
                        return (price = variant.discountprice * item?.quantity);
                      }
                    });
                    TotalPrice += price;
                    return (
                      <tr>
                        <td>{(index += 1)}</td>
                        <td>{item?.product?.title}</td>
                        <td>{item?.quantity}</td>
                        {item?.variants?.map((variant) => (
                          <td>
                            {variant.size === item.size ? variant.price : ""}
                          </td>
                        ))}
                        <td>₹{price}</td>
                        <td>₹{Math.ceil(price * 0.18)}</td>
                        <td>₹{Math.ceil(price * 0.18) + price}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="2">Total</td>
                    <td>{quantity}</td>
                    <td>₹{TotalPrice}</td>
                    <td>₹{order?.oneOrder?.tax}</td>
                    <td>₹{order?.oneOrder?.totalPrice}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div className="details">
            <div>
              <p>GSTIN 23AA1CB5509J1Z0</p>
              <p>Date {order?.oneOrder?.createdAt}</p>
              <p>contact 6261282518</p>
              <p>Email support@dosticky.com</p>
            </div>
          </div>
        </div>
        <div className="button print" onClick={PrintFunc}>
          Print
        </div>
        <div className="backtoHome">
          <Link to="/">back to Home</Link>
        </div>
      </div>
    </>
  );
}

export default Paymentsuccess;
