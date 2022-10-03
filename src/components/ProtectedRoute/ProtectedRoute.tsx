import React, { useEffect } from 'react';
import { useAuth } from 'context/AuthContext';
import { useRouter } from 'next/router';
import { Spinner, Flex } from '@chakra-ui/react';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading) {
      router.replace('/login');
    }
  }, [user, router]);

  return (
    <>
      {user ? (
        children
      ) : (
        <Flex flex={1}>
          <Spinner />
        </Flex>
      )}
    </>
  );
};
