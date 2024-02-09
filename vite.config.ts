import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      'Components': path.resolve(__dirname, './src/components'),
      'Scripts': path.resolve(__dirname, './src/scripts'),
      'Assets': path.resolve(__dirname, './src/assets'),
      'Types': path.resolve(__dirname, './src/types'),
    },
    extensions: ['.ts', '.vue']
  },
  define: {
    'process.env': process.env,
  }
})
