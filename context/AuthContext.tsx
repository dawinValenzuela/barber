import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
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
  Query,
  QuerySnapshot,
  DocumentData,
  QueryDocumentSnapshot,
  DocumentReference,
} from 'firebase/firestore';
import { AuthContextProviderProps } from './types';
import {
  UserInfo,
  SignupProps,
  ServiceProps,
  BarberServiceProps,
  UserData,
  Output,
  Suplier,
} from '../types';

import { auth, db } from '../firebase/config';

const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [loggedUser, setUser] = useState<any>(null);
  const [resumeServices, setResumeServices] = useState<ServiceProps[]>([]);
  const [reportServices, setReportServices] = useState<ServiceProps[]>([]);
  const [services, setServices] = useState<ServiceProps[]>([]);
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [userServices, setUserServices] = useState<ServiceProps[]>([]);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingServices, setIsLoadingServices] = useState(false);
  const [outputs, setOutputs] = useState<Output[]>([]);

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

  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
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

  const addOutputPayment = (data) => {
    const today = new Date();

    const newOutput = {
      ...data,
      createdAt: today,
      isDeleted: false,
    };

    return addDoc(collection(db, 'outputs'), {
      ...newOutput,
    });
  };

  const getUserServices = async (userId: string, date: string) => {
    setIsLoadingServices(true);
    const allServices: ServiceProps[] = [];

    let dateString = '';

    console.log(date, 'date');

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

    const lastDay = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );
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

  const getAllServices = async (
    initialDate: string = '',
    endDate: string = ''
  ) => {
    const allServices: ServiceProps[] = [];

    let firstDay: Date;
    let lastDay: Date;

    if (initialDate && endDate) {
      firstDay = new Date(initialDate);
      firstDay.setHours(0, 0, 0, 0);

      lastDay = new Date(endDate);
      lastDay.setHours(23, 59, 59, 999);
    } else {
      const now = new Date();
      console.log(typeof now, 'type');
      firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      lastDay = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
      );
    }

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

  const getAllOutputs = async (
    initialDate: string = '',
    endDate: string = ''
  ): Promise<void> => {
    const allOutputs: Array<Output> = [];

    let firstDay: Date;
    let lastDay: Date;

    if (initialDate && endDate) {
      firstDay = new Date(initialDate);
      firstDay.setHours(0, 0, 0, 0);

      lastDay = new Date(endDate);
      lastDay.setHours(23, 59, 59, 999);
    } else {
      const now = new Date();
      firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      lastDay = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
      );
    }

    const q: Query = query(
      collection(db, 'outputs'),
      where('createdAt', '>=', firstDay),
      where('createdAt', '<=', lastDay)
    );

    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

    querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
      const docData: DocumentData = doc.data();

      const output = {
        ...docData,
        id: doc.id,
      } as Output;

      allOutputs.push(output);
    });

    setOutputs(allOutputs);
  };

  const addSupplier = (
    data: Suplier
  ): Promise<DocumentReference<DocumentData>> => {
    const today: Date = new Date();

    return addDoc(collection(db, 'suppliers'), {
      ...data,
      createdAt: today,
      userId: loggedUser.uid,
    });
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
        resetPassword,
        addOutputPayment,
        getAllOutputs,
        outputs,
      }}
    >
      {isLoadingAuth ? null : children}
    </AuthContext.Provider>
  );
};
