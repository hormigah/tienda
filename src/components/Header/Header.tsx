import { Cart, NavBar } from '@/components';
import { useCart } from '@/contexts';
import { useAppSelector } from '@/store/hooks';
import './Header.css';

export default function Header() {
  const { isCartOpen, openCart, closeCart } = useCart();
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);

  return (
    <>
      <header className="Header">
        <NavBar />
        <button className="Header__cart" aria-label="Carrito de compras" onClick={openCart}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="m1 1 4 4 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {totalQuantity > 0 && <span className="Header__cart-badge">{totalQuantity}</span>}
        </button>
      </header>
      <Cart isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
}
