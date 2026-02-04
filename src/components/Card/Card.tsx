import { Link } from 'react-router-dom';
import type { IProduct } from '@/types';
import './Card.css';

interface CardProps {
  product: IProduct;
}

export default function Card({ product }: CardProps) {
  const { id, displayName, mediaUrls, prices } = product;
  const image = mediaUrls?.[0];
  const price = prices?.[0];

  return (
    <article className="Card" data-testid="product-card">
      <Link to={`/producto/${id}`} className="Card__image-link">
        {image ? (
          <img src={image} alt={displayName} className="Card__image" />
        ) : (
          <div className="Card__image Card__image--placeholder">Sin imagen</div>
        )}
      </Link>
      <div className="Card__content">
        <Link to={`/product/${id}`} className="Card__name">
          {displayName}
        </Link>
        {price && (
          <p className="Card__price">
            {price.symbol} {price.price}
          </p>
        )}
      </div>
    </article>
  );
}
