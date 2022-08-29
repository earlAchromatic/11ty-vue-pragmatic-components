import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import {URL } from 'url';

export default defineConfig({
  plugins: [vue()],
  clearScreen: false,
  server: {
    mode: 'development',
    middlewareMode: 'ssr',
  },
  resolve: {
  },
  build: {
    mode: 'production',
    ssr: true,
  },
});
