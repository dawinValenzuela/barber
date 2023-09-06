import { NextApiRequest, NextApiResponse } from 'next';
import admin from '../../../firebase/admin';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
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
        .collection('barber-services')
        .where('createdAt', '>=', initialDate)
        .where('createdAt', '<=', endDate)
        .where('isDeleted', '==', false)
        .get();

      const allServices = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(200).json(allServices);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { service } = req.body;

      const today = new Date();
      const dateSelected = new Date(service.createdAt);

      const newService = {
        ...service,
        value: Number(service.value),
        createdAt: dateSelected,
        date: dateSelected
          ? `${dateSelected.getDate()}/${
              dateSelected.getMonth() + 1
            }/${dateSelected.getFullYear()}`
          : `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`,
        hour: dateSelected
          ? dateSelected.toLocaleTimeString()
          : today.toLocaleTimeString(),
        isDeleted: false,
      };

      const createdBy = session.userData.userId;

      await admin
        .firestore()
        .collection('barber-services')
        .add({ ...newService, createdBy });

      res.status(200).json({ message: 'Service created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export default handler;
