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
