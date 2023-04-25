import { createReducer } from "@reduxjs/toolkit";

export const orderReducer = createReducer(
  {},
  {
    getOneOrderRequest: (state) => {
      state.loading = true;
    },
    getOneOrderSuccess: (state, action) => {
      state.loading = false;
      state.oneOrder = action.payload.data;
      state.message = action.payload.message;
    },
    getOneOrderFail: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.error = action.payload.success;
    },

    getOrderRequest: (state) => {
      state.loading = true;
    },
    getOrderSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload.data;
      state.message = action.payload.message;
    },
    getOrderFail: (state, action) => {
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
