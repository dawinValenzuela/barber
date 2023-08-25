import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: 'google-credentials',
      name: 'Credentials',
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
    async jwt({ token, user, session }) {
      if (user) {
        const q = query(
          collection(db, 'users'),
          where('email', '==', user.email)
        );
        const querySnapshot = await getDocs(q);
        const userData = querySnapshot.docs.map((doc) => doc.data());

        // Append user data to user
        return { ...token, userData: userData[0] };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        userData: token.userData,
      };
    },
  },
};

export default NextAuth(authOptions);
