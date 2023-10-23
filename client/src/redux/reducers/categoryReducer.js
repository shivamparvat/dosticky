import { createReducer } from "@reduxjs/toolkit";

export const categoryReducer = createReducer(
  { loading: false, category: { data: [] }, message: "" },
  {
    categoryRequest: (state) => {
      state.loading = true;
    },
    categorySuccess: (state, action) => {
      state.loading = false;
      state.category = action.payload;
      state.message = action.payload.message;
    },
    categoryFail: (state, action) => {
      state.loading = false;
      state.category = action.payload;
      state.error = action.payload.success;
    },

    AddcategoryRequest: (state) => {
      state.loading = true;
    },
    AddcategorySuccess: (state, action) => {
      state.loading = false;
      state.category = action.payload;
      state.message = action.payload.message;
    },
    AddcategoryFail: (state, action) => {
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
