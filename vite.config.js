import { defineConfig, splitVendorChunkPlugin,loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import';
import { createHtmlPlugin } from 'vite-plugin-html';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import windicss from 'vite-plugin-windicss';
import path from 'path';
import mpa from 'vite-plugin-mpa';
// https://vitejs.dev/config/
export default ({command, mode})=>{
  const env = loadEnv(mode, process.cwd());
  //console.log(command)
  return defineConfig({
    define: { 'process.env': env },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      host: env.VITE_BASE_IP, //自己主机IP
      port: 9001,
      proxy: {
        '^/api/.*': {
          target: env.VITE_PROXY_HOST, //你需要代理的主机 IP+PORT
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
      hmr: {
        overlay: true,
      },
    },
    build: {
      assetsDir: 'static',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name].js',
          entryFileNames: 'static/js/[name].js',
          assetFileNames: 'static/[ext]/[name].[hash].[ext]',
        },
      },
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: false,
        },
      },
    },
    plugins: [
      splitVendorChunkPlugin(),
      vue(),
      mpa(),
      windicss({
        config: 'tailwind.config.js',
      }),
      createHtmlPlugin(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[name]',
      }),
      styleImport({
        libs: [
          {
            libraryName: 'element-plus',
            esModule: true,
            resolveStyle: (name) => {
              return `element-plus/lib/theme-chalk/${name}.css`;
            },
            ensureStyleFile: true, // 忽略文件是否存在, 导入不存在的CSS文件时防止错误。
          },
        ],
      }),
    ],
  })
  
}