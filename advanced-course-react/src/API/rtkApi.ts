import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../helpers/hooks/constants/api";

export const rtkApi = createApi({
  reducerPath: 'api',
  tagTypes: ['users'],
  baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
  endpoints: () => ({})
})