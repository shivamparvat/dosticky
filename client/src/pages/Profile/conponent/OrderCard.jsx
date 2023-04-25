import React, { useEffect } from "react";
import "./OrderCard.css";
import { useDispatch, useSelector } from "react-redux";
import { GetOrder } from "../../../redux/actions/order";
import { GrEdit } from "react-icons/gr";

function OrderCard() {
  const dispatch = useDispatch();
  const { loading, orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(GetOrder());
  }, [dispatch]);

  return loading ? (
    <>loading ...</>
  ) : (
    orders?.map((item) => {
      return item?.items?.map((product) => {
        const variant = product?.product?.variants?.filter(
          (size) => size.size === product.size
        );
        return (
          <div className="OrderCardMainCantainer">
            <div className="OrderCardCantainer">
              <div className="productImage">
                <img src={product?.product?.images[0]?.image_url} alt="" />
              </div>
              <div className="detailsCantainer">
                <div className="titleCantainer">
                  <p>{product?.product?.title}</p>
                  <p>
                    {product.size} Inch ({variant[0].discretion})
                  </p>
                  <p>{product.quantity}x</p>
                </div>
                <div className="price"><h2>₹{variant[0].discountprice}</h2></div>
                <div className="status">
                  <p>
                    <b>status</b> {item?.status}
                  </p>
                  <p>
                    {item?.status === "Delivered" ? (
                      <span>
                        <div className="StatusIndicater"></div> Delivered on{" "}
                        {item?.deliveredAt}
                      </span>
                    ) : (
                      ""
                    )}
                  </p>
                  <p>
                    <b>order id</b> {item?.orderId}
                  </p>
                  <p>
                    <b>order date</b> {item?.createdAt}
                  </p>
                </div>
              </div>
            </div>
            <div className="addressCencelorder">
              <div className="orderCartaddress">
                <address>
                  <p>
                    <p>
                      {item?.address?.name}
                      <b> {item?.address?.number}</b>
                    </p>
                    {item?.address?.street}
                    <b> {item?.address?.city} </b>
                    <b>
                      {item?.address?.state} ({item?.address?.zip})
                    </b>
                    <GrEdit  size={16} className="editOrderAddress"/>
                  </p>
                </address>
              </div>
              <div className="cencelOrder">
                {item?.status === "Confirmed" && (
                  <div className="button">order cencel</div>
                )}
              </div>
            </div>
          </div>
        );
      });
    })
  );
}

export default OrderCard;
