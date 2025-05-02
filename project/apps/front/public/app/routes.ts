import { type RouteConfig, route } from '@react-router/dev/routes';
import { AppRoute } from './constants/routes';

export default [
  route(AppRoute.INDEX, './routes/_index.tsx'),
] satisfies RouteConfig;
