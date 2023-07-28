import { createAsyncThunk } from '@reduxjs/toolkit';
import { FirebaseError } from '@firebase/util';

import axios from 'axios';

import type { User, UserState } from './types';

export const fetchUsers = createAsyncThunk<
  UserState[],
  void,
  { rejectValue: string }
>('users/fetchUsers', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`/api/users`);
    return response.data as UserState[];
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return thunkAPI.rejectWithValue(firebaseError.message);
  }
});
