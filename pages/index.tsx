import type { NextPage } from 'next';
import { useEffect } from 'react';
import { ServiceList, Resume, Navbar } from 'src/components';
import { useServices } from 'src/services/useServices';
import { useUsers } from 'src/services/useUsers';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import { authOptions } from 'pages/api/auth/[...nextauth]';

const Home: NextPage = () => {
  const { data: sessionData, status: sessionStatus } = useSession();
  const { users } = useUsers();
  const { getServices, resetServices, services, status } = useServices();

  const { user } = sessionData || {};

  useEffect(() => {
    if (user?.userId) {
      getServices(user.userId);
    }
  }, [getServices, user?.userId]);

  useEffect(() => {
    return () => {
      resetServices();
    };
  }, [resetServices]);

  if (sessionStatus === 'loading' || sessionData === null)
    return <div>Loading...</div>;

  const isLoadingServices = status === 'loading';
  const userData = sessionData.user;
  const role = userData.role;

  return (
    <>
      <Resume services={services} />
      <ServiceList
        services={services}
        isLoadingServices={isLoadingServices}
        getUserServices={getServices}
        role={role}
        user={userData}
        users={users}
      />
    </>
  );
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  console.log('server session', session);

  if (!session) {
    return {
      redirect: { destination: '/login' },
    };
  }

  return {
    props: {},
  };
}
