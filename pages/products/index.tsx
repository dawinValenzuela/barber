import { useEffect } from 'react';
import { NextPage } from 'next';
import { ProductList } from 'src/components';
import { useProducts } from 'src/services/useProducts';
import { getServerSession } from 'next-auth';
import { GetServerSidePropsContext } from 'next';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { useGetProductsQuery } from 'src/store/products/slice';

const ProductsPage: NextPage = () => {
  const { data: products } = useGetProductsQuery(undefined);

  return <ProductList products={products} />;
};

export default ProductsPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: { destination: '/login' },
    };
  }

  return {
    props: {},
  };
}
