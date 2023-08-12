import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { ServiceState } from 'src/store/services/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const allServices: ServiceState[] = [];

      const { month } = req.query;

      // get default month if not provided
      const today = new Date();
      const defaultMonth = today.getMonth();

      // Depending of the month, we need to get the initial and end date
      const initialDate = new Date(today.getFullYear(), defaultMonth, 1);
      const endDate = new Date(today.getFullYear(), defaultMonth + 1, 0);

      initialDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      // console.log({
      //   initial: initialDate.toLocaleDateString(),
      //   end: endDate.toLocaleDateString(),
      // });

      const q = query(
        collection(db, 'barber-services'),
        where('createdAt', '>=', initialDate),
        where('createdAt', '<=', endDate),
        where('isDeleted', '==', false)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const docData = doc.data();

        const service = {
          ...docData,
          id: doc.id,
          createdAt: docData.createdAt.toDate().toLocaleString(),
        } as ServiceState;

        allServices.push(service);
      });

      res.status(200).json({
        services: allServices,
        total: allServices.length,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
