import "./newProduct.css";
import { MultiSelect } from "react-multi-select-component";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategoryAll } from "../../../../redux/actions/category";
import { getAllDiscount } from "../../../../redux/actions/discount";
import { AddProductCategory } from "../../../../redux/actions/product";
import axios from "axios";

const NewProduct = () => {
  const [category, setCategory] = useState([]);
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [discountprice, setDiscountprice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [customizable, setCustomizable] = useState(false);
  const [skuIsUnique, setSkuIsUnique] = useState(false);
  // const [msg, setMsg] = useState("");

  const dispatch = useDispatch();
  const categoryData = useSelector((state) => state.category.category);
  const { loading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(CategoryAll());
    dispatch(getAllDiscount());
  }, [dispatch]);

  const options = [];

  categoryData &&
    categoryData.data.map((item) => {
      options.push({ label: item.category, value: item.category });
      return;
    });
  function onsubmitHeadler(e) {
    e.preventDefault();
    if (!skuIsUnique) return;
    const categoryarray = category.map((item) => item.value);
    const tagarray = tags.map((item) => item.value);

    const data = new FormData();
    data.append("title", title);
    data.append("SKU", sku);
    data.append("price", price);
    data.append("discountprice", discountprice);
    data.append("quantity", quantity);
    data.append("files[]", images);
    data.append("description", description);
    data.append("category[]", categoryarray);
    data.append("customizable", customizable);
    data.append("tags[]", tagarray);
    dispatch(AddProductCategory(data));
  }
  // if (loading) {
  //   setCategory([]);
  //   setTags([]);
  //   setTitle("");
  //   setSku("");
  //   setPrice("");
  //   setDiscountprice("");
  //   setQuantity(1);
  //   setImages([]);
  //   setDescription("");
  //   setCustomizable(false);
  // }

  function skuheadler(e) {
    setSku(e.target.value);
    const skuValue = e.target.value;
    if (skuValue.trim().length >= 1) {
      setTimeout(async () => {
        const { data } = await axios.post(
          `/product/chack?SKU=${skuValue}`,
          {},
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        setSkuIsUnique(data.unique);
      }, 500);
    }
  }

  return (
    <div className="newPostmainCantainer">
      <p>new Product</p>
      {console.log(loading)}
      {loading ? (
        "loading....."
      ) : (
        <form action="" onSubmit={onsubmitHeadler} method="post">
          <div>
            <div className="titleCantainer">
              <label htmlFor="title">title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="title"
                className="title"
                autoComplete="title"
              />
              <div className="msg">
                <p></p>
              </div>
            </div>
            <div className="sku price">
              <div className="priceCantainer">
                <label htmlFor="price">price</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  placeholder="price"
                  className="price"
                  autoComplete="price"
                />
                <div className="msg"></div>
              </div>
              <div className="priceCantainer">
                <label htmlFor="discountPrice">discount Price</label>
                <input
                  type="text"
                  value={discountprice}
                  onChange={(e) => setDiscountprice(e.target.value)}
                  required
                  placeholder="discount price"
                  autoComplete="discountPrice"
                />
                <div className="msg">
                  <p></p>
                </div>
              </div>
            </div>
            <div className="quantity category">
              <div className="skuCantainer">
                <label htmlFor="sku">sku</label>
                <input
                  type="text"
                  value={sku}
                  onChange={skuheadler}
                  required
                  placeholder="sku"
                  className="sku"
                  autoComplete="sku"
                />
                <div className="msg">
                  {!skuIsUnique && <p>please select unique sku id</p>}
                </div>
              </div>
              <div className="quantityCantainer">
                <label htmlFor="quantity">quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                  placeholder="quantity"
                  className="quantity"
                  autoComplete="quantity"
                />
                <div className="msg">
                  <p></p>
                </div>
              </div>
            </div>

            <div className="imagesCantainer">
              <label htmlFor="images">images</label>
              <input
                type="file"
                required
                onChange={(e) => setImages(e.target.files)}
                multiple
                name="files[]"
                accept=".webp"
                placeholder="images"
                className="images"
                autoComplete="images"
              />
              <div className="msg">
                <p></p>
              </div>
            </div>

            <div className="descriptionCantainer">
              <label htmlFor="description">description</label>
              <textarea
                placeholder="description"
                className="description"
                autoComplete="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="msg">
                <p></p>
              </div>
            </div>

            <div className="customizable tags">
              <div className="customizableCantainer">
                <input
                  type="checkbox"
                  required
                  value={customizable}
                  onChange={(e) => setCustomizable(e.target.value)}
                  placeholder="customizable"
                  className="customizable"
                  autoComplete="customizable"
                />
                <label htmlFor="customizable">customizable</label>
                <div className="msg">
                  <p></p>
                </div>
              </div>

              <div className="categoryCantainer">
                <label htmlFor="category">category</label>
                <MultiSelect
                  options={options}
                  value={category}
                  onChange={setCategory}
                  labelledBy="Category"
                />
                <div className="msg">
                  <p></p>
                </div>
              </div>
              <div className="tagsCantainer">
                <label htmlFor="tags">tags</label>
                <MultiSelect
                  options={options}
                  value={tags}
                  onChange={setTags}
                  labelledBy="tags"
                />
                <div className="msg">
                  <p></p>
                </div>
              </div>
            </div>
          </div>
          <div className="newButton">
            <input type="submit" value="Add" />
          </div>
        </form>
      )}
    </div>
  );
};

export default NewProduct;
