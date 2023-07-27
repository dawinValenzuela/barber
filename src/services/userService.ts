import { useAppSelector, useAppDispatch } from './store';
import { loginUser, logoutUser, checkAuthState } from 'src/store/auth/actions';
import { useEffect, useCallback } from 'react';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, status, error } = useAppSelector((state) => state.auth);

  const memoizedDispatch = useCallback(dispatch, [dispatch]);

  useEffect(() => {
    if (!user) {
      memoizedDispatch(checkAuthState());
    }
  }, [memoizedDispatch, user]);

  const handleLogin = (userCredentials: {
    email: string;
    password: string;
  }) => {
    dispatch(loginUser(userCredentials));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return {
    user,
    status,
    error,
    handleLogin,
    handleLogout,
  };
};
