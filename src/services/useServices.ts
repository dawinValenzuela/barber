import { useAppSelector, useAppDispatch } from './store';
import { fetchServices, fetchAllServices } from 'src/store/services/actions';
import { useCallback } from 'react';
import { clearServices } from 'src/store/services/slice';

export const useServices = () => {
  const dispatch = useAppDispatch();
  const { services, status, error, reportServices } = useAppSelector(
    (state) => state.services
  );

  const getServices = useCallback(
    (userId: string, date?: string) => {
      dispatch(fetchServices({ userId, date }));
    },
    [dispatch]
  );

  const getReportServices = useCallback(
    (month?: number) => {
      dispatch(fetchAllServices({ month }));
    },
    [dispatch]
  );

  const resetServices = useCallback(() => {
    dispatch(clearServices());
  }, [dispatch]);

  return {
    services,
    status,
    error,
    reportServices,
    getServices,
    resetServices,
    getReportServices,
  };
};
