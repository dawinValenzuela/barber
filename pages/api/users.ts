import { NextApiRequest, NextApiResponse } from 'next';
import admin from '../../firebase/admin';
import { decode } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });

    console.log('session', session);

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // const sessionToken = req.cookies['next-auth.session-token'];

    // console.log('sessionToken', req.cookies);
    // console.log('sessionToken', sessionToken);

    // if (!sessionToken) {
    //   return res.status(401).json({ message: 'No session token provided' });
    // }

    // const decoded = await decode({
    //   token: sessionToken,
    //   secret: process.env.NEXTAUTH_SECRET,
    // });

    // if (!decoded?.email) {
    //   return res.status(401).json({ message: 'Unauthorized' });
    // }

    if (req.method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const usersSnapshot = await admin
      .firestore()
      .collection('users')
      .where('role', '==', 'barber')
      .get();
    const allUsers = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(allUsers);
  } catch (error) {
    console.error('Firebase error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
