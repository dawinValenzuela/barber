import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { Supplier } from 'src/types/product';

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
      const suppliers: Supplier[] = [];

      const q = query(collection(db, 'suppliers'));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const docData = doc.data();

        const product = {
          ...docData,
          id: doc.id,
          createdAt: docData.createdAt.toDate().toLocaleString(),
        } as Supplier;

        suppliers.push(product);
      });

      res.status(200).json(suppliers);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
