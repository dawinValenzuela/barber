import { RequestStatus } from 'src/types/global';

export interface User {
  email: string;
  nit: string;
  fullName?: string;
  role: string;
  phone?: string;
  userId?: string; //TODO why is this here?
}

export interface UserState extends User {
  uid: string;
}

export interface AuthState {
  users: UserState[];
  error: string | null | undefined;
  status: RequestStatus;
}
