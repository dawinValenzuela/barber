import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/config';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;

      console.log({ id });

      const docRef = doc(db, 'barber-services', id as string);

      await updateDoc(docRef, { isDeleted: true });

      res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
