import { Outlet } from 'react-router-dom';
import { Header, Footer } from '@/components';
import './Layout.css';

export default function Layout() {
  return (
    <div className="Layout" data-testid="layout">
      <Header />
      <main className="Layout__content">
        <div className="Layout__container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
