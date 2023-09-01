import { useCallback } from 'react';
import { useGetUserServicesQuery, usersApi } from 'src/store/users/slice';
import { useAppSelector, useAppDispatch } from './store';

export const useUsers = () => {
  const dispatch = useAppDispatch();

  const getUserServices = useCallback(
    (params: { userId: string; dateSelected?: string }) => {
      dispatch(usersApi.endpoints.getUserServices.initiate(params));
    },
    [dispatch]
  );

  return {
    userServices: [],
    getUserServices,
  };
};
