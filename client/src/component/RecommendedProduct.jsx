import "./RecommendedProduct.css";

function RecommendedProduct({ img }) {
  return (
    <div className="RecommendedProductCantainer">
      <div>
        <div className="RecommendedProductImg">
          <img src={img} alt="" />
        </div>
        <div>
          <div>
            <p>
              <del>₹1000</del>
            </p>
            <p>₹600</p>
          </div>
          <div className="addtocard"><span>Add</span></div>
        </div>
      </div>
      <p>Cemera tripod</p>
    </div>
  );
}

export default RecommendedProduct;
