import * as admin from 'firebase-admin';

const { DATABASE_URL, FIREBASE_ADMIN_CREDENTIALS } = process.env;

const serviceAccount = FIREBASE_ADMIN_CREDENTIALS as string;

const parsedServiceAccount = JSON.parse(serviceAccount);

try {
  admin.initializeApp({
    credential: admin.credential.cert(
      parsedServiceAccount as admin.ServiceAccount
    ),
    databaseURL: DATABASE_URL,
  });
} catch (error) {}

export default admin;
