export interface ProductsResponse {
  data: {
    result: ProductResponse[];
  };
}

export interface ProductResponse {
  brand: string;
  displayName: string;
  mediaUrls: string[];
  prices: PriceResponse[];
  productId: string;
  skuId: string;
}

export interface PriceResponse {
  price: string;
  symbol: string;
  type: string;
  priceWithoutFormatting: number;
}
