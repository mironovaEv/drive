import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../../../shared/api/query';
import { IFile, IFolder, IRootDir } from './types';

export const filesApi = createApi({
  reducerPath: 'filesApi',
  baseQuery: axiosBaseQuery('/api/drive'),
  tagTypes: ['Files', 'Trash'],
  endpoints: builder => ({
    getFiles: builder.query<IFile[], unknown>({
      query: params => ({
        url: '/files',
        method: 'get',
        params,
      }),
      providesTags: ['Files', 'Trash'],
    }),
    createFolder: builder.mutation<undefined, IFolder>({
      query: data => ({
        url: '/files/create/folder',
        method: 'post',
        data,
      }),
      invalidatesTags: ['Files', 'Trash'],
    }),
    getRootDir: builder.query<IRootDir, unknown>({
      query: params => ({
        url: '/files/get/root',
        method: 'get',
        params,
      }),
      providesTags: ['Files', 'Trash'],
    }),
    getDir: builder.query<IRootDir, string | undefined>({
      query: params => ({
        url: `/files/get/${params}`,
        method: 'get',
        params,
      }),
      providesTags: ['Files', 'Trash'],
    }),
    deleteFiles: builder.mutation<undefined, string[]>({
      query: data => ({
        url: '/files/trash',
        method: 'post',
        data,
      }),
      invalidatesTags: ['Files', 'Trash'],
    }),
    emptyTrash: builder.mutation<undefined, undefined>({
      query: () => ({
        url: '/files/trash',
        method: 'delete',
      }),
      invalidatesTags: ['Files', 'Trash'],
    }),
    untrash: builder.mutation<undefined, string[]>({
      query: data => ({
        url: '/files/untrash',
        method: 'post',
        data,
      }),
      invalidatesTags: ['Trash', 'Files'],
    }),
  }),
});

export const {
  useGetFilesQuery,
  useCreateFolderMutation,
  useGetRootDirQuery,
  useGetDirQuery,
  useDeleteFilesMutation,
  useEmptyTrashMutation,
  useUntrashMutation,
} = filesApi;
