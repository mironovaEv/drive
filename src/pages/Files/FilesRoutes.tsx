import React, { Suspense } from 'react';
import { Spin } from 'antd';

import { IRoute } from '../../shared/types';

const FilesList = React.lazy(() => import('./FilesList/FilesList'));

export const FilesRoutes: IRoute[] = [
  {
    path: '',
    element: (
      <Suspense fallback={<Spin className="main-loader" />}>
        <FilesList />
      </Suspense>
    ),
    title: '',
  },
  {
    path: ':folderId',
    element: (
      <Suspense fallback={<Spin className="main-loader" />}>
        <FilesList />
      </Suspense>
    ),
    title: '',
  },
];
