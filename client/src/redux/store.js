import { configureStore } from "@reduxjs/toolkit";
import { categoryReducer } from "./reducers/categoryReducer";
import { productReducer } from "./reducers/productReducer";
import { useReducer } from "./reducers/userReducer";
import { discountReducer } from "./reducers/discountReducer";
import { cartReducer } from "./reducers/cartReducer";
import { addressReducer } from "./reducers/addressReducer";
import { orderReducer } from "./reducers/orderReducer";

const store = configureStore({
  reducer: {
    user: useReducer,
    product:productReducer,
    category:categoryReducer,
    discount:discountReducer,
    cart:cartReducer,
    address:addressReducer,
    order:orderReducer
  },
});

export default store;
