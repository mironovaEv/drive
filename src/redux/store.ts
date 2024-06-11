import { configureStore } from '@reduxjs/toolkit';

import { authApi } from '../pages/Login/authApi';

const mw = [authApi.middleware];
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(mw),
});
