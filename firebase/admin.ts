import * as admin from 'firebase-admin';

import serviceAccount from '../serviceAccount.json';

const { DATABASE_URL } = process.env;

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: DATABASE_URL,
  });
} catch (error) {}

export default admin;
