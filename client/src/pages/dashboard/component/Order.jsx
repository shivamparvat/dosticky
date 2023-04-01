import React, { useState } from "react";
import "./order.css";
import ToolberNew from "./utiles/ToolberNew";
import Pagination from "../../../component/Pagination";

function Order() {
  const [newOrder, setNewOrder] = useState(false);
  return (
    <div className="OrderCantainer">
      <ToolberNew setNewProduct={setNewOrder} newProduct={newOrder} />
      <div className="ordersListCantainer">
        <p>orders</p>
        <div className="ordersCards">
          <div className="orderimage">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgqERYAMj5t6KvfBI3iy2zpV5mG128cgZIJTk_y7_P&s"
              alt=""
            />
          </div>
          <div className="orderdetails">
            <p>cemera</p>
            <p><span>SKU</span> 1234 </p>
            <p><span> quantity</span> 2</p>
            <p>orders date <span>31-03-2023</span></p>
          </div>
          <div className="Orderstatuscantainer">
            <div className="orderstatus">
                <label htmlFor="orderstatus">status</label>
                <select name="orderstatus" id="orderstatus">
                    <option value="order place">order place</option>
                </select>
            </div>
          </div>
        </div>
        <Pagination />
      </div>
    </div>
  );
}

export default Order;
