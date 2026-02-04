import { Link } from 'react-router-dom';
import Search from '../Search/Search';
import './NavBar.css';

export default function NavBar() {
  return (
    <nav className="NavBar">
      <div className="NavBar__brand">
        <Link to="/" className="NavBar__logo">
          Tienda
        </Link>
      </div>
      <div className="NavBar__search">
        <Search />
      </div>
    </nav>
  );
}
