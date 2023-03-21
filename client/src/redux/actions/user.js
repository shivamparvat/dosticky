import axios from "axios";

export const singup = (dataItem) => async (dispatch) => {
  try {
    dispatch({ type: "singupUserRequest" });
    const { data } = await axios.post(
      "/user/new",
      { ...dataItem },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    console.log(data);
    dispatch({ type: "singupUserSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "singupUserFail",
      payload: error.response.data.message,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });
    const { data } = await axios.post(
      "/user/login",
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    console.log(data);
    dispatch({ type: "loginSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loginFail", payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });
    const { data } = await axios.get("/", { withCredentials: true });
    console.log(data);
    dispatch({ type: "loginSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loginFail", payload: error.response.data.message });
  }
};
