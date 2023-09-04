import { AddService as AddServiceForm } from 'src/components';
import { getServerSession } from 'next-auth';
import { GetServerSidePropsContext } from 'next';
import { authOptions } from 'pages/api/auth/[...nextauth]';

function AddService({ userLogged }) {
  return <AddServiceForm userLogged={userLogged} />;
}

export default AddService;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: { destination: '/login' },
    };
  }

  console.log(session);

  return {
    props: {
      userLogged: {
        ...session?.userData,
      },
    },
  };
}
