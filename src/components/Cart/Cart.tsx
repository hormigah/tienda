import { useEffect } from 'react';
import './Cart.css';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { addItem, removeItem, clearCart } from '@/store/cartSlice';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const dispatch = useAppDispatch();
  const { items, totalAmount, totalQuantity } = useAppSelector((state) => state.cart);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    const item = items.find(item => item.id === id);
    if (!item) return;

    const currentQuantity = item.quantity;
    const difference = newQuantity - currentQuantity;

    if (difference > 0) {
      // Add items
      for (let i = 0; i < difference; i++) {
        dispatch(addItem({
          id: item.id,
          name: item.name,
          quantity: 1,
          price: item.price,
          totalPrice: item.price,
        }));
      }
    } else if (difference < 0) {
      // Remove items
      for (let i = 0; i < Math.abs(difference); i++) {
        dispatch(removeItem(id));
      }
    }
  };

  const handleRemoveItem = (id: string) => {
    const item = items.find(item => item.id === id);
    if (item) {
      for (let i = 0; i < item.quantity; i++) {
        dispatch(removeItem(id));
      }
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="Cart__overlay" onClick={onClose} />
      <div className="Cart">
        <div className="Cart__header">
          <h2 className="Cart__title">Carrito de Compras ({totalQuantity})</h2>
          <button className="Cart__close" onClick={onClose} aria-label="Cerrar carrito">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div className="Cart__content">
          {items.length === 0 ? (
            <p className="Cart__empty">Tu carrito está vacío</p>
          ) : (
            <>
              <table className="Cart__table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="Cart__product">{item.name}</td>
                      <td className="Cart__price">${item.price}</td>
                      <td className="Cart__quantity">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                          className="Cart__quantity-input"
                        />
                      </td>
                      <td className="Cart__total">${item.totalPrice}</td>
                      <td className="Cart__actions">
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="Cart__remove"
                          aria-label="Eliminar producto"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3,6 5,6 21,6"/>
                            <path d="m19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"/>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="Cart__footer">
                <div className="Cart__total-section">
                  <strong>Total: ${totalAmount}</strong>
                </div>
                <button 
                  onClick={() => dispatch(clearCart())}
                  className="Cart__clear"
                >
                  Vaciar Carrito
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
