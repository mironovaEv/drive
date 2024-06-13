import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../../../shared/api/query';
import { IFile, IFolder, IRootDir } from './types';

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
    createFolder: builder.mutation<undefined, IFolder>({
      query: data => ({
        url: '/files/create/folder',
        method: 'post',
        data,
      }),
      invalidatesTags: ['Files'],
    }),
    getRootDir: builder.query<IRootDir, unknown>({
      query: params => ({
        url: '/files/get/root',
        method: 'get',
        params,
      }),
      providesTags: ['Files'],
    }),
  }),
});

export const { useGetFilesQuery, useCreateFolderMutation, useGetRootDirQuery } = filesApi;
