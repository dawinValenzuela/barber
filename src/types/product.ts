export enum Category {
  MECATO = 'mecato',
  BEBIDAS = 'bebidas',
}

export interface Product {
  id: string;
  name: string;
  value: number;
  suplierId: string;
  category?: string;
  createdAt: string;
  supplier: {
    name: string;
  };
}

export interface Supplier {
  name: string;
  id: string;
  createdAt: string;
}
