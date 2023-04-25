import axios from "axios";

export const CategoryAll = () => async (dispatch) => {
  try {
    dispatch({ type: "categoryRequest" });
    const { data } = await axios.get(`/category/`);
    dispatch({ type: "categorySuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "categoryFail",
      payload: error.response.data.message,
    });
  }
};
export const AddCategory = (getdata) => async (dispatch) => {
  try {
    
    dispatch({ type: "AddcategoryRequest" });
    
    const { data } = await axios.post(
      `/category/new`,
      getdata,
      {
        headers: { "Content-Type":'multipart/form-data' },
        withCredentials: true,
      }
    );
    dispatch({ type: "AddcategorySuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "AddcategoryFail",
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "clearError" });
  dispatch({ type: "clearMessage" });
};