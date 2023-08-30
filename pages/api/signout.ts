import { NextApiRequest, NextApiResponse } from 'next';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Realiza el cierre de sesión
    await signOut(auth);

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Firebase sign out error:', error);
    res.status(500).json({ error: 'An error occurred during sign out' });
  }
};

export default handler;
