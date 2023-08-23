import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { createSlice } from '@reduxjs/toolkit';

import type { AuthState } from './types';
import { fetchUsers } from './actions';

const initialState: AuthState = {
  users: [],
  error: null,
  status: 'idle',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/users' }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/',
    }),
  }),
});

export default authSlice.reducer;
export const { useGetUsersQuery } = userApi;
