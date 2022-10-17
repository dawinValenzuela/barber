import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from 'firebase/firestore';

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
  const [userServices, setUserServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingServices, setIsLoadingServices] = useState(false);

  useEffect(() => {
    setIsLoading(true);
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
        setIsLoading(false);
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

  const addService = (data) => {
    const today = new Date();

    const newService = {
      ...data,
      createdAt: today,
      date: today.toLocaleDateString(),
      hour: today.toLocaleTimeString(),
      isDeleted: false,
    };

    return addDoc(collection(db, 'barber-services'), {
      ...newService,
    });
  };

  const getUserServices = async () => {
    setIsLoadingServices(true);
    const allServices = [];
    const today = new Date();
    const dateString = today.toLocaleDateString();

    const q = query(
      collection(db, 'barber-services'),
      where('userId', '==', loggedUser.uid),
      where('isDeleted', '==', false),
      where('date', '==', dateString)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const docData = doc.data();

      const item = {
        id: doc.id,
        ...docData,
      };

      allServices.push(item);
    });
    setUserServices(allServices);
    setIsLoadingServices(false);
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

  const deleteBarberService = (id) => {
    const docRef = doc(db, 'barber-services', id);
    return updateDoc(docRef, { isDeleted: true });
  };

  return (
    <AuthContext.Provider
      value={{
        user: loggedUser,
        login,
        logout,
        signup,
        isLoading,
        isLoadingServices,
        addBarberService,
        getBarberServices,
        addService,
        services,
        getUserServices,
        userServices,
        deleteBarberService,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
