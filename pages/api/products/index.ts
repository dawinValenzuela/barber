import { NextApiRequest, NextApiResponse } from 'next';
import { Product } from 'src/types/product';
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
      const allProducts: Product[] = [];

      const querySnapshot = await admin
        .firestore()
        .collection('products')
        .get();

      await Promise.all(
        querySnapshot.docs.map(async (document) => {
          const docData = document.data();

          const supplierDoc = await admin
            .firestore()
            .collection('suppliers')
            .doc(docData.supplierId)
            .get();

          const supplierData = supplierDoc.data();

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
