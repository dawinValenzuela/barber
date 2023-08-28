import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase/config';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const { userId, date } = req.query;

    const allServices = [];

    let dateString = '';

    if (date) {
      dateString = date;
    } else {
      const today = new Date();
      dateString = today.toLocaleDateString();
    }

    const q = query(
      collection(db, 'barber-services'),
      where('userId', '==', userId),
      where('isDeleted', '==', false),
      where('date', '==', dateString)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const docData = doc.data();

      const service = {
        ...docData,
        id: doc.id,
      };

      allServices.push(service);
    });

    res.status(200).json(allServices);
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
