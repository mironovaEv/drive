import { configureStore } from '@reduxjs/toolkit';
import { userBlockApi } from '../features/UserBlock/api/userBlockApi';
import { filesApi } from '../pages/Files/api/filesApi';

const mw = [userBlockApi.middleware, filesApi.middleware];
export const store = configureStore({
  reducer: {
    [userBlockApi.reducerPath]: userBlockApi.reducer,
    [filesApi.reducerPath]: filesApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(mw),
});
