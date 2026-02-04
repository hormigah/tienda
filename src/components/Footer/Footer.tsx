import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {currentYear} Mi Tienda Online. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
