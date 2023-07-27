import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  query,
  where,
  getDocs,
  QuerySnapshot,
} from 'firebase/firestore';
import { db } from '../../../firebase/config';
import type { ServiceState, Service } from './types';
import { FirebaseError } from '@firebase/util';

export const fetchServices = createAsyncThunk<
  ServiceState[],
  { userId: string; date?: string },
  { rejectValue: string }
>('services/fetchServices', async ({ userId, date }, thunkAPI) => {
  try {
    const allServices: ServiceState[] = [];

    let dateString = '';

    if (date) {
      dateString = date;
    } else {
      const today = new Date();
      dateString = today.toLocaleDateString();
    }

    console.log(userId, date);

    const q = query(
      collection(db, 'barber-services'),
      where('userId', '==', userId),
      where('isDeleted', '==', false),
      where('date', '==', dateString)
    );

    console.log({ q });

    const querySnapshot: QuerySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const docData = doc.data() as Service;

      const item: ServiceState = {
        id: doc.id,
        ...docData,
      };

      allServices.push(item);
    });

    console.log({ allServices });

    return allServices;
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return thunkAPI.rejectWithValue(firebaseError.message);
  }
});
