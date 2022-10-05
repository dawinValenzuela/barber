import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { collection, addDoc, getDocs } from 'firebase/firestore';

import { auth, db } from '../firebase/config';

const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loggedUser, setUser] = useState<any>(null);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
        setIsLoading(false);
      } else {
        setUser(null);
      }
    });

    return () => unsuscribe();
  }, []);

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  interface Service {
    name: string;
    value: number;
    userId: string;
  }

  const addBarberService = ({ name, value, userId }: Service) => {
    return addDoc(collection(db, 'services'), {
      name,
      value,
      userId,
    });
  };

  const getBarberServices = async () => {
    const allServices = [];
    const querySnapshot = await getDocs(collection(db, 'services'));
    querySnapshot.forEach((doc) => {
      allServices.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setServices(allServices);
  };

  return (
    <AuthContext.Provider
      value={{
        user: loggedUser,
        login,
        logout,
        signup,
        isLoading,
        addBarberService,
        getBarberServices,
        services,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
