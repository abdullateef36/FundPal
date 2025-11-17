// src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false, // Tracks if the user is logged in
  user: null,             // Stores user details
  fund: null,             // Stores the fund details
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true; // Mark the user as authenticated
      state.user = action.payload;  // Store user details
    },
    logout: (state) => {
      state.isAuthenticated = false; // Mark the user as unauthenticated
      state.user = null;             // Clear user details
      state.fund = null;             // Clear any fund details
    },
    startFund: (state, action) => {
      state.fund = action.payload;  // Store the fund details
    },
    clearFund: (state) => {
      state.fund = null; // Clear fund details when needed
    },
  },
});

export const { login, logout, startFund, clearFund } = authSlice.actions;

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
