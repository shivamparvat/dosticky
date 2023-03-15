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
      <Titel titel="Random Sticker"/>
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
      <Titel titel="marvel"/>
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
      <Titel titel="text"/>
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
      <Titel titel="Dc sticker"/>
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
