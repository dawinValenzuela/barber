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

export default authSlice.reducer;
