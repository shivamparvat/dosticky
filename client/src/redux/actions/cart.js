import axios from "axios";

export const AddTocart = (getdata) => async (dispatch) => {
  try {
    dispatch({ type: "addToCartRequest" });
    
    
    const { data } = await axios.post(
      `/cart/new`,
      getdata ,
      {
        headers: { "Content-Type":'application/json' },
        withCredentials: true,
      }
      );
    dispatch({ type: "addToCartSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "addToCartFail",
      payload: error.response.data,
    });
  }
};


export const Getcart = () => async (dispatch) => {
  try {
    dispatch({ type: "getCartRequest" });
    
    const cart = await axios.get(
      `/cart/`,
      {
        headers: { "Content-Type":'application/json' },
        withCredentials: true,
      }
      );
    dispatch({ type: "getCartSuccess", payload: cart.data });
  } catch (error) {
    dispatch({
      type: "getCartFail",
      payload: error.response.data,
    });
  }
};

export const RemoveToCart = (id) => async (dispatch) => {
  try {
    dispatch({ type: "removeCartRequest" });
    
    const cart = await axios.delete(
      `/cart/${id}`,
      {
        headers: { "Content-Type":'application/json' },
        withCredentials: true,
      }
      );
    dispatch({ type: "removeCartSuccess", payload: cart.data });
  } catch (error) {
    dispatch({
      type: "removeCartFail",
      payload: error.response.data,
    });
  }
};

export const UpdateCart = (getdata) => async (dispatch) => {
  try {
    dispatch({ type: "UpdateCartRequest" });
    
    const cart = await axios.patch(
      `/cart/`,
      getdata,
      {
        headers: { "Content-Type":'application/json' },
        withCredentials: true,
      }
      );
    dispatch({ type: "UpdateCartSuccess", payload: cart.data });
  } catch (error) {
    dispatch({
      type: "UpdateCartFail",
      payload: error.response.data,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "clearError" });
  dispatch({ type: "clearMessage" });
};