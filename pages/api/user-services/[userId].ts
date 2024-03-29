import { NextApiRequest, NextApiResponse } from 'next';
import admin from '../../../firebase/admin';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';

interface QueryParams {
  userId: string;
  dateSelected: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { userId, dateSelected } = req.query as Partial<QueryParams>;

    let dateString: string = '';

    if (dateSelected) {
      dateString = dateSelected;
    } else {
      const today = new Date();
      dateString = today.toLocaleDateString();
    }

    const querySnapshot = await admin
      .firestore()
      .collection('barber-services')
      .where('userId', '==', userId)
      .where('isDeleted', '==', false)
      .where('date', '==', dateString)
      .get();

    const allServices = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(allServices);
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
