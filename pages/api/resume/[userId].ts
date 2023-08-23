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
    const { userId, month } = req.query;

    const allServices = [];

    let dateString = '';

    // get default month if not provided
    const today = new Date();
    const defaultMonth = Number(month) || today.getMonth();

    // Depending of the month, we need to get the initial and end date
    const initialDate = new Date(today.getFullYear(), defaultMonth, 1);
    const endDate = new Date(today.getFullYear(), defaultMonth + 1, 0);

    initialDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    const q = query(
      collection(db, 'barber-services'),
      where('createdAt', '>=', initialDate),
      where('createdAt', '<=', endDate),
      where('isDeleted', '==', false),
      where('userId', '==', userId)
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
