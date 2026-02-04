import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RouterAppProvider from './routes';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterAppProvider />
    </QueryClientProvider>
  );
}

export default App;
