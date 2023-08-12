import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ServiceState } from './types';
import { FirebaseError } from '@firebase/util';
import axios from 'axios';

export const fetchServices = createAsyncThunk<
  ServiceState[],
  { userId: string; date?: string },
  { rejectValue: string }
>('services/fetchServices', async ({ userId, date }, thunkAPI) => {
  try {
    let dateString = '';

    if (date) {
      dateString = date;
    } else {
      const today = new Date();
      dateString = today.toLocaleDateString();
    }

    const response = await axios.get(
      `api/user-services/${userId}?date=${dateString}`
    );
    return response.data as ServiceState[];
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return thunkAPI.rejectWithValue(firebaseError.message);
  }
});

export const fetchAllServices = createAsyncThunk<
  ServiceState[],
  { month?: number },
  { rejectValue: string }
>('services/fetchAllServices', async ({ month }, thunkAPI) => {
  try {
    const response = await axios.get(`api/services?month=${month}`);
    return {
      services: response.data.services as ServiceState[],
      total: response.data.total as number,
    };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return thunkAPI.rejectWithValue(firebaseError.message);
  }
});
