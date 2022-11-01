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
import { AuthContextProviderProps } from './types';
import {
  UserInfo,
  SignupProps,
  ServiceProps,
  BarberServiceProps,
  UserData,
} from '../types';

import { auth, db } from '../firebase/config';

const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [loggedUser, setUser] = useState<any>(null);
  const [services, setServices] = useState<ServiceProps[]>([]);
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [userServices, setUserServices] = useState<ServiceProps[]>([]);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingServices, setIsLoadingServices] = useState(false);

  useEffect(() => {
    const getUserData = async (email: string | null) => {
      let user = null;
      const q = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        user = {
          ...doc.data(),
        };
      });

      return user;
    };

    const unsuscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData: UserData | null = await getUserData(user.email);

        if (userData) {
          const userInfo = {
            uid: user.uid,
            displayName: user.displayName,
            ...(userData as Object),
          };

          setUser(userInfo);
        }
      } else {
        setUser(null);
      }
      setIsLoadingAuth(false);
    });

    return () => unsuscribe();
  }, []);

  const signup = (data: SignupProps) => {
    const { email, password } = data;
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const registerUser = (data: UserData) => {
    return addDoc(collection(db, 'users'), data);
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

  const addBarberService = ({ name, value, userId }: BarberServiceProps) => {
    return addDoc(collection(db, 'services'), {
      name,
      value,
      userId,
    });
  };

  const addService = (data: ServiceProps) => {
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

  const getUserServices = async (userId: string) => {
    setIsLoadingServices(true);
    const allServices: ServiceProps[] = [];
    const today = new Date();
    const dateString = today.toLocaleDateString();

    const q = query(
      collection(db, 'barber-services'),
      where('userId', '==', userId || loggedUser.uid),
      where('isDeleted', '==', false),
      where('date', '==', dateString)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const docData = doc.data();

      const item = {
        id: doc.id,
        ...docData,
      } as ServiceProps;

      allServices.push(item);
    });
    setUserServices(allServices);
    setIsLoadingServices(false);
  };

  const getBarberServices = async () => {
    const allServices: ServiceProps[] = [];
    const querySnapshot = await getDocs(collection(db, 'services'));
    querySnapshot.forEach((doc) => {
      const service = {
        id: doc.id,
        ...doc.data(),
      } as ServiceProps;

      allServices.push(service);
    });
    setServices(allServices);
  };

  const deleteBarberService = (id: string) => {
    const docRef = doc(db, 'barber-services', id);
    return updateDoc(docRef, { isDeleted: true });
  };

  const getUsers = async () => {
    const allUsers: UserInfo[] = [];
    const q = query(collection(db, 'users'), where('role', '==', 'barber'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const docData = doc.data();

      const user = {
        ...docData,
        id: doc.id,
      } as UserInfo;

      allUsers.push(user);
    });

    setUsers(allUsers);
  };

  return (
    <AuthContext.Provider
      value={{
        user: loggedUser,
        login,
        logout,
        signup,
        isLoadingAuth,
        isLoadingServices,
        addBarberService,
        getBarberServices,
        addService,
        services,
        getUserServices,
        userServices,
        deleteBarberService,
        getUsers,
        users,
        registerUser,
      }}
    >
      {isLoadingAuth ? null : children}
    </AuthContext.Provider>
  );
};
