import { NextApiRequest, NextApiResponse } from 'next';
import admin from '../../../firebase/admin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);

    if (!decodedToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { userId, date } = req.query;

    let dateString = '';

    if (date) {
      dateString = date;
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
