import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  auth: boolean;
}

const initialState: AuthState = {
  auth: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogIn: (state) => {
      state.auth = true
    },
    authLogOut: (state) => {
      state.auth = false
    },
  }
})

export const {authLogIn, authLogOut} = authSlice.actions
export default authSlice.reducer

