import { configureStore } from '@reduxjs/toolkit';
import { userBlockApi } from '../features/UserBlock/api/userBlockApi';

const mw = [userBlockApi.middleware];
export const store = configureStore({
  reducer: {
    [userBlockApi.reducerPath]: userBlockApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(mw),
});
