import { StateSchema } from './stateChema';
import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { rtkApi } from '../../API/rtkApi';
import authReducer from '../slices/authSlice'
import usersReducer from '../slices/usersSlice'
import eventsReducer from '../slices/eventsSlice'

const rootReducers: ReducersMapObject<StateSchema> = {
  auth: authReducer,
  users: usersReducer,
  events: eventsReducer,
  [rtkApi.reducerPath]: rtkApi.reducer,
}

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkApi.middleware),
})

export type AppDispatch = typeof store.dispatch

export default store