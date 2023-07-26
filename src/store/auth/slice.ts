import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { auth } from '../../../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from '@firebase/util';

export interface User {
  email: string;
  fullName: string;
  role: string;
  phone?: string;
}

export interface UserState extends User {
  id: string;
}

export interface AuthState {
  user: UserState | null;
  users: UserState[];
  token: string;
  error: string | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthState = {
  user: null,
  users: [],
  token: '',
  error: null,
  status: 'idle',
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return user;
    } catch (error) {
      const firebaseError = error as FirebaseError;
      return thunkAPI.rejectWithValue({ error: firebaseError.message });
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
        state.status = 'idle';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload.error;
        state.status = 'idle';
      });
  },
});

export const { setToken, setUser } = authSlice.actions;

export default authSlice.reducer;
