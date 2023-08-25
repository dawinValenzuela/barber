import 'next-auth';
import { User } from './user';

declare module 'next-auth' {
  interface Session {
    user: {
      email: string;
    };
    userData: User;
  }
}
