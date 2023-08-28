import 'next-auth';
import { User } from './user';

declare module 'next-auth' {
  interface Session {
    user: {
      email: string;
      fullName: string;
      role: string;
      userId: string;
      nit: string;
      phone: string;
    };
  }
}
