import { useState, useMemo } from 'react';
import { useApiProductList } from '@/api';
import { List, NavBar } from '@/components';
import './HomePage.css';

export default function HomePage() {
  const { products, isLoading, error } = useApiProductList();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!products || !searchQuery) return products;
    return products.filter((product) =>
      product.displayName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (isLoading) {
    return (
      <div className="home-page home-page--loading" data-testid="home-page-loading">
        <p>Cargando productos...</p>
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
      <NavBar onSearch={handleSearch} />
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
