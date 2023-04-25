import { createReducer } from "@reduxjs/toolkit";

export const addressReducer = createReducer(
  {},
  {
    AddAddressRequest: (state) => {
      state.loading = true;
    },
    AddAddressSuccess: (state, action) => {
      state.loading = false;
      state.Newaddress = action.payload.data;
      state.address = [...state.address, action.payload.data];
      state.message = action.payload.message;
    },
    AddAddressFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.success;
    },

    GetAddressRequest: (state) => {
      state.loading = true;
    },
    GetAddressSuccess: (state, action) => {
      state.loading = false;
      state.address = action.payload.data;
      state.message = action.payload.message;
    },
    GetAddressFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.success;
    },

    DeleteAddressRequest: (state) => {
      state.loading = true;
    },
    DeleteAddressSuccess: (state, action) => {
      state.loading = false;
      state.address = action.payload.data;
      state.message = action.payload.message;
    },
    DeleteAddressFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.success;
    },

    UpdateAddressRequest: (state) => {
      state.loading = true;
    },
    UpdateAddressSuccess: (state, action) => {
      state.loading = false;
      state.address = action.payload.data;
      state.message = action.payload.message;
    },
    UpdateAddressFail: (state, action) => {
      state.loading = false;
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
