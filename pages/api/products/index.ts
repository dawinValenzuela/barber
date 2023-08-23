import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { collection, getDocs, query, getDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { Product } from 'src/types/product';

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
      const allProducts: Product[] = [];

      const q = query(collection(db, 'products'));

      const querySnapshot = await getDocs(q);

      await Promise.all(
        querySnapshot.docs.map(async (document) => {
          const docData = document.data();

          const supplierDoc = doc(db, 'suppliers', docData.supplierId);

          const supplierDocSnapshot = await getDoc(supplierDoc);

          const supplierData = supplierDocSnapshot.data();

          const product = {
            ...docData,
            id: document.id,
            createdAt: docData.createdAt.toDate().toLocaleString(),
            supplier: supplierData?.name,
            stock: 0,
          } as Product;

          allProducts.push(product);
        })
      );

      res.status(200).json(allProducts);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
