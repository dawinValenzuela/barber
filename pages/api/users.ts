import { NextApiRequest, NextApiResponse } from 'next';
import admin from '../../firebase/admin';
import { decode } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

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
