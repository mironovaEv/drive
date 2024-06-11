import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../../shared/api/query';

/**
 * Api для авторизации
 */
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery('api/drive'),
  tagTypes: ['Auth'],
  endpoints: builder => ({
    oauth: builder.query<string, unknown>({
      query: () => ({
        url: '/oauth',
        method: 'get',
      }),
      providesTags: ['Auth'],
    }),
  }),
});

export const { useOauthQuery } = authApi;
