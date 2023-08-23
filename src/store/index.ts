import { configureStore } from '@reduxjs/toolkit';
import authReducer, { userApi } from './auth/slice';
import servicesReducer, { servicesApi } from './services/slice';
import productsReducer from './products/slice';
import { outputsApi } from './outputs/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: servicesReducer,
    products: productsReducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
    [outputsApi.reducerPath]: outputsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      servicesApi.middleware,
      outputsApi.middleware,
      userApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
