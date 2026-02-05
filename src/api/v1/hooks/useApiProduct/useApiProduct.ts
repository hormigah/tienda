import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { queryKeysProduct } from '../../utils';
import type { IProduct } from '@/types';
import type { BackendError } from '../../types';
import type { ProductsResponse } from './types';
import { adaptProducts, fetchProductList } from './utils';

export function useApiProductList(
  queryOptions?: UseQueryOptions<ProductsResponse, BackendError, IProduct[]>
) {
  const { data, ...rest } = useQuery<ProductsResponse, BackendError, IProduct[]>({
    ...queryOptions,
    queryKey: queryKeysProduct.lists(),
    queryFn: () => fetchProductList(),
    select: adaptProducts,
  });

  return {
    products: data,
    ...rest,
  };
}

export function useApiProduct(
  productId: string,
  queryOptions?: UseQueryOptions<ProductsResponse, BackendError, IProduct[]>
) {
  const { products, ...rest } = useApiProductList({
    ...queryOptions,
    queryKey: queryKeysProduct.lists(),
    enabled: Boolean(productId) && queryOptions?.enabled,
  });

  return {
    product: products?.find(({ id }) => id === productId),
    ...rest,
  };
}
