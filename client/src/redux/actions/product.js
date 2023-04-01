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

export const AddProductCategory = (data) => async (dispatch) => {
  try {
    dispatch({ type: "addProductRequest" });
    const { getdata } = await axios.post(
      `/product/new`,
      data ,
      {
        headers: { "Content-Type":'multipart/form-data' },
        withCredentials: true,
      }
    );
    dispatch({ type: "addProductSuccess", payload: getdata });
  } catch (error) {
    dispatch({
      type: "addProductFail",
      payload: error.response.data.message,
    });
  }
};