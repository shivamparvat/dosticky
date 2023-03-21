import axios from "axios";

export const AllProductCategory = (category) => async (dispatch) => {
  try {
    dispatch({ type: "categoryAllProductsRequest" });
    const { data } = await axios.get(
      `/api/product/?category="${category}"`
    );
    dispatch({ type: "categoryAllProductsSuccess", payload: {[category]:data} });
    console.log({payload: {[category]:data}});
  } catch (error) {
    dispatch({
      type: "categoryAllProductsFail",
      payload: error.response.data.message,
    });
  }
};