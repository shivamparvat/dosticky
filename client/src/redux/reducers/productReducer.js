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
    oneProductRequest: (state) => {
      state.loading = true;
    },
    oneProductSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.message = action.payload.message;
    },
    oneProductFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = action.payload.user;
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
