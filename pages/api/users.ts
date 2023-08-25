import { NextApiRequest, NextApiResponse } from 'next';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getSession } from 'next-auth/react';
import { db } from '../../firebase/config';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    if (req.method === 'GET') {
      console.log('req.headers', req.headers);

      const allUsers = [];
      const q = query(collection(db, 'users'), where('role', '==', 'barber'));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const docData = doc.data();

        const user = {
          ...docData,
          id: doc.id,
        };

        allUsers.push(user);
      });

      res.status(200).json(allUsers);
    } else {
      // Handle any other HTTP method
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Firebase error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
