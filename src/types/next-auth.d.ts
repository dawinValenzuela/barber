import 'next-auth';
import { User } from './user';

declare module 'next-auth' {
  interface Session {
    user: {
      name: string | undefined;
      email: string;
      image: string | undefined;
      data: User;
    };
  }
}
