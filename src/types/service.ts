export interface Service {
  name: string;
  value: number;
  notes?: string;
  paymentMethod: string;
  createdBy: string;
  createdAt: string;
  date?: string;
  hour?: string;
  isDeleted?: boolean;
}
