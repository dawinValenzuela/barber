import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { set } from 'lodash';

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: 'google-credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const { user } = await signInWithEmailAndPassword(
            auth,
            credentials?.email,
            credentials?.password
          );

          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          throw new Error('Las credenciales son inválidas');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session, token }) {
      // console.log(token);

      if (session?.user.email) {
        const q = query(
          collection(db, 'users'),
          where('email', '==', session?.user.email)
        );
        const querySnapshot = await getDocs(q);
        const userData = querySnapshot.docs.map((doc) => doc.data());

        const newUser = {
          ...session.user,
          ...userData[0],
        };

        set(session, 'user', newUser);
      }

      // console.log('session', session);

      return session;
    },
  },
};

export default NextAuth(authOptions);
