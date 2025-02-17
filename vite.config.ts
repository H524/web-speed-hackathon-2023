// import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import topLevelAwait from 'vite-plugin-top-level-await';
import wasm from 'vite-plugin-wasm';
import { visualizer } from 'rollup-plugin-visualizer';
import gzipPlugin from 'rollup-plugin-gzip'

// import { getFileList } from './tools/get_file_list';

// const publicDir = path.resolve(__dirname, './public');
// const getPublicFileList = async (targetPath: string) => {
//   const filePaths = await getFileList(targetPath);
//   const publicFiles = filePaths
//     .map((filePath) => path.relative(publicDir, filePath))
//     .map((filePath) => path.join('/', filePath));

//   return publicFiles;
// };

export default defineConfig(async () => {
  // const videos = await getPublicFileList(path.resolve(publicDir, 'videos'));

  return {
    build: {
      assetsInlineLimit: 20480,
      cssCodeSplit: true,
      // cssTarget: 'es6',
      minify: true,
      rollupOptions: {
        output: {
          experimentalMinChunkSize: 40960,
          // manualChunks: {
          //   recoil: ['recoil'],
          //   '@js-temporal/polyfill': ['@js-temporal/polyfill'],
          //   '@apollo/client': ['@apollo/client'],
          //   // '@apollo/server': ['@apollo/server'],
          // }
        },
      },
      target: 'chrome87',
    },
    plugins: [
      react(),
      wasm(),
      topLevelAwait(),
      ViteEjsPlugin({
        module: '/src/client/index.tsx',
        title: '買えるオーガニック',
        // videos,
      }),
      // splitVendorChunkPlugin(),
      gzipPlugin({fileName: '.gz'}),
      // visualizer(),
    ],
  };
});
