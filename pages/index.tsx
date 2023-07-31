import { Container } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { ServiceList, Resume, Navbar } from 'src/components';
import { useServices } from 'src/services/useServices';
import { useUsers } from 'src/services/useUsers';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';

const Home: NextPage = () => {
  const { data: sessionData, status: sessionStatus } = useSession();
  const { users, getUsers } = useUsers();
  const { getServices, services, status } = useServices();

  useEffect(() => {
    if (sessionData?.user.data.userId) {
      console.log('entra');
      getServices(sessionData.user.data.userId);
      getUsers();
    }
  }, [getServices, getUsers, sessionData?.user.data.userId]);

  if (sessionStatus === 'loading' || sessionData === null)
    return <div>Loading...</div>;

  const isLoadingServices = status === 'loading';
  const userData = sessionData.user.data;
  const role = userData.role;

  return (
    <>
      <Head>
        <title>Palace centro de imagen</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container as='section' minH='100%'>
        <Resume services={services} />
        <ServiceList
          services={services}
          isLoadingServices={isLoadingServices}
          getUserServices={getServices}
          role={role}
          user={sessionData?.user?.data}
          users={users}
        />
      </Container>
      {/* <Navbar /> */}
    </>
  );
};

export default Home;

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
