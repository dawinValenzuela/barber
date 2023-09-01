import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { ServiceList, Resume, Navbar } from 'src/components';
import { useServices } from 'src/services/useServices';
import { getServerSession } from 'next-auth';
import { GetServerSidePropsContext, GetStaticProps } from 'next';
import { auth } from '../firebase/config';
import { getAuth } from 'firebase/auth';
import { useAuth } from 'src/services/useAuth';
import { useGetUsersQuery } from 'src/store/users/slice';
import { useUsers } from 'src/services/useUsers';
import { authOptions } from 'pages/api/auth/[...nextauth]';

const Home: NextPage = () => {
  // const { data: sessionData, status: sessionStatus } = useSession();
  // const { users } = useUsers();
  // const { getServices, resetServices, services, status } = useServices();

  const [user, setUser] = useState<string>('');
  const [today] = useState(new Date());
  //DD/MM/YYYY
  const [dateSelected, setDateSelected] = useState(today.toLocaleDateString());
  const { data: users } = useGetUsersQuery(undefined);
  const { userServices, getUserServices } = useUsers();

  const handleUserChange = (userId: string) => {
    setUser(userId);
    getUserServices({ userId, dateSelected });
  };

  const handleDateChange = (date: string) => {
    setDateSelected(date);
    getUserServices({ userId: user, dateSelected: date });
  };

  // const { data: userServices } = useGetUserServicesQuery({
  //   userId: user,
  //   date: dateString,
  // });

  // const { user } = sessionData || {};

  // useEffect(() => {
  //   if (user?.userId) {
  //     getServices(user.userId);
  //   }
  // }, [getServices, user?.userId]);

  // useEffect(() => {
  //   return () => {
  //     resetServices();
  //   };
  // }, [resetServices]);

  // if (sessionStatus === 'loading' || sessionData === null)
  //   return <div>Loading...</div>;

  // const isLoadingServices = status === 'loading';
  // const userData = sessionData.user;
  // const role = userData.role;

  return (
    <>
      <h1>home</h1>
      <Resume services={userServices} />
      <ServiceList
        services={userServices}
        // isLoadingServices={isLoadingServices}
        // getUserServices={getServices}
        // role={role}
        // user={userData}
        setUser={handleUserChange}
        setDateString={handleDateChange}
        dateString={dateSelected}
        today={today}
        users={users}
        userSelected={user}
      />
    </>
  );
};

export default Home;

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
