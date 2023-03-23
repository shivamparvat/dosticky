import { createReducer } from "@reduxjs/toolkit";

export const categoryReducer = createReducer(
  {},
  {
    categoryRequest: (state) => {
      state.loading = true;
    },
    categorySuccess: (state, action) => {
      state.loading = false;
      state.category = action.payload;
      state.message = action.payload;
    },
    categoryFail: (state, action) => {
      state.loading = false;
      state.category = action.payload;
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
