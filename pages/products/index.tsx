import { NextPage } from 'next';
import { ProductList } from 'src/components';
import { getServerSession } from 'next-auth';

const ProductsPage: NextPage = () => {
  return (
    <>
      {/* <Products /> */}
      <ProductList />
    </>
  );
};

export default ProductsPage;

export async function getServerSideProps(context) {
  const { req, res } = context;
  const session = await getServerSession(req, res);

  if (!session) {
    return {
      redirect: { destination: '/login' },
    };
  }

  return {
    props: {},
  };
}
