import { createSlice } from '@reduxjs/toolkit';
import type { ServicesState } from './types';
import { fetchServices } from './actions';

const initialState: ServicesState = {
  services: [],
  status: 'idle',
  error: null,
};

export const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.services = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export default servicesSlice.reducer;
