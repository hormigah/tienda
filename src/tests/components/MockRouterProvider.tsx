import type { ReactNode } from 'react';
import { MemoryRouter, Route, Routes, type PathRouteProps } from 'react-router-dom';
import Layout from '@/components/Layout';
import type { RouteParams } from '../types';

interface MockRouterProviderProps {
  children: ReactNode;
  routeParams: RouteParams;
  routes?: PathRouteProps[];
}

export default function MockRouterProvider({
  children,
  routeParams = '/',
  routes,
}: Readonly<MockRouterProviderProps>) {
  let initialEntry;
  let path;
  if (typeof routeParams === 'string') {
    initialEntry = routeParams;
    path = routeParams;
  } else {
    const keys = Object.keys(routeParams);
    path = keys.length ? `/:${keys[0]}` : '/';
    initialEntry = keys.length ? `/:${routeParams[keys[0]]}` : '/';
  }

  return (
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path={path} element={children} />
          {routes ? routes.map((route) => <Route {...route} key={route.path} />) : null}
        </Route>
      </Routes>
    </MemoryRouter>
  );
}
