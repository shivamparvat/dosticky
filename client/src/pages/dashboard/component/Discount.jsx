import ToolberNew from "./utiles/ToolberNew";
import AddDiscount from "./Discount/AddDiscount";
import "./Discount.css";
import { useState } from "react";

function Discount() {
  const [newDiscount, setNewDiscount] = useState(false);
  return (
    <div className="DiscountMainCantiner">
      <ToolberNew setNewProduct={setNewDiscount} newProduct={newDiscount} />

      <div className="newDiscount">
        <p>new discount</p>{newDiscount && <AddDiscount />}</div>
    </div>
  );
}

export default Discount;
