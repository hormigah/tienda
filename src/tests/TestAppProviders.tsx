import { type ReactNode } from 'react';

export interface TestAppProvidersProps {
  children: ReactNode;
}

export default function TestAppProviders({
  children,
}: Readonly<TestAppProvidersProps>) {
  return <div>{children}</div>;
}
