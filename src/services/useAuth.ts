import { useCallback } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';

export const useAuth = () => {
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (!user) {
  //       setUser(null);
  //       router.push('/login');
  //     }

  //     setUser(user);
  //   });

  //   // Al desmontar el componente, cancela la suscripción
  //   return () => unsubscribe();
  // }, []);

  const logOut = useCallback(async () => {
    await signOut(auth);
  }, []);

  return {
    logOut,
  };
};
