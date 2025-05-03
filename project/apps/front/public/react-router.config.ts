import type { Config } from '@react-router/dev/config';

export default {
  ssr: true,
  buildDirectory: '../../../dist/apps/front/readme-public',
  basename: '/readme',
} satisfies Config;
