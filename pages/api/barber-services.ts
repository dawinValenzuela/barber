import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import type { BarberService } from 'src/store/services/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const services: BarberService[] = [];
    const querySnapshot = await getDocs(collection(db, 'services'));

    querySnapshot.forEach((doc) => {
      const docData = doc.data();

      const service = {
        id: doc.id,
        ...docData,
      } as BarberService;

      services.push(service);
    });

    return res.status(200).json(services);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
