import {createSlice} from "@reduxjs/toolkit"



const loadAuthState = ()=>{
    try{
        const data = localStorage.getItem("auth")
        return data ? JSON.parse(data):null
    }catch{
        return null
    }
}

const saveAuthState = (state)=>{
    localStorage.setItem(
        "auth",
        JSON.stringify({
            isAuthenticated:state.isAuthenticated,
        })
    )

}

const persistedAuth = loadAuthState()

const initialState = {
  isAuthenticated: persistedAuth?.isAuthenticated || false,
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

      saveAuthState(state);
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

      localStorage.removeItem("auth")
    },
  },
});

export const { loginStart,loginSuccess,loginFailure,logout } = authSlice.actions;

export default authSlice.reducer;