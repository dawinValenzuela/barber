import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/api/products',
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
