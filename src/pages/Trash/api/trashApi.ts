import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../../../shared/api/query';

export const trashApi = createApi({
  reducerPath: 'trashApi',
  baseQuery: axiosBaseQuery('/api/drive'),
  tagTypes: ['Trash'],
  endpoints: builder => ({
    emptyTrash: builder.mutation<undefined, undefined>({
      query: () => ({
        url: '/files/trash',
        method: 'delete',
      }),
      invalidatesTags: ['Trash'],
    }),
  }),
});

export const { useEmptyTrashMutation } = trashApi;
