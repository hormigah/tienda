import { useCallback, useEffect, useRef } from 'react';
import {
  updateQuantity,
  removeItemFull,
  clearCart,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
  useAppSelector,
  useAppDispatch,
} from '@/store';
export interface UseCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const FOCUSABLE_SELECTOR = 'button, input, [href], [tabindex]:not([tabindex="-1"])';

export default function useCart({ isOpen, onClose }: UseCartProps) {
  const cartRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const totalAmount = useAppSelector(selectCartTotalAmount);
  const totalQuantity = useAppSelector(selectCartTotalQuantity);

  const handleQuantityChange = useCallback(
    (id: string, newQuantity: number) => {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    },
    [dispatch]
  );

  const handleRemoveItem = useCallback(
    (id: string) => {
      dispatch(removeItemFull(id));
    },
    [dispatch]
  );

  const handleBuy = useCallback(() => {
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
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    setTimeout(() => URL.revokeObjectURL(url), 1000);

    dispatch(clearCart());
    onClose();
  }, [items, totalAmount, dispatch, onClose]);

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !cartRef.current) return;

    const cart = cartRef.current;
    const firstFocusable = cart.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    firstFocusable?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = cart.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [isOpen, items]);

  return {
    cartRef,
    handleClearCart,
    handleQuantityChange,
    handleRemoveItem,
    handleBuy,
    items,
    totalAmount,
    totalQuantity,
  };
}
