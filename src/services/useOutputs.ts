import { useCreateOutputMutation, outputsApi } from 'src/store/outputs/slice';
import { useAppSelector, useAppDispatch } from './store';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

export const useOutputs = () => {
  const dispatch = useAppDispatch();
  const [createOutput] = useCreateOutputMutation();

  const selectOutputs = outputsApi.endpoints.getOutputs.select(undefined);
  const outputsData = useAppSelector((state) => selectOutputs(state));

  const getOutputs = useCallback(
    (month?: number) => {
      dispatch(outputsApi.endpoints.getOutputs.initiate(month));
    },
    [dispatch]
  );

  return {
    createOutput,
    getOutputs,
  };
};
