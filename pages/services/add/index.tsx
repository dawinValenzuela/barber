import { AddService as AddServiceForm } from 'src/components';
import { getServerSession } from 'next-auth';
import { GetServerSidePropsContext } from 'next';
import { authOptions } from 'pages/api/auth/[...nextauth]';

type AddServiceProps = {
  userLogged: {
    userId: string;
    role: string;
    fullName: string;
    email: string;
    nit: string;
  };
};

function AddService({ userLogged }: AddServiceProps) {
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

  return {
    props: {
      userLogged: {
        ...session?.userData,
      },
    },
  };
}
