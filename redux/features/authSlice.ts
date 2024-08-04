import { createSlice } from "@reduxjs/toolkit";
import { z } from "zod";

interface AuthState {
  user: {
    email: string;
    first_name: string;
    last_name: string;
    id: number;
  } | null;
  isAuthenticated: boolean;
  redirectToLogin :boolean;
  isLoading: boolean;
}

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  redirectToLogin:false
} as AuthState;

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuth: (state) => {
      state.isAuthenticated = true;
    },
    setLoading: (state) => {
      state.isLoading = true;
    },
    finishInitialLoad: (state) => {
      state.isLoading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    setRedirectToLogin:(state)=>{
      state.redirectToLogin = true
    },
    unsetRedirectToLogin:(state)=>{
      state.redirectToLogin = false
    }
  },
});

export const { setUser, setAuth, logout, finishInitialLoad,setLoading,setRedirectToLogin, unsetRedirectToLogin } =
  authSlice.actions;
export default authSlice.reducer;
