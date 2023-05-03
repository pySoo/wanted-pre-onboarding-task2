import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/search/api': {
        target: 'https://api.clinicaltrialskorea.com/api/v1',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/search\/api/, ''),
      },
    },
  },
  plugins: [react(), tsconfigPaths()],
});
