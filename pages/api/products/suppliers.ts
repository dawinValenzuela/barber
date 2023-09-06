import { NextApiRequest, NextApiResponse } from 'next';
import { Supplier } from 'src/types/product';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import admin from '../../../firebase/admin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const querySnapshot = await admin
        .firestore()
        .collection('suppliers')
        .get();

      const suppliers = querySnapshot.docs.map((doc) => {
        const docData = doc.data();

        return {
          id: doc.id,
          ...docData,
        } as Supplier;
      });

      res.status(200).json(suppliers);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
