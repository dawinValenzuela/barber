export interface Option {
  id: string;
  name: string;
}

export interface Service extends Option {
  value: number;
}

export interface FormData {
  serviceId: string;
  name: string;
  value: number;
  userId: string;
  createdBy: string;
  notes?: string;
  paymentMethod: string;
}

export interface User {
  userId: string;
  fullName: string;
}
