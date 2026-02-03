import type { ReactNode } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Layout from '@/components/Layout';

interface MockRouterProviderByHookProps {
  children: ReactNode;
  initialEntry: string;
  routePath: string;
}

export default function MockRouterProviderByHook({
  children,
  initialEntry,
  routePath,
}: Readonly<MockRouterProviderByHookProps>) {
  return (
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path={routePath} element={children} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}
