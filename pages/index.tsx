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

const Home: NextPage = ({ userLogged }) => {
  const [user, setUser] = useState<string>('');
  const [today] = useState(new Date());

  const [dateSelected, setDateSelected] = useState(today.toLocaleDateString());
  const { data: users } = useGetUsersQuery(undefined);
  const { userServices, getUserServices, deleteUserService } = useUsers({
    userId: user,
    dateSelected,
  });

  useEffect(() => {
    if (userLogged.role === 'barber') {
      setUser(userLogged.userId);
      getUserServices({ userId: userLogged.userId, dateSelected });
    }
  }, [userLogged, getUserServices, dateSelected]);

  const handleUserChange = (userId: string) => {
    setUser(userId);
    getUserServices({ userId, dateSelected });
  };

  const handleDateChange = (date: string) => {
    setDateSelected(date);
    getUserServices({ userId: user, dateSelected: date });
  };

  const isArrowDisabled = !user;
  const isAdmin = userLogged.role === 'owner' || userLogged.role === 'admin';

  return (
    <>
      <Resume services={userServices?.data || []} />
      <ServiceList
        services={userServices?.data || []}
        isLoadingServices={userServices?.isLoading}
        getUserServices={getUserServices}
        deleteUserService={deleteUserService}
        isAdmin={isAdmin}
        // user={userData}
        isArrowDisabled={isArrowDisabled}
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
    props: {
      userLogged: {
        ...session?.userData,
      },
    },
  };
}
