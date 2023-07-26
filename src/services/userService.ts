import { useSelector, useDispatch } from 'react-redux';
import { useAppSelector, useAppDispatch } from './store';
// import { loginUser, logoutUser } from '../store/actions/authActions';
import { loginUser } from '../store/auth/slice';

// Define the shape of your state
interface State {
  auth: {
    user: any;
    isLoggedIn: boolean;
  };
}

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, status, error } = useAppSelector((state) => state.auth);

  const handleLogin = (userCredentials: {
    email: string;
    password: string;
  }) => {
    dispatch(loginUser(userCredentials));
  };

  const handleLogout = () => {
    // dispatch(logoutUser());
  };

  console.log({ user, error });

  return {
    user,
    status,
    error,
    handleLogin,
    handleLogout,
  };
};
