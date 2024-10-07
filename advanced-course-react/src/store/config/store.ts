import { StateSchema } from './stateChema';
import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice'

const rootReducers: ReducersMapObject<StateSchema> = {
  auth: authReducer,
}

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat()
})

export type AppDispatch = typeof store.dispatch

export default store