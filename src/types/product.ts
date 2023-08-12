export enum Category {
  MECATO = 'mecato',
  BEBIDAS = 'bebidas',
}

export interface Product {
  name: string;
  value: number;
  suplierId: string;
  category: string;
}

export interface Supplier {
  name: string;
  id: string;
}
