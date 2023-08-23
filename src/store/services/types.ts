import { RequestStatus } from 'src/types/global';
import { Service } from 'src/types/service';

export interface ServiceState extends Service {
  id: string;
  userId: string;
  date: string;
  user?: string;
}

export interface ServicesState {
  services: ServiceState[];
  barberServices: BarberService[];
  reportServices: {
    services: ServiceState[];
    total: number;
  };
  status: RequestStatus;
  error: string | null | undefined;
}

export interface BarberService {
  id: string;
  name: string;
  value: number;
}
