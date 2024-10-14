import { StateSchema } from './stateChema';
import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice'
import { rtkApi } from '../../API/rtkApi';

const rootReducers: ReducersMapObject<StateSchema> = {
  auth: authReducer,
  [rtkApi.reducerPath]: rtkApi.reducer,
}

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkApi.middleware),
})

export type AppDispatch = typeof store.dispatch

export default store