import axios from "axios";

export const AllProductCategory = (category) => async (dispatch) => {
  try {
    dispatch({ type: "categoryAllProductsRequest" });
    const  {data}  = await axios.get(
      `/product/category?category=${category}`
    );
    dispatch({ type: "categoryAllProductsSuccess", payload: {[category]:data} });
  } catch (error) {
    dispatch({
      type: "categoryAllProductsFail",
      payload: error.response.data.message,
    });
  }
};

export const AddProductCategory = (getdata) => async (dispatch) => {
  try {
    dispatch({ type: "addProductRequest" });
    const { data } = await axios.post(
      `/product/new`,
      getdata ,
      {
        headers: { "Content-Type":'multipart/form-data' },
        withCredentials: true,
      }
    );
    dispatch({ type: "addProductSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "addProductFail",
      payload: error.response.data.message,
    });
  }
};