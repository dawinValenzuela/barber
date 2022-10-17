import { useEffect } from 'react';
import { CenteredSpinner, LoginForm } from 'src/components';
import { useAuth } from 'context/AuthContext';
import { useRouter } from 'next/router';

function Login() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.uid) {
      router.replace('/');
    }
  }, [user, router]);

  return !user && <LoginForm />;
}

export default Login;
