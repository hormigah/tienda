import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="Layout" data-testid="layout">
      <div className="Layout--Content">
        <Outlet />
      </div>
    </div>
  );
}
