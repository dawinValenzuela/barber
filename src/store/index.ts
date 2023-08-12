import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import servicesReducer from './services/slice';
import productsReducer from './products/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: servicesReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
