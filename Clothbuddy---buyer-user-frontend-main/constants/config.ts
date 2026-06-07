export const APP_CONFIG = {
  API: {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    ENDPOINTS: {
      AUTH: {
        SIGNIN: '/api/auth/signin',
        LOGOUT: '/api/auth/logout',
        SIGNUP: '/api/auth/signup',
      },
      PRODUCTS: {
        LIST: '/api/products',
        DETAIL: '/api/products/:id',
      },
    },
  },
  ROUTES: {
    HOME: '/',
    SIGNIN: '/auth/signin',
    SIGNUP: '/auth/signup',
    PRODUCTS: '/products',
    PRODUCT_DETAIL: '/product/:id',
  },
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 12,
    MAX_PAGE_SIZE: 48,
  },
} as const;
