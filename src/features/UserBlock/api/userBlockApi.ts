import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../../../shared/api/query';

import { IUser } from './types';

export const userBlockApi = createApi({
  reducerPath: 'userBlockApi',
  baseQuery: axiosBaseQuery('/api/drive'),
  tagTypes: ['UserBlock'],
  endpoints: builder => ({
    getUser: builder.query<IUser, unknown>({
      query: () => ({
        url: '/about',
        method: 'get',
      }),
      providesTags: ['UserBlock'],
    }),
  }),
});

export const { useGetUserQuery } = userBlockApi;
