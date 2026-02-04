import { createBrowserRouter, type RouteObject, RouterProvider } from 'react-router-dom';
import { Layout } from '@/components';
import { HomePage, NotFoundPage, ProductPage } from '@/pages';

const routeConfig: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/producto/:id',
        element: <ProductPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default function RouterAppProvider() {
  return <RouterProvider router={createBrowserRouter(routeConfig)} />;
}
