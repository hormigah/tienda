import { useParams } from 'react-router-dom';
import { useApiProduct } from '@/api';
import { AddCart, Loading, Slider } from '@/components';
import './ProductPage.css';

export default function ProductPage() {
  const { id = '' } = useParams<{ id: string }>();
  const { product, isLoading, error } = useApiProduct(id);

  if (isLoading) {
    return (
      <div className="ProductPage ProductPage--loading" data-testid="product-page-loading">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="ProductPage ProductPage--error" data-testid="product-page-error">
        <p>Error al cargar el producto</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="ProductPage ProductPage--not-found" data-testid="product-page-not-found">
        <p>Producto no encontrado</p>
      </div>
    );
  }

  const { displayName, brand, prices } = product;
  const price = prices[0];

  return (
    <div className="ProductPage" data-testid="product-page">
      <div className="ProductPage__gallery">
        <Slider images={product.mediaUrls} alt={displayName} />
      </div>
      <div className="ProductPage__info">
        <span className="ProductPage__brand">{brand}</span>
        <h1 className="ProductPage__name">{displayName}</h1>
        {price && (
          <p className="ProductPage__price">
            {price.symbol} {price.price}
          </p>
        )}
        <AddCart product={product} />
      </div>
    </div>
  );
}
