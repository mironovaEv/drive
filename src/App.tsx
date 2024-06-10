import { Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { Spin } from 'antd';

import { rootRoutes } from './Routes';
import useEventBus from './shared/hooks/useEventBus/useEventBus';
import React from 'react';

const MainLayout = React.lazy(() => import('./pages/MainLayout'));
const NotFound = React.lazy(() => import('./pages/NotFound/NotFound'));

const createRoutes = (isAuth: boolean) => [
  {
    path: '/',
    element: isAuth ? (
      <Suspense fallback={<Spin className="main-loader" />}>
        <MainLayout />
      </Suspense>
    ) : (
      <Navigate to="/login" />
    ),
    children: rootRoutes,
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<Spin className="main-loader" />}>
        <NotFound />
      </Suspense>
    ),
  },
];

const App: React.FC = () => {
  useEventBus();

  const isAuth = true;
  const customRouter = useRoutes(createRoutes(isAuth));

  return <Suspense fallback={<Spin />}>{customRouter}</Suspense>;
};
export default App;
