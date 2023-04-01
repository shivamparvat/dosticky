import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AddNewDiscount } from "../../../../redux/actions/discount";

function AddDiscount() {
  const dispatch = useDispatch();
  const [discount, setDiscount] = useState(10);
  const [quantity, setQuantity] = useState(1);
  function onSubmitHeadler(e) {
    e.preventDefault();
    dispatch(AddNewDiscount({ quantity, discount }));
  }
  return (
    <div>
      <form action="" onSubmit={onSubmitHeadler} method="post">
        <div className="inputCantainer">
          <label htmlFor="discount">discount</label>
          <input
            type="number"
            placeholder="discount"
            required
            className="discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            autoComplete="discount"
          />
          <div className="msg">
            <p></p>
          </div>
        </div>
        <div className="inputCantainer">
          <label htmlFor="quantity">quantity</label>
          <input
            type="number"
            placeholder="quantity"
            required
            className="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            autoComplete="quantity"
          />
          <div className="msg">
            <p></p>
          </div>
        </div>
        <div className="inputCantainer">
          <label htmlFor="quantity">quantity</label>
          <input
            type="date"
            placeholder="quantity"
            required
            className="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            autoComplete="quantity"
          />
          <div className="msg">
            <p></p>
          </div>
        </div>

        <div className="newButton">
          <input type="submit" value="Add" />
        </div>
      </form>
    </div>
  );
}

export default AddDiscount;
