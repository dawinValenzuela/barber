import { createSlice } from '@reduxjs/toolkit';
import type { ServicesState } from './types';
import { fetchServices, fetchAllServices } from './actions';

const initialState: ServicesState = {
  services: [],
  reportServices: [],
  status: 'idle',
  error: null,
};

export const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    clearServices: () => {
      return initialState;
    },
  },
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
    builder
      .addCase(fetchAllServices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllServices.fulfilled, (state, action) => {
        state.reportServices = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchAllServices.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export const { clearServices } = servicesSlice.actions;
export default servicesSlice.reducer;
