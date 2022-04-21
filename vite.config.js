import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'url';

export default defineConfig({
  plugins: [vue()],
  clearScreen: false,
  server: {
    mode: 'development',
    middlewareMode: 'ssr',
  },
  resolve: {
    '@': fileURLToPath(new URL('../node_modules/', import.meta.url)),
  },
  build: {
    mode: 'production',
    ssr: true,
  },
});
