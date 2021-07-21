import { defineConfig } from 'umi';

export default defineConfig({
  base: '/',
  publicPath: '/toto/',
  hash: true,
  // dynamicImport: {},
  exportStatic: {},
  plugins: [
    require.resolve('../plugin/browser/src')
  ]
});