import { NextApiRequest, NextApiResponse } from 'next';
import admin from '../../../firebase/admin';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const { userId, month } = req.query;

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
      .collection('barber-services')
      .where('createdAt', '>=', initialDate)
      .where('createdAt', '<=', endDate)
      .where('isDeleted', '==', false)
      .where('userId', '==', userId)
      .get();

    const allServices = querySnapshot.docs.map((doc) => {
      const docData = doc.data();

      return {
        ...docData,
        id: doc.id,
      };
    });

    res.status(200).json(allServices);
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
