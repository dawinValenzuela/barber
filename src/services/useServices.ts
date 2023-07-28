import { useAppSelector, useAppDispatch } from './store';
import { fetchServices } from 'src/store/services/actions';
import { useCallback } from 'react';

export const useServices = () => {
  const dispatch = useAppDispatch();
  const { services, status, error } = useAppSelector((state) => state.services);

  const getServices = useCallback(
    (userId: string, date?: string) => {
      console.log('getServices', userId, date);
      dispatch(fetchServices({ userId, date }));
    },
    [dispatch]
  );

  return {
    services,
    status,
    error,
    getServices,
  };
};
