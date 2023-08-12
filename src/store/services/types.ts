import { RequestStatus } from 'src/types/global';
import { Service } from 'src/types/service';

export interface ServiceState extends Service {
  id: string;
  userId: string;
  date: string;
}

export interface ServicesState {
  services: ServiceState[];
  reportServices: {
    services: ServiceState[];
    total: number;
  };
  status: RequestStatus;
  error: string | null | undefined;
}
