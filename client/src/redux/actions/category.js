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
export const AddCategory = (data) => async (dispatch) => {
  try {
    
    dispatch({ type: "AddcategoryRequest" });
    
    const { getdata } = await axios.post(
      `/category/new`,
      data ,
      {
        headers: { "Content-Type":'multipart/form-data' },
        withCredentials: true,
      }
    );
    dispatch({ type: "AddcategorySuccess", payload: getdata });
  } catch (error) {
    dispatch({
      type: "AddcategoryFail",
      payload: error.response.data.message,
    });
  }
};
