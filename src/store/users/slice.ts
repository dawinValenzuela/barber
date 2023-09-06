import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const usersApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/api/users',
    }),
    getUserServices: builder.query({
      query: ({ userId, dateSelected }) =>
        `/api/user-services/${userId}?dateSelected=${dateSelected}`,
      providesTags: ['Users'],
    }),
    deleteUserService: builder.mutation({
      query: (serviceId) => ({
        url: `/api/services/${serviceId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
    createUserService: builder.mutation({
      query: (newService) => ({
        url: '/api/services',
        method: 'POST',
        body: {
          service: newService,
        },
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserServicesQuery,
  useCreateUserServiceMutation,
  useDeleteUserServiceMutation,
} = usersApi;
