import React from "react";
import Carousel from "./component/Carousel"
import CategotyCard from "./component/CategotyCard"
import Product from "../../component/Product/Product"
import Titel from "./component/Titel"
import "./index.css";



function Home() {
  return (
    <div className="home">
      <Carousel/>
      <CategotyCard/>
      <Titel title="Random Sticker"/>
      <div className="productGrid">
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      </div>
      <Titel title="marvel"/>
      <div className="productGrid">
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      </div>
      <Titel title="text"/>
      <div className="productGrid">
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      </div>
      <Titel title="Dc sticker"/>
      <div className="productGrid">
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      </div>
    </div>
  );
}

export default Home;
