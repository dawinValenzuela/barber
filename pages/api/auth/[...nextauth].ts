import { set } from 'lodash';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../../firebase/config';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'google-credentials',
      credentials: {},
      async authorize(credentials) {
        try {
          const { user } = await signInWithEmailAndPassword(
            auth,
            credentials?.email,
            credentials?.password
          );

          return user;
        } catch (error) {
          throw new Error('Invalid username/password');
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, user }) {
      if (session?.user?.email) {
        const q = query(
          collection(db, 'users'),
          where('email', '==', session.user.email)
        );
        const querySnapshot = await getDocs(q);
        const userData = querySnapshot.docs.map((doc) => doc.data());

        // Append user data to session
        session.user.data = userData[0];
      }

      return session;
    },
    async signIn({ account }) {
      return account?.provider === 'google-credentials';
    },
    async jwt({ token, user }) {
      return token;
    },
  },
};

export default NextAuth(authOptions);
