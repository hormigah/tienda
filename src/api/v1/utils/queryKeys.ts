export const queryKeysProduct = {
  all: ['products'] as const,
  lists: () => [...queryKeysProduct.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) =>
    filters ? ([...queryKeysProduct.lists(), filters] as const) : queryKeysProduct.lists(),
  details: () => [...queryKeysProduct.all, 'detail'] as const,
  detail: (id: string) => [...queryKeysProduct.details(), id] as const,
};
