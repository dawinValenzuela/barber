import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import servicesReducer, { servicesApi } from './services/slice';
import productsReducer from './products/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: servicesReducer,
    products: productsReducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(servicesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
