import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { initialState, UserState } from './types';
import { loginUser, logoutUser, checkAuthState } from './actions';

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
        state.status = 'idle';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
        if (action.payload) {
          state.error = action.payload.error;
        }
        state.status = 'idle';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.error = null;
        state.status = 'idle';
      })
      .addCase(logoutUser.rejected, (state, action) => {
        if (action.payload && action.payload.error) {
          state.error = action.payload.error;
        }
      })
      .addCase(checkAuthState.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuthState.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
        state.status = 'idle';
      })
      .addCase(checkAuthState.rejected, (state, action) => {
        state.user = null;
        if (action.payload) {
          state.error = action.payload.error;
        }
        state.status = 'idle';
      });
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
