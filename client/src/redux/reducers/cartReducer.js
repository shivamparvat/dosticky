import { createReducer } from "@reduxjs/toolkit";

export const cartReducer = createReducer(
  {},
  {
    addToCartRequest: (state) => {
      state.loading = true;
    },
    addToCartSuccess: (state, action) => {
      state.loading = false;
      state.cart = action.payload.data;
      state.message = action.payload.message;
    },
    addToCartFail: (state, action) => {
      state.loading = false;
      state.cart = action.payload;
      state.error = action.payload.success;
    },



    getCartRequest: (state) => {
      state.loading = true;
    },
    getCartSuccess: (state, action) => {
      state.loading = false;
      state.cart = action.payload.data;
      state.message = action.payload.message;
    },
    getCartFail: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.error = action.payload.success;
    },

    removeCartRequest: (state) => {
      state.loading = true;
    },
    removeCartSuccess: (state, action) => {
      state.loading = false;
      state.cart = action.payload.data;
      state.message = action.payload.message;
    },
    removeCartFail: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.error = action.payload.success;
    },
    
    CartTotleRequest: (state) => {
      state.loading = true;
    },
    CartTotleSuccess: (state, action) => {
      state.loading = false;
      state.cartTotle = action.payload.data;
      state.message = action.payload.message;
    },
    CartTotleFail: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.error = action.payload.success;
    },


    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  }
);
