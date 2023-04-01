import { configureStore } from "@reduxjs/toolkit";
import { categoryReducer } from "./reducers/categoryReducer";
import { productReducer } from "./reducers/productReducer";
import { useReducer } from "./reducers/userReducer";
import { discountReducer } from "./reducers/discountReducer";

const store = configureStore({
  reducer: {
    user: useReducer,
    product:productReducer,
    category:categoryReducer,
    discount:discountReducer
  },
});

export default store;
