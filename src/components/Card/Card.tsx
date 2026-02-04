import { Link } from 'react-router-dom';
import type { IProduct } from '@/types';
import { AddCart } from '@/components';
import './Card.css';

interface CardProps {
  readonly product: IProduct;
}

export default function Card({ product }: CardProps) {
  const { id, displayName, mediaUrls, prices } = product;
  const image = mediaUrls?.[0];
  const price = prices?.[0];

  return (
    <article className="card" data-testid="product-card">
      <Link to={`/producto/${id}`} className="card__image-link">
        {image ? (
          <img src={image} alt={displayName} className="card__image" />
        ) : (
          <div className="card__image card__image--placeholder">Sin imagen</div>
        )}
      </Link>
      <div className="card__content">
        <Link to={`/producto/${id}`} className="card__name">
          {displayName}
        </Link>
        {price && (
          <p className="card__price">
            {price.symbol} {price.price}
          </p>
        )}
        <AddCart product={product} />
      </div>
    </article>
  );
}
