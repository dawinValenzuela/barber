import { NextApiRequest, NextApiResponse } from 'next';
import admin from '../../firebase/admin';
import type { BarberService } from 'src/store/services/types';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const querySnapshot = await admin.firestore().collection('services').get();

    const services = querySnapshot.docs.map((doc) => {
      const docData = doc.data();

      return {
        id: doc.id,
        ...docData,
      } as BarberService;
    });

    return res.status(200).json(services);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
