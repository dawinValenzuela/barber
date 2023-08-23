import { useAppSelector, useAppDispatch } from './store';
import { fetchUsers } from 'src/store/auth/actions';
import { useCallback } from 'react';

export const useUsers = () => {
  const dispatch = useAppDispatch();
  const { users, status, error } = useAppSelector((state) => state.auth);

  const getUsers = useCallback(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return {
    users,
    status,
    error,
    getUsers,
  };
};
