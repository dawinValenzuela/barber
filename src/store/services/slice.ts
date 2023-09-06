import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { ServicesState } from './types';
import {
  fetchServices,
  fetchAllServices,
  fetchBarberServices,
} from './actions';

const initialState: ServicesState = {
  services: [],
  barberServices: [],
  reportServices: {
    services: [],
    total: 0,
  },
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
    builder
      .addCase(fetchBarberServices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBarberServices.fulfilled, (state, action) => {
        state.barberServices = action.payload?.services;
        state.status = 'idle';
      })
      .addCase(fetchBarberServices.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export const { clearServices } = servicesSlice.actions;
export default servicesSlice.reducer;

export const servicesApi = createApi({
  reducerPath: 'servicesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    getBarberServices: builder.query({
      query: () => '/api/barber-services',
    }),
    createService: builder.mutation({
      query: (newService) => ({
        url: '/api/services',
        method: 'post',
        body: {
          service: newService,
        },
      }),
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/api/services/${id}`,
        method: 'delete',
      }),
    }),
    getAllServices: builder.query({
      query: (month?: number) => `/api/services?month=${month}`,
    }),
    getResumeServices: builder.query({
      query: ({ userId, month }) => `/api/resume/${userId}?month=${month}`,
    }),
  }),
});

export const {
  useGetBarberServicesQuery,
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useGetAllServicesQuery,
  useGetResumeServicesQuery,
} = servicesApi;
