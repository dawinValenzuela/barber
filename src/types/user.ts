export interface User {
  email: string;
  nit: string;
  fullName?: string;
  role: string;
  phone?: string;
  userId: string; //TODO why is this here?
}
