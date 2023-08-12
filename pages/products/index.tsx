import { useEffect } from 'react';
import { NextPage } from 'next';
import { ProductList } from 'src/components';
import { useProducts } from 'src/services/useProducts';

const ProductsPage: NextPage = () => {
  const { products, getProducts } = useProducts();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <>
      {/* <Products /> */}
      <ProductList products={products} />
    </>
  );
};

export default ProductsPage;
