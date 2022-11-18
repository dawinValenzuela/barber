export interface SupplierFormData {
  name: string;
}

export interface ProductFormData {
  supplierId: string;
  name: string;
  value: string;
}

export interface ProductInventoryFormData {
  productId: string;
  value: string;
}
