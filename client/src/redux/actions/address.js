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


export const deleteAddress = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DeleteAddressRequest" });
    const { data } = await axios.delete(
      `/address/${id}`,
      {
        headers: { "Content-Type":'application/json' },
        withCredentials: true,
      }
      );
    dispatch({ type: "DeleteAddressSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "DeleteAddressFail",
      payload: error.response.data,
    });
  }
};

export const updateAddress = (id,getdata) => async (dispatch) => {
  try {
    dispatch({ type: "UpdateAddressRequest" });
    const { data } = await axios.patch(
      `/address/${id}`,
      getdata,
      {
        headers: { "Content-Type":'application/json' },
        withCredentials: true,
      }
      );
    dispatch({ type: "UpdateAddressSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "UpdateAddressFail",
      payload: error.response.data,
    });
  }
};


export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "clearError" });
  dispatch({ type: "clearMessage" });
};