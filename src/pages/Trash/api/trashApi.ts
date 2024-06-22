/* eslint-disable no-empty-pattern */
import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../../../shared/api/query';

export const trashApi = createApi({
  reducerPath: 'trashApi',
  baseQuery: axiosBaseQuery('/api/drive'),
  tagTypes: ['Trash', 'Files'],
  endpoints: () => ({}),
});

export const {} = trashApi;
