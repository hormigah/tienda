import { CartProvider } from '@/contexts';
import StoreProvider from '@/store/StoreProvider';
import { type ReactNode } from 'react';

export interface TestAppProvidersProps {
  children: ReactNode;
}

export default function TestAppProviders({ children }: Readonly<TestAppProvidersProps>) {
  return (
    <StoreProvider>
      <CartProvider>{children}</CartProvider>
    </StoreProvider>
  );
}
