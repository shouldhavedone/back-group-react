/*
 * @Description: 
 * @version: 1.0.0
 * @Author: wutao
 * @Date: 2021-07-16 16:33:05
 * @LastEditTime: 2021-07-20 15:21:58
 */
import { defineConfig } from 'umi';
import routes from './routes';

const DataSource_IP = "http://127.0.0.1:7001"

export default defineConfig({
  cssModulesTypescriptLoader: {},
  title: "SBMS统一后台管理系统",
  "theme": {
    "primary-color": "#2AAF8F",
  },
  targets: {
    ie: 11
  },
  routes: routes,

  proxy: {
    '/api-auth': {
      target: DataSource_IP,
    },
  }
});