import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { auth } from '../../../firebase/config';

export const usersApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    prepareHeaders: async (headers) => {
      const user = auth.currentUser;

      console.log('user', user);

      if (user) {
        const token = await user.getIdToken();
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/api/users',
    }),
    getUserServices: builder.query({
      query: ({ userId, dateSelected }) =>
        `/api/user-services/${userId}?dateSelected=${dateSelected}`,
    }),
  }),
});

export const { useGetUsersQuery, useGetUserServicesQuery } = usersApi;
