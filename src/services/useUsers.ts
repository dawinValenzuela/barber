import { useCallback } from 'react';
import { useGetUserServicesQuery, usersApi } from 'src/store/users/slice';
import { useAppSelector, useAppDispatch } from './store';
import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';

export const useUsers = ({ userId, dateSelected }) => {
  const dispatch = useAppDispatch();

  const selectUserServicesResult = usersApi.endpoints.getUserServices.select({
    userId,
    dateSelected,
  });

  const userServices = useAppSelector(selectUserServicesResult);

  // console.log({ selectUserServicesResult });

  const getUserServices = useCallback(
    (params: { userId: string; dateSelected?: string }) => {
      dispatch(usersApi.endpoints.getUserServices.initiate(params));
    },
    [dispatch]
  );

  return {
    userServices,
    getUserServices,
  };
};
