import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { addItem, removeItem, clearCart } from '@/store/cartSlice';

export interface UseCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function useCart({ isOpen, onClose }: UseCartProps) {
  const dispatch = useAppDispatch();
  const { items, totalAmount, totalQuantity } = useAppSelector((state) => state.cart);

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

  const handleBuy = () => {
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
    window.open(url, '_blank');
    setTimeout(() => URL.revokeObjectURL(url), 1000);

    dispatch(clearCart());
    onClose();
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

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

  return {
    handleClearCart,
    handleQuantityChange,
    handleRemoveItem,
    handleBuy,
    items,
    totalAmount,
    totalQuantity,
  };
}
