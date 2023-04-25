import axios from "axios";

export const AllProductCategory = (category) => async (dispatch) => {
  try {
    dispatch({ type: "categoryAllProductsRequest" });
    const { data } = await axios.get(`/product/category?category=${category}`);
    dispatch({
      type: "categoryAllProductsSuccess",
      payload: { [category]: data },
    });
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
    const { data } = await axios.post(`/product/new`, getdata, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    dispatch({ type: "addProductSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "addProductFail",
      payload: error.response.data.message,
    });
  }
};

export const GetOneProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "GetOneProductRequest" });
    const { data } = await axios.get(`/product/${id}`);
    dispatch({ type: "GetOneProductSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "GetOneProductFail",
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "clearError" });
  dispatch({ type: "clearMessage" });
};