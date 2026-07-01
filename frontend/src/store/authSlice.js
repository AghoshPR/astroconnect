import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    loginSuccess: (state) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = null;
    },

    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { loginStart,loginSuccess,loginFailure,logout } = authSlice.actions;

export default authSlice.reducer;