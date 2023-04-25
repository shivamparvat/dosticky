import axios from "axios";

export const getOneOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getOneOrderRequest" });
    
    const { data } = await axios.get(
      `/order/${id}`,
      {
        headers: { "Content-Type":'application/json' },
        withCredentials: true,
      }
      );
    dispatch({ type: "getOneOrderSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getOneOrderFail",
      payload: error.response.data,
    });
  }
};
export const GetOrder = () => async (dispatch) => {
  try {
    dispatch({ type: "getOrderRequest" });
    
    const { data } = await axios.get(
      `/order/user`,
      {
        headers: { "Content-Type":'application/json' },
        withCredentials: true,
      }
      );
    dispatch({ type: "getOrderSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getOrderFail",
      payload: error.response.data,
    });
  }
};
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "clearError" });
  dispatch({ type: "clearMessage" });
};