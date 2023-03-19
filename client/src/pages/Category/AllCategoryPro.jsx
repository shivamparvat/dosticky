import React from 'react'
import "./AllCategoryPro.css"
import Title from "../Home/component/Titel";
import Product from "../../component/Product/Product";

function AllCategoryPro() {
  return (
    <div className='AllCategoryProCaontainer'>
         <Title title="category" />
         <div className="allProductCaintainer">
            <Product/>
            <Product/>
            <Product/>
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
  )
}

export default AllCategoryPro