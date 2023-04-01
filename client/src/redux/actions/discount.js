import axios from "axios";

export const AddNewDiscount = (discount) => async (dispatch) => {
  console.log(discount);
  try {
    dispatch({ type: "newDiscountRequest" });
    const { data } = await axios.post("/discount/new", discount, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    console.log(data);
    dispatch({ type: "newDiscountSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "newDiscountFail",
      payload: error.response.data.message,
    });
  }
};

export const getAllDiscount = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllDiscountRequest" });
    const { data } = await axios.get("/discount/", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    dispatch({ type: "getAllDiscountSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getAllDiscountFail",
      payload: error.response.data.message,
    });
  }
};
