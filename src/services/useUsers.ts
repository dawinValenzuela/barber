import { useAppSelector, useAppDispatch } from './store';
import {
  loginUser,
  logoutUser,
  checkAuthState,
  fetchUsers,
} from 'src/store/auth/actions';
import { useEffect, useCallback } from 'react';

export const useUsers = () => {
  const dispatch = useAppDispatch();
  const { user, users, status, error } = useAppSelector((state) => state.auth);

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

  const getUsers = useCallback(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return {
    user,
    users,
    status,
    error,
    handleLogin,
    handleLogout,
    getUsers,
  };
};
