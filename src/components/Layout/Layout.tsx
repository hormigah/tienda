import { Outlet } from 'react-router-dom';
import { Header, Footer } from '@/components';

export default function Layout() {
  return (
    <div className="Layout" data-testid="layout">
      <Header />
      <div className="Layout--Content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
