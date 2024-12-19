import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import svgr from 'vite-plugin-svgr';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 8000,
  },

  plugins: [
    nodePolyfills(),
    react(),
    svgr({
      include: '**/*.svg?react',
    }),
    createHtmlPlugin({
      entry: '../src/index.tsx',
      template: 'public/index.html',
    }),
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@mockData': path.resolve(__dirname, './src/mockData'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@modals': path.resolve(__dirname, './src/modals'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@subjects': path.resolve(__dirname, './src/subjects'),
      '@reducers': path.resolve(__dirname, './src/store/reducers'),
      '#types': path.resolve(__dirname, './src/types'),
      '@dal': path.resolve(__dirname, './src/common/dal'),
      '@theme': path.resolve(__dirname, './src/theme'),
      '@services': path.resolve(__dirname, './src/services'),
      '@db': path.resolve(__dirname, './src/dataBase'),
      '@bll': path.resolve(__dirname, './src/bll'),
    },
  },
  build: {
    minify: 'terser',
    commonjsOptions: { transformMixedEsModules: true },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
