import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';

import { ResumeInfo } from 'src/components';

function Resume({ userLogged }) {
  return <ResumeInfo session={userLogged} />;
}

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

export default Resume;
