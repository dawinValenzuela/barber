import { useEffect } from 'react';
import { LoginForm } from 'src/components';
// import { useAuth } from 'context/AuthContext';
import { useRouter } from 'next/router';

import { useAuth } from 'src/services/useUsers';

function Login() {
  const { user } = useAuth();
  const router = useRouter();

  console.log('user', user);

  useEffect(() => {
    if (user?.id) {
      router.replace('/');
    }
  }, [user, router]);

  return !user && <LoginForm />;
}

export default Login;
