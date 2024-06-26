import React, { Suspense } from 'react';
import { Spin } from 'antd';

import { IRoute } from '../../shared/types';

const AvailableList = React.lazy(() => import('./AvailableList/AvailableList'));

export const AvailableRoutes: IRoute[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<Spin className="main-loader" />}>
        <AvailableList />
      </Suspense>
    ),
    title: '',
  },
  {
    path: ':folderId',
    element: (
      <Suspense fallback={<Spin className="main-loader" />}>
        <AvailableList />
      </Suspense>
    ),
    title: '',
  },
];
