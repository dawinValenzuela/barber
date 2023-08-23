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
  const { users, getUsers } = useUsers();
  const { getServices, resetServices, services, status } = useServices();

  useEffect(() => {
    if (sessionData?.user.data.userId) {
      getServices(sessionData.user.data.userId);
      getUsers();
    }
  }, [getServices, getUsers, sessionData?.user.data.userId]);

  useEffect(() => {
    return () => {
      resetServices();
    };
  }, [resetServices]);

  if (sessionStatus === 'loading' || sessionData === null)
    return <div>Loading...</div>;

  const isLoadingServices = status === 'loading';
  const userData = sessionData.user.data;
  const role = userData.role;

  return (
    <>
      <Resume services={services} />
      <ServiceList
        services={services}
        isLoadingServices={isLoadingServices}
        getUserServices={getServices}
        role={role}
        user={sessionData?.user?.data}
        users={users}
      />
      <Navbar user={sessionData?.user?.data} role={role} />
    </>
  );
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res } = context;

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
