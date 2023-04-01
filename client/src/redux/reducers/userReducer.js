import { createReducer } from "@reduxjs/toolkit";

export const useReducer = createReducer(
  {},
  {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.message = action.payload.message;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = action.payload.user;
      state.error = action.payload.success;
    },

    // loaduser if user reload application
    loadUserRequest: (state) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.message = action.payload.message;
    },
    loadUserFail: (state, action) => {
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
      state.message = action.payload.message;
    },
    singupUserFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = action.payload.user;
      state.error = action.payload.success;
    },
    
    // logout user
    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = action.payload;
      state.message = action.payload.message;
    },
    logoutFail: (state) => {
      state.loading = false;
    },


    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  }
);
