import { rtkApi } from "../../API/rtkApi";
import { IEvent } from "../../types/eventTypes";

const eventsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getEvents: build.query<IEvent[], void>({
      query: () => ({
        url: '/events',
      }),
      providesTags: (result) => result
        ? [
          ...result.map(({id}) => ({type: 'events' as const, id})),
          {type: 'events', id: 'LIST' as const},
      ]
      : [{type: 'events', id: 'LIST' as const}],
    }),
    addEvents: build.mutation<void, IEvent>({
      query: (newEvent) => ({
        url: `/events`,
        method: 'POST',
        body: newEvent,
      }),
      invalidatesTags: [{type: 'events', id: 'LIST'}],
    }),
    deleteEvent: build.mutation<void, string>({
      query: (eventId) => ({
        url: `/events/${eventId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{type: 'events', id}]
    })
  })
})

export const useGetEvents = eventsApi.useGetEventsQuery
export const useAddEvent = eventsApi.useAddEventsMutation
export const useDeleteEvent = eventsApi.useDeleteEventMutation