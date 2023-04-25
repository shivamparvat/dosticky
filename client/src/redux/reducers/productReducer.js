import { createReducer } from "@reduxjs/toolkit";

export const productReducer = createReducer(
  {},
  {
    categoryAllProductsRequest: (state) => {
      state.loading = true;
    },
    categoryAllProductsSuccess: (state, action) => {
      state.loading = false;
      state.category = {...state.category,...action.payload};
      state.message = action.payload.message;
    },
    categoryAllProductsFail: (state, action) => {
      state.loading = false;
      state.category = action.payload;
      state.error = action.payload.success;
    },

    // loaduser if user reload application
    GetOneProductRequest: (state) => {
      state.loading = true;
    },
    GetOneProductSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload.data;
      state.message = action.payload.message;
    },
    GetOneProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.success;
    },

    // singup user
    addProductRequest: (state) => {
      state.loading = true;
    },
    addProductSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.message = action.payload.message;
    },
    addProductFail: (state, action) => {
      state.loading = false;
      state.product = action.payload.user;
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
