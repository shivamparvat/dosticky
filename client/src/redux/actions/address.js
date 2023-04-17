import axios from "axios";

export const AddNewAddress = (getdata) => async (dispatch) => {
  try {
    dispatch({ type: "AddAddressRequest" });
    
    const { data } = await axios.post(
      `/address/new`,
      getdata ,
      {
        headers: { "Content-Type":'application/json' },
        withCredentials: true,
      }
      );
    dispatch({ type: "AddAddressSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "AddAddressFail",
      payload: error.response.data,
    });
  }
};

export const GetAllAddress = () => async (dispatch) => {
  try {
    dispatch({ type: "GetAddressRequest" });
    
    const { data } = await axios.get(
      `/address/`,
      {
        headers: { "Content-Type":'application/json' },
        withCredentials: true,
      }
      );
    dispatch({ type: "GetAddressSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "GetAddressFail",
      payload: error.response.data,
    });
  }
};
