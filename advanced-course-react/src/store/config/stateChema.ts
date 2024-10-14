import { rtkApi } from './../../API/rtkApi';
import { AuthState } from "../slices/authSlice";

export interface StateSchema {
  auth: AuthState;
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
}