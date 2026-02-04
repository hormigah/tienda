import { apiClient } from '@/api/v1/utils/apiClient';
import type { ProductsResponse } from '../types';
import type { IProduct } from '@/types';

export async function fetchProductList(): Promise<ProductsResponse> {
  const { data } = await apiClient.get<ProductsResponse>('/category');
  return data;
}

export function adaptProducts(productsResponse: ProductsResponse): IProduct[] {
  return productsResponse.data.result.map<IProduct>((product) => ({
    id: product.productId,
    displayName: product.displayName,
    sku: product.skuId,
    mediaUrls: product.mediaUrls,
    brand: product.brand,
    prices: product.prices.map(({ price, symbol, type, priceWithoutFormatting }) => ({
      price,
      symbol,
      type,
      priceWithoutFormatting,
    })),
  }));
}
