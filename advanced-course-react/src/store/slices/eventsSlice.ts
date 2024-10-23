import { getArrayFromLocalStorage, LOCAL_STORAGE_KEYS } from './../../helpers/lib/localStorage';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEvent } from "../../types/eventTypes";
import { saveArrayToLocalStorage } from "../../helpers/lib/localStorage";

export interface EventsScheme {
  events: IEvent[]
}

const initialState: EventsScheme = {
  events: []
}

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<IEvent[]>): void => {
      const eventsData = action.payload

      saveArrayToLocalStorage(LOCAL_STORAGE_KEYS.EVENTS, eventsData)
      state.events = eventsData
    },
    createEvent: (state, action: PayloadAction<IEvent>): void => {
      const eventData = action.payload
      const isEventsLocalData = getArrayFromLocalStorage(LOCAL_STORAGE_KEYS.EVENTS)
      const events: IEvent[] = isEventsLocalData ? isEventsLocalData : state.events

      events.push(eventData)

      saveArrayToLocalStorage(LOCAL_STORAGE_KEYS.EVENTS, events)
      state.events = events
    }
  }
})

export const {createEvent, setEvents} = eventsSlice.actions
export default eventsSlice.reducer