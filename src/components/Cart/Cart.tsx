import useCart, { type UseCartProps } from './hooks/useCart';
import './Cart.css';

export type CartProps = Readonly<UseCartProps>;

export default function Cart({ isOpen, onClose }: CartProps) {
  const {
    cartRef,
    handleClearCart,
    handleQuantityChange,
    handleRemoveItem,
    handleBuy,
    items,
    totalAmount,
    totalQuantity,
  } = useCart({ isOpen, onClose });

  if (!isOpen) return null;

  return (
    <>
      <div className="cart__overlay" onClick={onClose} aria-hidden="true" />
      <div
        className="cart"
        ref={cartRef}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
      >
        <div className="cart__header">
          <h2 className="cart__title">Carrito de Compras ({totalQuantity})</h2>
          <button className="cart__close" onClick={onClose} aria-label="Cerrar carrito">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="cart__content">
          {items.length === 0 ? (
            <p className="cart__empty">Tu carrito está vacío</p>
          ) : (
            <>
              <table className="cart__table">
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
                      <td className="cart__product">{item.name}</td>
                      <td className="cart__price">${item.price}</td>
                      <td className="cart__quantity">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              Math.max(1, Number.parseInt(e.target.value, 10) || 1)
                            )
                          }
                          className="cart__quantity-input"
                        />
                      </td>
                      <td className="cart__total">${item.totalPrice}</td>
                      <td className="cart__actions">
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="cart__remove"
                          aria-label="Eliminar producto"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="3,6 5,6 21,6" />
                            <path d="m19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="cart__footer">
                <div className="cart__total-section">
                  <strong>Total: ${totalAmount}</strong>
                </div>
                <div className="cart__buttons">
                  <button onClick={handleClearCart} className="cart__clear">
                    Vaciar Carrito
                  </button>
                  <button onClick={handleBuy} className="btn-primary cart__buy">
                    Comprar
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
