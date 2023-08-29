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
  pages: {
    signIn: '/login',
  },
  // cookies: {
  //   sessionToken: {
  //     name: 'next-auth.session-token',
  //     options: {
  //       secure: process.env.NODE_ENV === 'production', // Configura secure solo en producción
  //     },
  //   },
  // },
  callbacks: {
    async jwt({ token }) {
      console.log(token);
      if (token.email) {
        try {
          const q = query(
            collection(db, 'users'),
            where('email', '==', token.email)
          );
          const querySnapshot = await getDocs(q);
          const userData = querySnapshot.docs.map((doc) => doc.data());

          token.userData = userData[0];
        } catch (error) {
          console.log(error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token.userData;

      return session;
    },
  },
};

export default NextAuth(authOptions);
