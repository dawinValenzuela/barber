import { LoginForm } from 'src/components';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

function Login() {
  const router = useRouter();
  return <LoginForm signIn={signIn} router={router} />;
}

export default Login;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res } = context;
  const session = await getServerSession(req, res);

  if (session) {
    return {
      redirect: { destination: '/' },
    };
  }

  return {
    props: {},
  };
}
