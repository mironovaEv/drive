import { configureStore } from '@reduxjs/toolkit';
import { userBlockApi } from '../features/UserBlock/api/userBlockApi';
import { filesApi } from '../pages/Files/api/filesApi';
import { trashApi } from '../pages/Trash/api/trashApi';
import globalSlice from './reducers/globalSlice';

const mw = [userBlockApi.middleware, filesApi.middleware, trashApi.middleware];
export const store = configureStore({
  reducer: {
    [userBlockApi.reducerPath]: userBlockApi.reducer,
    [filesApi.reducerPath]: filesApi.reducer,
    [trashApi.reducerPath]: trashApi.reducer,
    global: globalSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(mw),
});
