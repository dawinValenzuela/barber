export interface User {
  email: string;
  nit: string;
  fullName?: string;
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

export const initialState: AuthState = {
  user: null,
  users: [],
  token: '',
  error: null,
  status: 'idle',
};
