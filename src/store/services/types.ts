import { RequestStatus } from 'src/types/global';

export interface Service {
  name: string;
  value: number;
  notes?: string;
  paymentMethod: string;
  createdBy: string;
  createdAt?: string;
  date?: string;
  hour?: string;
  isDeleted?: boolean;
}

export interface ServiceState extends Service {
  id: string;
}

export interface ServicesState {
  services: ServiceState[];
  status: RequestStatus;
  error: string | null | undefined;
}
