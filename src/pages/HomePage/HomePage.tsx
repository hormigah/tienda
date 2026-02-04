import { useApiProductList } from '@/api';
import { List } from '@/components';
import './HomePage.css';

export default function HomePage() {
  const { products, isLoading, error } = useApiProductList();

  if (isLoading) {
    return (
      <div className="HomePage HomePage--loading" data-testid="home-page-loading">
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="HomePage HomePage--error" data-testid="home-page-error">
        <p>Error al cargar los productos</p>
      </div>
    );
  }

  return (
    <div className="HomePage" data-testid="home-page">
      <h1 className="HomePage__title">Nuestros Productos</h1>
      {products && <List products={products} />}
    </div>
  );
}
