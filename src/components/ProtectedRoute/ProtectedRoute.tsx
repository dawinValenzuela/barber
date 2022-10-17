import React, { useEffect } from 'react';
import { useAuth } from 'context/AuthContext';
import { useRouter } from 'next/router';
import { CenteredSpinner } from '../CenteredSpiner';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user, router, isLoading]);

  return <>{user ? children : <CenteredSpinner />}</>;
};
