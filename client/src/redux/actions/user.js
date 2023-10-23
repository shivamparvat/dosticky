import axios from "axios";

export const singup = (dataItem) => async (dispatch) => {
  try {
    dispatch({ type: "singupUserRequest" });
    const { data } = await axios.post("/user/new", dataItem, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    dispatch({ type: "singupUserSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "singupUserFail",
      payload: "error.response.data.message",
    });
  }
};

export const login = (getdata) => async (dispatch) => {
  console.log("rgkjfd");
  try {
    dispatch({ type: "loginRequest" });
    const { data } = await axios.post("/user/login", getdata, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      withCredentials: true,
    });
    dispatch({ type: "loginSuccess", payload: { data: "df" } });
  } catch (error) {
    dispatch({ type: "loginFail", payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });
    const { data } = await axios.get("/user/", { withCredentials: true });
    dispatch({ type: "loginSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loginFail", payload: error.response.data.message });
  }
};

export const logOut = () => async (dispatch) => {
  try {
    dispatch({ type: "logoutRequest" });
    const { data } = await axios.get("/user/logout", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    dispatch({ type: "logoutSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "logoutFail", payload: error.response.data.message });
  }
};

export const VarifyEmailAddress = (token) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });
    const { data } = await axios.get(`/user/verifyemail/${token}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    dispatch({ type: "loginSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loginFail", payload: error.response.data.message});
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "clearError" });
  dispatch({ type: "clearMessage" });
};
