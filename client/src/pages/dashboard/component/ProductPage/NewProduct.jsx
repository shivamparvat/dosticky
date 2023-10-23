import "./newProduct.css";
import { MultiSelect } from "react-multi-select-component";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategoryAll } from "../../../../redux/actions/category";
import { getAllDiscount } from "../../../../redux/actions/discount";
import { AddProductCategory } from "../../../../redux/actions/product";
import axios from "axios";
import { throttle } from "../../../../utils/throttle";

const NewProduct = () => {
  const [category, setCategory] = useState([]);
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [sku, setSku] = useState("");

  const [variants, setVariants] = useState([
    {
      size: "",
      price: 0,
      discountprice: 0,
      quantity: 1,
    },
  ]);

  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
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

    const formData = new FormData();
    formData.append("title", title);
    formData.append("skuid", sku);
    variants.forEach((variant, index) => {
      formData.append(`variants[${index}][size]`, variant.size);
      formData.append(`variants[${index}][price]`, variant.price);
      formData.append(
        `variants[${index}][discountprice]`,
        variant.discountprice
      );
      formData.append(`variants[${index}][quantity]`, variant.quantity);
    });
    // variants.forEach((variant) => formData.append("variants", variant));
    Object.values(images).forEach((image) => formData.append("files", image));
    formData.append("description", description);
    formData.append("customizable", customizable);
    category.forEach((item) => formData.append("category", item.value));
    tags.forEach((item) => formData.append("tags", item.value));
    dispatch(AddProductCategory(formData));
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
    throttle(async function SkuChecker() {
      const { data } = await axios.post(
        `/product/chack?sku=${e.target.value}`,
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setSkuIsUnique(data.unique);
    }, 300)();
  }

  return (
    <div className="newPostmainCantainer">
      <p>new Product</p>
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
              <div className="customizableCantainer">
                <input
                  type="checkbox"
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
            <input
              type="button"
              onClick={() =>
                setVariants((pre) => {
                  const variant = [...pre];
                  variant.push({
                    size: "",
                    price: "",
                    discountprice: "",
                    quantity: 1,
                  });
                  return variant;
                })
              }
              className="Add Variants"
              value="Add Variants"
            />
          </div>
          {variants.map((data, index) => {
            return (
              <div className="variants">
                <div className="sku price">
                  <div className="priceCantainer">
                    <label htmlFor="price">price</label>
                    <input
                      type="number"
                      value={data.price}
                      onChange={(e) =>
                        setVariants((pre) => {
                          const variant = [...pre];
                          variant[index].price = e.target.value;
                          return variant;
                        })
                      }
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
                      type="number"
                      value={data.discountprice}
                      onChange={(e) =>
                        setVariants((pre) => {
                          const variant = [...pre];
                          variant[index].discountprice = e.target.value;
                          return variant;
                        })
                      }
                      required
                      placeholder="discount price"
                      autoComplete="discountPrice"
                    />
                    <div className="msg">
                      <p></p>
                    </div>
                  </div>
                </div>
                <div className="sku price size quantity">
                  <div className="quantityCantainer">
                    <label htmlFor="quantity">quantity</label>
                    <input
                      type="number"
                      value={data.quantity}
                      onChange={(e) =>
                        setVariants((pre) => {
                          const variant = [...pre];
                          variant[index].quantity = e.target.value;
                          return variant;
                        })
                      }
                      required
                      placeholder="quantity"
                      className="quantity"
                      autoComplete="quantity"
                    />
                    <div className="msg">
                      <p></p>
                    </div>
                  </div>
                  <div className="quantityCantainer">
                    <label htmlFor="quantity">Size</label>
                    <input
                      type="text"
                      value={data.size}
                      onChange={(e) =>
                        setVariants((pre) => {
                          const variant = [...pre];
                          variant[index].size = e.target.value;
                          return variant;
                        })
                      }
                      required
                      placeholder="Size"
                      className="Size"
                      autoComplete="Size"
                    />
                    <div className="msg">
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="newButton">
            <input type="submit" value="Add" />
          </div>
        </form>
      )}
    </div>
  );
};

export default NewProduct;
