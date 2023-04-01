import { createReducer } from "@reduxjs/toolkit";

export const discountReducer = createReducer(
  {},
  {
    newDiscountRequest: (state) => {
      state.loading = true;
    },
    newDiscountSuccess: (state, action) => {
      state.loading = false;
      state.discount = action.payload;
      state.message = action.payload.message;
    },
    newDiscountFail: (state, action) => {
      state.loading = false;
      state.discount = action.payload;
      state.error = action.payload.success;
    },


    // loaduser if discount reload application
    getAllDiscountRequest: (state) => {
      state.loading = true;
    },
    getAllDiscountSuccess: (state, action) => {
      state.loading = false;
      state.discount = action.payload;
      state.message = action.payload.message;
    },
    getAllDiscountFail: (state, action) => {
      state.loading = false;
      state.discount = action.payload;
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
