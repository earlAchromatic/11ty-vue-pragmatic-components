import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const path = require('path');

export default defineConfig({
  plugins: [vue()],
  clearScreen: false,
  server: {
    mode: 'development',
  },
  resolve: {
    '@': path.resolve(__dirname, './node_modules'),
  },
  build: {
    mode: 'production',
    ssr: true,
  },
});
