import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../../../shared/api/query';
import { IFile } from './types';

export const filesApi = createApi({
  reducerPath: 'filesApi',
  baseQuery: axiosBaseQuery('/api/drive'),
  tagTypes: ['Files'],
  endpoints: builder => ({
    getFiles: builder.query<IFile[], unknown>({
      query: params => ({
        url: '/files',
        method: 'get',
        params,
      }),
      providesTags: ['Files'],
    }),
  }),
});

export const { useGetFilesQuery } = filesApi;
