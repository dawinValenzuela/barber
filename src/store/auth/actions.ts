import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth, db } from '../../../firebase/config';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { FirebaseError } from '@firebase/util';
import {
  collection,
  query,
  where,
  getDocs,
  QuerySnapshot,
} from 'firebase/firestore';

import type { User, UserState } from './types';

const getUserData = async (email: string): Promise<User> => {
  const q = query(collection(db, 'users'), where('email', '==', email));
  const querySnapshot: QuerySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    throw new Error('User not found');
  }
  const user = querySnapshot.docs[0].data() as User;
  return user;
};

export const loginUser = createAsyncThunk<
  UserState, // Define the type of the fulfilled action payload
  { email: string; password: string },
  { rejectValue: { error: string } }
>('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    if (!user?.email) {
      throw new Error('User not found');
    }

    const userData = await getUserData(user?.email);

    return {
      email: user.email,
      id: user.uid,
      phone: userData.phone,
      fullName: userData.fullName,
      role: userData.role,
      nit: userData.nit,
    };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return rejectWithValue({ error: firebaseError.message });
  }
});

export const logoutUser = createAsyncThunk<
  void,
  void,
  { rejectValue: { error: string } }
>('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await signOut(auth);
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return rejectWithValue({ error: firebaseError.message });
  }
});

export const checkAuthState = createAsyncThunk<
  UserState | null, // Define the type of the fulfilled action payload
  void,
  { rejectValue: { error: string } }
>('auth/checkAuthState', async (_, { rejectWithValue }) => {
  try {
    const user = auth.currentUser;

    if (!user?.email) {
      return null;
    }

    const userData = await getUserData(user?.email);

    return {
      email: user.email,
      id: user.uid,
      phone: userData.phone,
      fullName: userData.fullName,
      role: userData.role,
      nit: userData.nit,
    };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return rejectWithValue({ error: firebaseError.message });
  }
});
