/*
 * @Description: 
 * @Author: jdchen
 * @Date: 2023-12-27 15:25:46
 * @LastEditors: jdchen
 * @LastEditTime: 2023-12-27 22:30:18
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
// import { vitePluginCommonjs } from 'vite-plugin-commonjs'
const path = require('path')
function pathResolve(dir) {
  return resolve(__dirname, ".", dir);
}
import { resolve } from 'path' // 主要用于alias文件路径别名
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vitePluginCommonjs(),
],
  // 是否自动在浏览器打开
  open: true,
  // 是否开启 https
  https: false,
  // 服务端渲染
  ssr: false,
  /**
   * 在生产中服务时的基本公共路径。
   * @default '/'
   */
  base: process.env.VITE_PUBLIC_PATH || '/',
  /**
   * 与“根”相关的目录，构建输出将放在其中。如果目录存在，它将在构建之前被删除。
   * @default 'dist'
   */
  outDir: 'dist',
  resolve: {
    alias: {"@":path.resolve(__dirname,"./src")}
  },
  define: {
    'process.env': process.env
  },
  // 引入第三方的配置
  //   optimizeDeps: {
  //     include: ["moment", "echarts", "axios", "mockjs"],
  //   },
  // 打包配置
  build: {
    target: 'modules',
    outDir: 'dist', //指定输出路径
    assetsDir: 'assets', // 指定生成静态资源的存放路径
    minify: 'terser', // 混淆器，terser构建后文件体积更小
  },
  // 本地运行配置，及反向代理配置
  server: {
    host: process.env.VITE_SERVER_HOST || '127.0.0.1',
    port: Number(process.env.VITE_SERVER_PORT || 8080),
    // 是否开启 https
    https: false,
    cors: true, // 默认启用并允许任何源
    open: true, // 在服务器启动时自动在浏览器中打开应用程序
    //反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
    proxy: {
      '/api': {
        target: 'http://rap2api.taobao.org/app/mock/316862/api', //代理接口
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
