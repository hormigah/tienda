import { Card } from '@/components';
import type { IProduct } from '@/types';
import './List.css';

interface ListProps {
  products: IProduct[];
}

export default function List({ products }: ListProps) {
  return (
    <div className="list">
      {products.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
}
