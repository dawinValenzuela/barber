import { NextPage } from "next";
import { Products } from "src/components";
import { ProductList } from "src/components/ProductList";

const SuppliersProductsPage: NextPage = () => {
  return (
    <>
      <Products />
      <ProductList />
    </>
  );
};

export default SuppliersProductsPage;
