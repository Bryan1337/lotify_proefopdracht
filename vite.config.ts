import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    preserveSymlinks: true,
    alias: {
      'Components': path.resolve(__dirname, './src/components'),
      'Scripts': path.resolve(__dirname, './src/scripts'),
      'Assets': path.resolve(__dirname, './src/assets'),
      'Types': path.resolve(__dirname, './src/types'),
      /**
       * Fix for storybook peer dependency referencing 'index' instead of 'index.js'
       */
      'function-bind': path.resolve(__dirname, 'node_modules', 'function-bind', 'index.js'),
    },
    extensions: ['.ts', '.vue']
  },
  define: {
    'process.env': process.env,
  }
})
