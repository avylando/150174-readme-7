const AppRoute = {
  INDEX: '/',
  NOT_FOUND: '*',
} as const;

const ExternalRoute = {
  BLOG: '/blog',
} as const;

export { AppRoute, ExternalRoute };
