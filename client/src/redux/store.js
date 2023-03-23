import { configureStore } from "@reduxjs/toolkit";
import { categoryReducer } from "./reducers/categoryReducer";
import { productReducer } from "./reducers/productReducer";
import { useReducer } from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    user: useReducer,
    product:productReducer,
    category:categoryReducer
  },
});

export default store;
