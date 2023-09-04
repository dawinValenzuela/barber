import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import admin from '../../../firebase/admin';

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
      const { month } = req.query;

      // get default month if not provided
      const today = new Date();
      const defaultMonth = Number(month) || today.getMonth();

      // Depending of the month, we need to get the initial and end date
      const initialDate = new Date(today.getFullYear(), defaultMonth, 1);
      const endDate = new Date(today.getFullYear(), defaultMonth + 1, 0);

      initialDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      const querySnapshot = await admin
        .firestore()
        .collection('outputs')
        .where('createdAt', '>=', initialDate)
        .where('createdAt', '<=', endDate)
        .get();

      const allOutputs = querySnapshot.docs.map((doc) => {
        const docData = doc.data();

        const output = {
          ...docData,
          id: doc.id,
          createdAt: docData.createdAt.toDate().toLocaleString(),
        };

        return output;
      });

      res.status(200).json(allOutputs);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { output } = req.body;

      const today = new Date();
      const createdBy = session.userData.userId;

      const docRef = await addDoc(collection(db, 'outputs'), {
        ...output,
        value: Number(output.value),
        createdBy,
        createdAt: today,
        idDeleted: false,
      });

      res.status(200).json({ message: 'Output created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
