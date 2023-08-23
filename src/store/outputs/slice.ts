import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const outputsApi = createApi({
  reducerPath: 'outputsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/outputs' }),
  endpoints: (builder) => ({
    getOutputs: builder.query({
      query: (month?: number) => `?month=${month}`,
    }),
    createOutput: builder.mutation({
      query: (newOutput) => ({
        url: '/',
        method: 'POST',
        body: {
          output: newOutput,
        },
      }),
    }),
  }),
});

export const { useGetOutputsQuery, useCreateOutputMutation } = outputsApi;
