import { LoginForm } from 'src/components';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { GetServerSidePropsContext } from 'next';
import { authOptions } from 'pages/api/auth/[...nextauth]';

function Login() {
  const router = useRouter();
  return <LoginForm signIn={signIn} router={router} />;
}

export default Login;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: { destination: '/' },
    };
  }

  return {
    props: {},
  };
}
