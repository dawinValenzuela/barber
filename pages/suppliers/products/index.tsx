import { NextPage } from "next";
import { Products, ProductList } from "src/components";

const SuppliersProductsPage: NextPage = () => {
  return (
    <>
      <Products />
      <ProductList />
    </>
  );
};

export default SuppliersProductsPage;
