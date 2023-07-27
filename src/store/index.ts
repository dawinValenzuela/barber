import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import servicesReducer from './services/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: servicesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
