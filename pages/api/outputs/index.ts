import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { authOptions } from '../auth/[...nextauth]';

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
      const allOutputs = [];

      const { month } = req.query;

      // get default month if not provided
      const today = new Date();
      const defaultMonth = Number(month) || today.getMonth();

      // Depending of the month, we need to get the initial and end date
      const initialDate = new Date(today.getFullYear(), defaultMonth, 1);
      const endDate = new Date(today.getFullYear(), defaultMonth + 1, 0);

      initialDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      console.log(initialDate, endDate);

      const q = query(
        collection(db, 'outputs'),
        where('createdAt', '>=', initialDate),
        where('createdAt', '<=', endDate)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const docData = doc.data();

        const output = {
          ...docData,
          id: doc.id,
          createdAt: docData.createdAt.toDate().toLocaleString(),
        };

        allOutputs.push(output);
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
      const createdBy = session.user.data.userId;

      const docRef = await addDoc(collection(db, 'outputs'), {
        ...output,
        value: Number(output.value),
        createdBy,
        createdAt: today,
        idDeleted: false,
      });

      console.log('Document written with ID: ', docRef.id);

      res.status(200).json({ message: 'Output created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
