import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { ServiceList, Resume, Navbar } from 'src/components';
import { useServices } from 'src/services/useServices';
import { getServerSession } from 'next-auth';
import { GetServerSidePropsContext, GetStaticProps } from 'next';
import { auth } from '../firebase/config';
import { getAuth } from 'firebase/auth';
import WithPrivateRoute from 'src/hoc/WithPrivateRoute';
import { useAuth } from 'src/services/useAuth';
import { useGetUsersQuery } from 'src/store/users/slice';
import { useGetUserServicesQuery } from 'src/store/users/slice';

type HomeProps = {
  Auth: typeof WithPrivateRoute;
};

const Home: NextPage & HomeProps = () => {
  // const { data: sessionData, status: sessionStatus } = useSession();
  // const { users } = useUsers();
  // const { getServices, resetServices, services, status } = useServices();

  const [user, setUser] = useState();
  const [today] = useState(new Date());
  const [dateString, setDateString] = useState(today.toLocaleDateString());
  const { data: users } = useGetUsersQuery(undefined);
  const { data: userServices } = useGetUserServicesQuery({
    userId: user,
    date: dateString,
  });

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
        setUser={setUser}
        setDateString={setDateString}
        dateString={dateString}
        today={today}
        users={users}
        userSelected={user}
      />
    </>
  );
};

export default Home;

Home.Auth = WithPrivateRoute;
