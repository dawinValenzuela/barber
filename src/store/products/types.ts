import { RequestStatus } from 'src/types/global';
import { Product, Supplier, Category } from 'src/types/product';

export interface ProductsState {
  products: Product[];
  suppliers: Supplier[];
  status: RequestStatus;
  error: string | null | undefined;
}
