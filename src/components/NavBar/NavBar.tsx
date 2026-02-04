import { Link } from 'react-router-dom';
import Search from '../Search/Search';
import './NavBar.css';

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <Link to="/" className="navbar__logo">
          Tienda
        </Link>
      </div>
      <div className="navbar__search">
        <Search />
      </div>
    </nav>
  );
}
