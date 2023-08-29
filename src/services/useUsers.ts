import { useAppSelector, useAppDispatch } from './store';
import { fetchUsers } from 'src/store/auth/actions';
import { useCallback } from 'react';
import { useGetUsersQuery } from 'src/store/auth/slice';

export const useUsers = () => {
  const dispatch = useAppDispatch();
  // const { users, status, error } = useAppSelector((state) => state.auth);

  const { data: users } = useGetUsersQuery();

  // const getUsers = useCallback(() => {
  //   dispatch(fetchUsers());
  // }, [dispatch]);

  return {
    users,
  };
};
