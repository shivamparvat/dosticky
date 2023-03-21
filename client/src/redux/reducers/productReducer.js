import { createReducer } from "@reduxjs/toolkit";

export const useReducer = createReducer(
  {},
  {
    categoryAllProductsRequest: (state) => {
      state.loading = true;
    },
    categoryAllProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.message = action.payload;
    },
    categoryAllProductsFail: (state, action) => {
      state.loading = false;
      state.products = action.payload.user;
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
      state.message = action.payload;
    },
    oneProductFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = action.payload.user;
      state.error = action.payload.success;
    },

    // singup user
    singupUserRequest: (state) => {
      state.loading = true;
    },
    singupUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.message = action.payload;
    },
    singupUserFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = action.payload.user;
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
