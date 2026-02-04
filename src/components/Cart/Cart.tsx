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
    const item = items.find((item) => item.id === id);
    if (!item) return;

    const currentQuantity = item.quantity;
    const difference = newQuantity - currentQuantity;

    if (difference > 0) {
      // Add items
      for (let i = 0; i < difference; i++) {
        dispatch(
          addItem({
            id: item.id,
            sku: item.sku,
            name: item.name,
            quantity: 1,
            price: item.price,
            totalPrice: item.price,
          })
        );
      }
    } else if (difference < 0) {
      // Remove items
      for (let i = 0; i < Math.abs(difference); i++) {
        dispatch(removeItem(id));
      }
    }
  };

  const handleRemoveItem = (id: string) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      for (let i = 0; i < item.quantity; i++) {
        dispatch(removeItem(id));
      }
    }
  };

  const handleComprar = () => {
    if (items.length === 0) return;

    const subtotal = Math.round((totalAmount / 1.19) * 100) / 100;
    const impuestos = Math.round((totalAmount - subtotal) * 100) / 100;

    const compra = {
      fechaCompra: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' }),
      items: items.map((item) => ({
        sku: item.sku,
        cantidad: item.quantity,
        precioUnitario: item.price,
        totalItem: item.totalPrice,
      })),
      subtotal,
      impuestos,
      valorTotal: totalAmount,
    };

    const jsonString = JSON.stringify(compra, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `compra_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    dispatch(clearCart());
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="cart__overlay" onClick={onClose} />
      <div className="cart">
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
                              Math.max(1, parseInt(e.target.value) || 1)
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
                  <button onClick={() => dispatch(clearCart())} className="cart__clear">
                    Vaciar Carrito
                  </button>
                  <button onClick={handleComprar} className="btn-primary cart__buy">
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
