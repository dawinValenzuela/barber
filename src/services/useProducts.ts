import { useAppSelector, useAppDispatch } from './store';
import { fetchProducts } from 'src/store/products/actions';
import { useCallback } from 'react';
import { clearProducts } from 'src/store/products/slice';

export const useProducts = () => {
  const dispatch = useAppDispatch();
  const { products, status, error } = useAppSelector((state) => state.products);

  const getProducts = useCallback(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const resetProducts = useCallback(() => {
    dispatch(clearProducts());
  }, [dispatch]);

  return {
    products,
    status,
    error,
    getProducts,
    resetProducts,
  };
};
