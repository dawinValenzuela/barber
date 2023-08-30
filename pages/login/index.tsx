import { LoginForm } from 'src/components';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { useAuth } from 'src/services/useAuth';
import { auth } from '../../firebase/config';

function Login() {
  const router = useRouter();
  const { signIn } = useAuth();

  return <LoginForm signIn={signIn} router={router} />;
}

export default Login;
