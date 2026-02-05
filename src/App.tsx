import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RouterAppProvider from './routes';
import { CartProvider } from './contexts';
import { ErrorBoundary } from './components';
import './App.css';
import StoreProvider from './store/StoreProvider';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <StoreProvider>
          <CartProvider>
            <RouterAppProvider />
          </CartProvider>
        </StoreProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
