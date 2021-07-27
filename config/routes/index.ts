/*
 * @Description: 
 * @version: 1.0.0
 * @Author: wutao
 * @Date: 2021-07-16 16:33:05
 * @LastEditTime: 2021-07-26 14:27:50
 */
import { IRoute } from 'umi';
import { quan_xian_routes } from './quan_xian'

const routes: IRoute[] = [
  {
    path: '/',
    component: '../layouts/main',
    routes: [
      { exact: true, path: '/home', component: 'home' },
      { exact: true, path: '/blog', component: 'blog' },
      quan_xian_routes,
    ]
  }
]

export default routes;