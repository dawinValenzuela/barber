import { RequestStatus } from 'src/types/global';
import { User } from 'src/types/user';

export interface UserState extends User {
  uid: string;
}

export interface AuthState {
  users: UserState[];
  error: string | null | undefined;
  status: RequestStatus;
}
