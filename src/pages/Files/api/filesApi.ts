import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../../../shared/api/query';
import {
  IComment,
  ICreaateReply,
  ICreateComment,
  ICreatePermission,
  IEditComment,
  IEditPermission,
  IEditReply,
  IFile,
  IFolder,
  IRevision,
  IRootDir,
} from './types';
import axios from 'axios';
import { setUploadProgress } from '../../../redux/reducers/globalSlice';

export const filesApi = createApi({
  reducerPath: 'filesApi',
  baseQuery: axiosBaseQuery('/api/drive'),
  tagTypes: ['Files', 'Trash', 'Changes', 'Permission', 'Comments'],
  endpoints: builder => ({
    getFiles: builder.query<IFile[], { trashed: string }>({
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
    getChanges: builder.query<IRevision[], string>({
      query: params => ({
        url: `/files/${params}/revisions`,
        method: 'get',
        params,
      }),
      providesTags: ['Changes'],
    }),
    updatePermission: builder.mutation<undefined, IEditPermission>({
      query: data => ({
        url: `/files/${data.fileId}/permissions/update/${data.permissionId}`,
        method: 'patch',
        data,
      }),
      invalidatesTags: ['Files', 'Permission'],
    }),

    addPermission: builder.mutation<undefined, ICreatePermission>({
      query: data => ({
        url: `/files/${data.fileId}/permissions/add`,
        method: 'post',
        data,
      }),
      invalidatesTags: ['Files', 'Permission'],
    }),

    revokePermission: builder.mutation<undefined, { permissionId: string; fileId: string }>({
      query: params => ({
        url: `/files/${params.fileId}/permissions/revoke/${params.permissionId}`,
        method: 'post',
      }),
      invalidatesTags: ['Files', 'Permission'],
    }),
    getComments: builder.query<IComment[], string>({
      query: params => ({
        url: `/files/${params}/comments`,
        method: 'get',
      }),
      providesTags: ['Files', 'Comments'],
    }),
    createComment: builder.mutation<undefined, ICreateComment>({
      query: data => ({
        url: `/files/${data.fileId}/comments`,
        method: 'post',
        data,
      }),
      invalidatesTags: ['Files', 'Comments'],
    }),
    deleteComment: builder.mutation<undefined, { fileId: string; commentId: string }>({
      query: params => ({
        url: `/files/${params.fileId}/comments/${params.commentId}`,
        method: 'delete',
      }),
      invalidatesTags: ['Files', 'Comments'],
    }),
    editComment: builder.mutation<undefined, IEditComment>({
      query: data => ({
        url: `/files/${data.fileId}/comments/${data.commentId}`,
        method: 'put',
        data,
      }),
      invalidatesTags: ['Files', 'Comments'],
    }),
    createReply: builder.mutation<undefined, ICreaateReply>({
      query: data => ({
        url: `/files/${data.fileId}/comments/${data.commentId}/replies`,
        method: 'post',
        data,
      }),
      invalidatesTags: ['Files', 'Comments'],
    }),
    editReply: builder.mutation<undefined, IEditReply>({
      query: data => ({
        url: `/files/${data.fileId}/comments/${data.commentId}/replies/${data.replyId}`,
        method: 'put',
        data,
      }),
      invalidatesTags: ['Files', 'Comments'],
    }),
    deleteReply: builder.mutation<undefined, { fileId: string; commentId: string; replyId: string }>({
      query: params => ({
        url: `/files/${params.fileId}/comments/${params.commentId}/replies/${params.replyId}`,
        method: 'delete',
      }),
      invalidatesTags: ['Files', 'Comments'],
    }),
    updateFile: builder.mutation<undefined, { fileId: string; file: FormData }>({
      query: data => ({
        url: `/files/update/${data.fileId}`,
        method: 'put',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data,
      }),
      invalidatesTags: ['Files'],
    }),
    uploadFile: builder.mutation<undefined, { targetFolderId: string; file: FormData }>({
      query: data => ({
        url: `/files/upload`,
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data,
      }),
      invalidatesTags: ['Files'],
    }),
    upload: builder.mutation({
      queryFn: async ({ data }, api) => {
        try {
          const result = await axios.post('http://localhost:8080/api/drive/files/upload', data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: upload => {
              console.log(upload);
              //Set the progress value to show the progress bar
              const uploadloadProgress = Math.round((100 * upload.loaded) / upload.total);
              api.dispatch(setUploadProgress(uploadloadProgress));
            },
          });

          return { data: result.data };
        } catch (axiosError) {
          const err = axiosError;
          return {
            error: {
              status: err.response?.status,
              data: err.response?.data || err.message,
            },
          };
        }
      },
      invalidatesTags: ['Files'],
    }),
    deleteCompletely: builder.mutation<undefined, string[]>({
      query: data => ({
        url: `/files/delete`,
        method: 'post',
        data,
      }),
      invalidatesTags: ['Files'],
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
  useGetChangesQuery,
  useUpdatePermissionMutation,
  useAddPermissionMutation,
  useRevokePermissionMutation,
  useGetCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useEditCommentMutation,
  useCreateReplyMutation,
  useEditReplyMutation,
  useDeleteReplyMutation,
  useUpdateFileMutation,
  useUploadFileMutation,
  useDeleteCompletelyMutation,
  useUploadMutation,
} = filesApi;
