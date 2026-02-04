import {
  renderHook as _renderHook,
  render,
  type RenderHookOptions,
  type RenderResult,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import type { JSX, JSXElementConstructor, PropsWithChildren, ReactNode } from 'react';
import type { PathRouteProps } from 'react-router-dom';
import { MockRouterProvider, MockRouterProviderByHook } from './components';
import TestAppProviders, { type TestAppProvidersProps } from './TestAppProviders';
import type { RouteParams } from './types';

export function renderComponent(component: ReactNode): RenderResult {
  return render(<TestAppProviders>{component}</TestAppProviders>);
}

export function renderComponentWithRouter(
  component: JSX.Element,
  routeParams: RouteParams = '/',
  routes?: PathRouteProps[]
) {
  return renderComponent(
    <MockRouterProvider routeParams={routeParams} routes={routes}>
      {component}
    </MockRouterProvider>
  );
}

export function renderHook<Props extends PropsWithChildren, Result>(
  callback: () => Result,
  wrapper = true
) {
  const options: RenderHookOptions<Props> = {};
  if (wrapper) {
    options.wrapper = TestAppProviders as JSXElementConstructor<TestAppProvidersProps>;
  }
  return _renderHook(callback, options);
}

export function renderHookWithRouter<Result>(
  callback: () => Result,
  initialEntry = '/',
  routePath = '/'
) {
  const wrapper = ({ children }: PropsWithChildren) => (
    <MockRouterProviderByHook initialEntry={initialEntry} routePath={routePath}>
      <TestAppProviders>{children}</TestAppProviders>
    </MockRouterProviderByHook>
  );
  return _renderHook(callback, { wrapper });
}
