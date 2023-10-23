import "./ProductPage.css";
import { GrEdit } from "react-icons/gr";
import {
  AiOutlineEyeInvisible,
  AiOutlineEye,
} from "react-icons/ai";

import MultipleImage from "../../../utils/MultipleImage";
import { useState } from "react";
import NewProduct from "./ProductPage/NewProduct";
import ToolebarNew from "./utiles/ToolberNew";

function Product({ product }) {
  const [pre, setPre] = useState(false);
  return (
    <div className={pre ? "pre" : ""}>
      <div key={product._id} className="productCardcontainer">
        <div className="card">
          <div className="productImagecontainer">
            <MultipleImage images={product.images} />
          </div>
          <div className="productNmae">
            <span>{product.title}</span>
          </div>
          <div className="priceCardContainer">
            <span>price ₹39</span>
            <br />
            <span className="delPrice">
              <del>₹{product.price}</del>
            </span>
            <span className="decount"> 10% Off</span>
          </div>
          <div className="tooles">
            <input type="checkbox" name="" id="" />
            <div className="Option">
              <div className="editIcon">
                <GrEdit />
              </div>
              <div>
                {pre ? (
                  <AiOutlineEye onClick={() => setPre(pre ? false : true)} />
                ) : (
                  <AiOutlineEyeInvisible
                    onClick={() => setPre(pre ? false : true)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



const productDitail = {
  _id: "shkgfjhfdkgjhfdkj",
  images: {},
  price: "35",
  title: "jdgh dfhgk",
};

function ProductPage() {
  const [newProduct, setNewProduct] = useState(false);
  return (
    <div className="ProductPage">
      <div className="toolbarContainer">
        <ToolebarNew setNewProduct={setNewProduct} newProduct={newProduct} />
      </div>
      {/* <NewProduct /> */}
      {newProduct && <NewProduct setNewProduct={setNewProduct}/>}
      <div className="productslist">
        <p>products</p>
        <Product product={productDitail} />
      </div>
    </div>
  );
}

export default ProductPage;
