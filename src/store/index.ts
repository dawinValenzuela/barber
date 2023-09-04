import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from './users/slice';
import servicesReducer, { servicesApi } from './services/slice';
import productsReducer, { productsApi } from './products/slice';
import { outputsApi } from './outputs/slice';

export const store = configureStore({
  reducer: {
    services: servicesReducer,
    products: productsReducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
    [outputsApi.reducerPath]: outputsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      servicesApi.middleware,
      outputsApi.middleware,
      usersApi.middleware,
      productsApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
