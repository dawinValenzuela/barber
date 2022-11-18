import { UserCredential } from 'firebase/auth';
import { DocumentData, DocumentReference } from 'firebase/firestore';
import { ProductFormData, SupplierFormData } from 'src/components';
export interface SignupProps {
  email: string;
  password: string;
}

export interface LoggedUser {
  uid: string;
  userId: string;
  email: string;
  displayName: string | null;
  role: ROLE;
  fullName?: string;
}

export enum ROLE {
  ADMIN = 'admin',
  OWNER = 'owner',
  BARBER = 'barber',
}

export interface UserData {
  email: string;
  fullName: string;
  role: ROLE;
  userId: string;
  phone?: string;
}

export interface UserInfo {
  id: string;
  email: string;
  fullName: string;
  role: ROLE;
  userId: string;
}

export interface BarberServiceProps {
  name: string;
  value: number;
  userId: string;
}

export interface ServiceProps {
  id: string;
  serviceId: string;
  name: string;
  value: number;
  userId: string;
  notes?: string;
  paymentMethod: string;
  createdBy: string;
  createdAt?: string;
  date?: string;
  hour?: string;
  isDeleted?: boolean;
}

export interface Supplier {
  id: string;
  name: string;
  userId: string;
  createdAt?: string;
}

export interface Product {
  id: string;
  name: string;
  value: number;
  userId: string;
  createdAt?: string;
  supplierId?: string;
}

export type PromiseDocumentData = Promise<DocumentReference<DocumentData>>;

export interface AppContextProps {
  user: LoggedUser;
  addSupplier: (data: SupplierFormData) => PromiseDocumentData;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => void;
  signup: (data: SignupProps) => Promise<UserCredential>;
  isLoadingAuth: boolean;
  isLoadingServices: boolean;
  addBarberService: (data: BarberServiceProps) => PromiseDocumentData;
  getBarberServices: () => Promise<void>;
  addService: (data: ServiceProps) => PromiseDocumentData;
  services: ServiceProps[];
  getUserServices: (userId: string, date: string) => Promise<void>;
  userServices: ServiceProps[];
  deleteBarberService: (id: string) => Promise<void>;
  getUsers: () => Promise<void>;
  users: UserInfo[];
  registerUser: (data: UserData) => PromiseDocumentData;
  getResumeUserInfo: (userId: string) => Promise<void>;
  resumeServices: ServiceProps[];
  reportServices: ServiceProps[];
  getAllServices: () => Promise<void>;
  getSuppliers: () => Promise<void>;
  suppliers: Supplier[];
  addProduct: (data: ProductFormData) => PromiseDocumentData;
  getProducts: () => Promise<void>;
  products: Product[];
}
