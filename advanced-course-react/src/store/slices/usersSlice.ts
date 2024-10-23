import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/usersTypes";
import { LOCAL_STORAGE_KEYS, saveArrayToLocalStorage } from "../../helpers/lib/localStorage";

export interface UsersScheme {
  users: IUser[]
}

const initialState: UsersScheme  = {
  users: []
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      const usersData = action.payload

      state.users = usersData
      saveArrayToLocalStorage(LOCAL_STORAGE_KEYS.USERS, usersData)
    },
  }
})

export const {setUsers} = usersSlice.actions
export default usersSlice.reducer