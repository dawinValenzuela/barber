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
  DocumentReference,
  DocumentData,
} from 'firebase/firestore';
import { AuthContextProviderProps } from './types';
import {
  UserInfo,
  SignupProps,
  ServiceProps,
  BarberServiceProps,
  UserData,
  Supplier,
  AppContextProps,
} from '../types';

import { auth, db } from '../firebase/config';
import { SupplierFormData } from 'src/components';

const AuthContext = createContext<AppContextProps>({} as AppContextProps);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [loggedUser, setUser] = useState<any>(null);
  const [resumeServices, setResumeServices] = useState<ServiceProps[]>([]);
  const [reportServices, setReportServices] = useState<ServiceProps[]>([]);
  const [services, setServices] = useState<ServiceProps[]>([]);
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [userServices, setUserServices] = useState<ServiceProps[]>([]);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);
  const [isLoadingServices, setIsLoadingServices] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  console.log('loggedUser', loggedUser);

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
    const dateSelected = data?.createdAt && new Date(data.createdAt);

    const newService = {
      ...data,
      value: Number(data.value),
      createdAt: dateSelected ? dateSelected : today,
      date: dateSelected
        ? dateSelected.toLocaleDateString()
        : today.toLocaleDateString(),
      hour: dateSelected
        ? dateSelected.toLocaleTimeString()
        : today.toLocaleTimeString(),
      isDeleted: false,
    };

    return addDoc(collection(db, 'barber-services'), {
      ...newService,
    });
  };

  const getUserServices = async (userId: string, date: string) => {
    setIsLoadingServices(true);
    const allServices: ServiceProps[] = [];

    let dateString = '';

    if (date) {
      dateString = date;
    } else {
      const today = new Date();
      dateString = today.toLocaleDateString();
    }

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

  const getResumeUserInfo = async (userId: string) => {
    const allServices: ServiceProps[] = [];
    const now = new Date();

    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    // console.log(firstDay);

    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    // console.log(lastDay);

    const q = query(
      collection(db, 'barber-services'),
      where('createdAt', '>=', firstDay),
      where('createdAt', '<=', lastDay),
      where('isDeleted', '==', false),
      where('userId', '==', userId || loggedUser.uid)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const docData = doc.data();

      const service = {
        ...docData,
        id: doc.id,
      } as ServiceProps;

      allServices.push(service);
    });

    setResumeServices(allServices);
  };

  const getAllServices = async () => {
    const allServices: ServiceProps[] = [];

    const now = new Date();

    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    // console.log(firstDay);

    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    // console.log(lastDay);

    const q = query(
      collection(db, 'barber-services'),
      where('createdAt', '>=', firstDay),
      where('createdAt', '<=', lastDay),
      where('isDeleted', '==', false)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const docData = doc.data();

      const service = {
        ...docData,
        id: doc.id,
      } as ServiceProps;

      allServices.push(service);
    });

    setReportServices(allServices);
  };

  const addSupplier = (
    data: SupplierFormData
  ): Promise<DocumentReference<DocumentData>> => {
    const today = new Date();

    return addDoc(collection(db, 'suppliers'), {
      ...data,
      createdAt: today,
      userId: loggedUser.uid,
    });
  };

  const getSuppliers = async () => {
    const allSuppliers: Supplier[] = [];
    const querySnapshot = await getDocs(collection(db, 'suppliers'));
    querySnapshot.forEach((doc) => {
      const item = {
        id: doc.id,
        ...doc.data(),
      } as Supplier;

      allSuppliers.push(item);
    });
    setSuppliers(allSuppliers);
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
        getResumeUserInfo,
        resumeServices,
        reportServices,
        getAllServices,
        addSupplier,
        getSuppliers,
        suppliers,
      }}
    >
      {isLoadingAuth ? null : children}
    </AuthContext.Provider>
  );
};
