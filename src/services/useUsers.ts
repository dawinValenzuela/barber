import { useCallback } from 'react';
import { usersApi, useDeleteUserServiceMutation } from 'src/store/users/slice';
import { useAppSelector, useAppDispatch } from './store';

export const useUsers = ({ userId, dateSelected }) => {
  const dispatch = useAppDispatch();
  const [deleteUserService] = useDeleteUserServiceMutation();

  const selectUserServicesResult = usersApi.endpoints.getUserServices.select({
    userId,
    dateSelected,
  });

  const userServices = useAppSelector(selectUserServicesResult);

  const getUserServices = useCallback(
    (params: { userId: string; dateSelected?: string }) => {
      dispatch(usersApi.endpoints.getUserServices.initiate(params));
    },
    [dispatch]
  );

  return {
    userServices,
    getUserServices,
    deleteUserService,
  };
};
