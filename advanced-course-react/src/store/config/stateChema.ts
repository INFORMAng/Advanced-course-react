import { rtkApi } from './../../API/rtkApi';
import { AuthScheme } from "../slices/authSlice";
import { UsersScheme } from '../slices/usersSlice';
import { EventsScheme } from '../slices/eventsSlice';

export interface StateSchema {
  auth: AuthScheme;
  users: UsersScheme;
  events: EventsScheme;
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
}