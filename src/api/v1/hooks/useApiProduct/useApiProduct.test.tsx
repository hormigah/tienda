import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useApiProductList, useApiProduct } from './useApiProduct';
import { adaptProducts, fetchProductList } from './utils';
import type { ProductsResponse } from './types';
import { apiClient } from '@/api/v1/utils/apiClient';

vi.mock('@/api/v1/utils/apiClient', () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

const mockProductsResponse: ProductsResponse = {
  data: {
    result: [
      {
        productId: 'prod-1',
        skuId: 'SKU-001',
        displayName: 'Silla Ejecutiva',
        brand: 'MarcaA',
        mediaUrls: ['https://example.com/img1.jpg', 'https://example.com/img2.jpg'],
        prices: [
          {
            price: '$150.000',
            symbol: '$',
            type: 'regular',
            priceWithoutFormatting: 150000,
          },
        ],
      },
      {
        productId: 'prod-2',
        skuId: 'SKU-002',
        displayName: 'Escalera Plegable',
        brand: 'MarcaB',
        mediaUrls: ['https://example.com/img3.jpg'],
        prices: [
          {
            price: '$85.000',
            symbol: '$',
            type: 'regular',
            priceWithoutFormatting: 85000,
          },
        ],
      },
    ],
  },
};

describe('adaptProducts', () => {
  it('should transform ProductsResponse to IProduct array', () => {
    const result = adaptProducts(mockProductsResponse);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      id: 'prod-1',
      sku: 'SKU-001',
      displayName: 'Silla Ejecutiva',
      brand: 'MarcaA',
      mediaUrls: ['https://example.com/img1.jpg', 'https://example.com/img2.jpg'],
      prices: [
        {
          price: '$150.000',
          symbol: '$',
          type: 'regular',
          priceWithoutFormatting: 150000,
        },
      ],
    });
  });

  it('should map productId to id', () => {
    const result = adaptProducts(mockProductsResponse);
    expect(result[0].id).toBe('prod-1');
    expect(result[1].id).toBe('prod-2');
  });

  it('should map skuId to sku', () => {
    const result = adaptProducts(mockProductsResponse);
    expect(result[0].sku).toBe('SKU-001');
    expect(result[1].sku).toBe('SKU-002');
  });

  it('should handle empty result array', () => {
    const emptyResponse: ProductsResponse = {
      data: {
        result: [],
      },
    };
    const result = adaptProducts(emptyResponse);
    expect(result).toEqual([]);
  });

  it('should correctly map all price properties', () => {
    const result = adaptProducts(mockProductsResponse);
    const firstProductPrice = result[0].prices[0];

    expect(firstProductPrice.price).toBe('$150.000');
    expect(firstProductPrice.symbol).toBe('$');
    expect(firstProductPrice.type).toBe('regular');
    expect(firstProductPrice.priceWithoutFormatting).toBe(150000);
  });
});

describe('fetchProductList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call apiClient.get with /category endpoint', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({ data: mockProductsResponse });

    await fetchProductList();

    expect(apiClient.get).toHaveBeenCalledWith('/category');
    expect(apiClient.get).toHaveBeenCalledTimes(1);
  });

  it('should return the data from the API response', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({ data: mockProductsResponse });

    const result = await fetchProductList();

    expect(result).toEqual(mockProductsResponse);
  });

  it('should propagate errors from the API', async () => {
    const mockError = new Error('Network error');
    vi.mocked(apiClient.get).mockRejectedValue(mockError);

    await expect(fetchProductList()).rejects.toThrow('Network error');
  });
});

describe('useApiProductList', () => {
  let queryClient: QueryClient;

  const createWrapper = () => {
    return function Wrapper({ children }: { children: ReactNode }) {
      return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    };
  };

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    vi.clearAllMocks();
  });

  afterEach(() => {
    queryClient.clear();
  });

  it('should fetch and transform products', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({ data: mockProductsResponse });

    const { result } = renderHook(() => useApiProductList(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.products).toHaveLength(2);
    expect(result.current.products?.[0].displayName).toBe('Silla Ejecutiva');
  });

  it('should return error state when API fails', async () => {
    const mockError = new Error('API Error');
    vi.mocked(apiClient.get).mockRejectedValue(mockError);

    const { result } = renderHook(() => useApiProductList(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeTruthy();
  });

  it('should have products as undefined during loading', () => {
    vi.mocked(apiClient.get).mockImplementation(() => new Promise(() => {}));

    const { result } = renderHook(() => useApiProductList(), {
      wrapper: createWrapper(),
    });

    expect(result.current.products).toBeUndefined();
    expect(result.current.isLoading).toBe(true);
  });
});

describe('useApiProduct', () => {
  let queryClient: QueryClient;

  const createWrapper = () => {
    return function Wrapper({ children }: { children: ReactNode }) {
      return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    };
  };

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    vi.clearAllMocks();
  });

  afterEach(() => {
    queryClient.clear();
  });

  it('should find a specific product by id', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({ data: mockProductsResponse });

    const { result } = renderHook(() => useApiProduct('prod-1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.product?.displayName).toBe('Silla Ejecutiva');
    expect(result.current.product?.sku).toBe('SKU-001');
  });

  it('should return undefined product when id not found', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({ data: mockProductsResponse });

    const { result } = renderHook(() => useApiProduct('non-existent-id'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.product).toBeUndefined();
  });

  it('should not fetch when productId is empty', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({ data: mockProductsResponse });

    const { result } = renderHook(() => useApiProduct(''), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
    expect(apiClient.get).not.toHaveBeenCalled();
  });
});
