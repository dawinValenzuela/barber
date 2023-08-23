import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { ServiceState } from 'src/store/services/types';
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
      const allServices: ServiceState[] = [];

      const { month } = req.query;

      // get default month if not provided
      const today = new Date();

      const defaultMonth = Number(month) || today.getMonth();

      // Depending of the month, we need to get the initial and end date
      const initialDate = new Date(today.getFullYear(), defaultMonth, 1);
      const endDate = new Date(today.getFullYear(), defaultMonth + 1, 0);

      initialDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      const q = query(
        collection(db, 'barber-services'),
        where('createdAt', '>=', initialDate),
        where('createdAt', '<=', endDate),
        where('isDeleted', '==', false)
      );

      const querySnapshot = await getDocs(q);

      await Promise.all(
        querySnapshot.docs.map(async (document) => {
          const docData = document.data();

          const userQuery = query(
            collection(db, 'users'),
            where('userId', '==', docData.userId)
          );
          const userQuerySnapshot = await getDocs(userQuery);
          const userData = userQuerySnapshot.docs[0].data();

          const service = {
            ...docData,
            id: document.id,
            createdAt: docData.createdAt.toDate().toLocaleString(),
            user: userData?.fullName,
          } as ServiceState;

          allServices.push(service);
        })
      );

      res.status(200).json({
        services: allServices,
        total: allServices.length,
      });
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

      const createdBy = session.user.data.userId;

      await addDoc(collection(db, 'barber-services'), {
        ...newService,
        createdBy,
      });

      res.status(200).json({ message: 'Service created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
