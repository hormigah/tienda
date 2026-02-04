import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RouterAppProvider from './routes';
import { CartProvider } from './contexts';
import './App.css';
import StoreProvider from './store/StoreProvider';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <CartProvider>
          <RouterAppProvider />
        </CartProvider>
      </StoreProvider>
    </QueryClientProvider>
  );
}

export default App;
