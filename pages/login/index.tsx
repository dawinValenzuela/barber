import { LoginForm } from 'src/components';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

function Login() {
  const router = useRouter();

  return <LoginForm signIn={signIn} router={router} />;
}

export default Login;
