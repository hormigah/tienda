import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApiProductList } from '@/api';
import { List, Loading } from '@/components';
import './HomePage.css';

export default function HomePage() {
  const { products, isLoading, error } = useApiProductList();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') ?? '';

  const filteredProducts = useMemo(() => {
    if (!products || !searchQuery) return products;
    return products.filter((product) =>
      product.displayName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  if (isLoading) {
    return (
      <div className="home-page" data-testid="home-page-loading">
        <div className="home-page__content">
          <h1 className="home-page__title">Nuestros Productos</h1>
          <Loading />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-page home-page--error" data-testid="home-page-error">
        <p>Error al cargar los productos</p>
      </div>
    );
  }

  return (
    <div className="home-page" data-testid="home-page">
      <div className="home-page__content">
        <h1 className="home-page__title">Nuestros Productos</h1>
        {filteredProducts && filteredProducts.length > 0 ? (
          <List products={filteredProducts} />
        ) : (
          <p className="home-page__empty">No se encontraron productos</p>
        )}
      </div>
    </div>
  );
}
