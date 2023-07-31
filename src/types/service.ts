export interface Service {
  name: string;
  value: number;
  notes?: string;
  paymentMethod: string;
  createdBy: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  date?: string;
  hour?: string;
  isDeleted?: boolean;
}
