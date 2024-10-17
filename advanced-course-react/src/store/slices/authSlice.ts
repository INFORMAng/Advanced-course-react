import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/usersTypes";
import { removeUserAuthFromLocalStorage, saveUserAuthToLocalStorage } from "../../helpers/lib/localStorage";
import toastr from "../../helpers/hooks/constants/toastrConfig";

export interface AuthState {
  user: IUser
  auth: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: AuthState = {
  user: {} as IUser,
  auth: false,
  isLoading: false,
  error: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogIn: (state, action: PayloadAction<{users: IUser[], username: string, password: string}>) => {
      state.isLoading = true
      const {users, username, password} = action.payload
      const userExists = users?.find(user => user.username === username && user.password === password)
      state.isLoading = false

      if (userExists) {
        state.auth = true
        state.user = userExists
        
        saveUserAuthToLocalStorage(username)
      } else {
        state.user = {} as IUser
        toastr.error('Неверное имя пользователя или пароль', 'Ошибка')
      }
    },
    authLogOut: (state) => {
      state.auth = false

      removeUserAuthFromLocalStorage()
    },
    setAuth: (state) => {
      state.auth = true
    }
  }
})

export const {authLogIn, authLogOut, setAuth} = authSlice.actions
export default authSlice.reducer

