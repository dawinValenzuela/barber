import { useAuth } from 'src/services/useAuth';

const WithPrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  // add user to the children component props
  const newProps = { ...children.props, user };
  children = { ...children, props: newProps };
  return children;
};

export default WithPrivateRoute;
