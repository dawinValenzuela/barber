import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { FirebaseError } from '@firebase/util';
import type { ProductsState } from './types';
import type { Product, Supplier, Category } from 'src/types/product';

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>('products/fetchProducts', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`api/products`);
    return response.data as Product[];
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return thunkAPI.rejectWithValue(firebaseError.message);
  }
});

export const fetchCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>('products/fetchCategories', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`api/categories`);
    return response.data as Category[];
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return thunkAPI.rejectWithValue(firebaseError.message);
  }
});

export const fetchSuppliers = createAsyncThunk<
  Supplier[],
  void,
  { rejectValue: string }
>('products/fetchSuppliers', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`api/suppliers`);
    return response.data as Supplier[];
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return thunkAPI.rejectWithValue(firebaseError.message);
  }
});
