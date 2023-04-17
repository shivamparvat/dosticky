import React, { useEffect } from "react";
import Carousel from "./component/Carousel";
import CategotyCard from "./component/CategotyCard";
import Product from "../../component/Product/Product";
import Titel from "./component/Titel";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { AllProductCategory } from "../../redux/actions/product";
import {CategoryAll } from "../../redux/actions/category";
import { Getcart } from "../../redux/actions/cart";


function Home() {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product.category);
  const cart = useSelector((state) => state.cart);
  const categoryList = ["rendom", "marvel", "anime", "love birds"];
  useEffect(() => {
    dispatch(CategoryAll())
    dispatch(Getcart());
    categoryList.map((category) => dispatch(AllProductCategory(category)));
  }, [dispatch]);

  return (
    <div className="home">
      <Carousel />
      
      <CategotyCard category={category && category.category}/>
      {product &&
        Object.keys(product).map((item, index) => (
          <div key={index}>
            <Titel title={item} />
            <div className="productGrid">
              {product[item].data.map((item) => (
                <Product key={item._id} product={item} cart={cart.cart} loading={cart.loading} />
                ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default Home;
