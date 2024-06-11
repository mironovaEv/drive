import React, { Suspense } from 'react';
import { Spin } from 'antd';

import { IRoute } from '../../shared/types';

const TrashList = React.lazy(() => import('./TrashList/TrashList'));

export const TrashRoutes: IRoute[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<Spin className="main-loader" />}>
        <TrashList />
      </Suspense>
    ),
    title: '',
  },
];
