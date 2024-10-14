import { rtkApi } from "../../API/rtkApi";
import { IUser } from "../../types/usersTypes";

const usersApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], null>({
      query: () => ({
        url: '/users'
      }),
      providesTags: (result) => result 
            ? [
                ...result.map(({id}) => ({type: 'users' as const, id})),
                {type: 'users', id: 'LIST' as const},
            ]
            : [{type: 'users', id: 'LIST' as const}],
    })
  })
})

export const useGetUsers = usersApi.useGetUsersQuery