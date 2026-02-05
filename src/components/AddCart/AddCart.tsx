import { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { addItem } from '@/store/cartSlice';
import { useCart } from '@/contexts';
import type { IProduct } from '@/types';
import './AddCart.css';

interface AddCartProps {
  product: IProduct;
}

export default function AddCart({ product }: AddCartProps) {
  const dispatch = useAppDispatch();
  const { openCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const price = product.prices[0];
    if (price) {
      dispatch(
        addItem({
          id: product.id,
          sku: product.sku,
          name: product.displayName,
          quantity,
          price: price.priceWithoutFormatting,
          totalPrice: price.priceWithoutFormatting * quantity,
        })
      );
      openCart();
    }
  };

  return (
    <div className="add-cart">
      <div className="add-cart__quantity">
        <label htmlFor={`quantity-${product.id}`} className="add-cart__label">
          Cantidad:
        </label>
        <input
          id={`quantity-${product.id}`}
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="add-cart__input"
        />
      </div>
      <button
        className="add-cart__button btn-primary"
        onClick={handleAddToCart}
        disabled={!product.prices[0]}
      >
        Agregar al Carrito
      </button>
    </div>
  );
}
