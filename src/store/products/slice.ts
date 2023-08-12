import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts, fetchCategories, fetchSuppliers } from './actions';

const initialState = {
  products: [],
  categories: [],
  suppliers: [],
  status: 'idle',
  error: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProducts: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
    builder
      .addCase(fetchSuppliers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.suppliers = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});
