import { useState, useEffect } from 'react';
import { useCallback } from 'react';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { auth } from '../../firebase/config';
import { set } from 'lodash';
import { useRouter } from 'next/router';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setUser(null);
        router.push('/login');
      }

      setUser(user);
    });

    // Al desmontar el componente, cancela la suscripción
    return () => unsubscribe();
  }, []);

  const signIn = useCallback(async (credentials) => {
    const { user } = await signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );
    setUser(user);
    return user;
  }, []);

  const logOut = useCallback(async () => {
    await signOut(auth);
    setUser(null);
  }, []);

  return {
    user,
    logOut,
    signIn,
  };
};
