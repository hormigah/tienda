export interface IProduct {
  brand: string;
  id: string;
  displayName: string;
  mediaUrls: string[];
  sku: string;
  prices: IPrice[];
}

export interface IPrice {
  price: string;
  symbol: string;
  type: string;
  priceWithoutFormatting: number;
}
