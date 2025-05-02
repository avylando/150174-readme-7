import { reactRouter } from '@react-router/dev/vite';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  root: __dirname,
  build: {
    outDir: '../../../dist/apps/front/readme-public/client',
    emptyOutDir: true,
  },
  plugins: [reactRouter(), nxViteTsPaths()],
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    fs: {
      allow: [
        // search up for workspace root
        searchForWorkspaceRoot(process.cwd()),
      ],
    },
  },
});
