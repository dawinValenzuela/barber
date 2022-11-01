export interface SignupProps {
  email: string;
  password: string;
}

export interface User {
  email: string;
  uid: string;
  displayName: string;
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
  id?: string;
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
