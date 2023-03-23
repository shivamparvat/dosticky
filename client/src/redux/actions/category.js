import axios from "axios";

export const CategoryAll = () => async (dispatch) => {
  try {
    dispatch({ type: "categoryRequest" });
    const  {data}  = await axios.get(
      `/category/`
    );
    dispatch({ type: "categorySuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "categoryFail",
      payload: error.response.data.message,
    });
  }
};