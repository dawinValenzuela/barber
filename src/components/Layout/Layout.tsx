import React, { ReactNode } from 'react';
import { Container, Box } from '@chakra-ui/react';
import { Header } from '../Header';
import Head from 'next/head';
import { Navbar } from 'src/components';
import { useSession } from 'next-auth/react';

export const Layout = ({ children }: { children: ReactNode }) => {
  const { data: sessionData, status } = useSession();

  if (status === 'loading') return 'loading...';

  if (!sessionData) return <>{children}</>;

  const userData = sessionData?.user;
  const role = userData?.role;

  return (
    <>
      <Head>
        <title>Palace centro de imagen</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <Container as='section' minH='100%' maxW='container.lg'>
        {children}
        <Box mt={8}>
          <Navbar user={userData} role={role} />
        </Box>
      </Container>
    </>
  );
};
