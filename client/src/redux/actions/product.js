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