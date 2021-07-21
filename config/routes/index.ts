/*
 * @Description: 
 * @version: 1.0.0
 * @Author: wutao
 * @Date: 2021-07-16 16:33:05
 * @LastEditTime: 2021-07-20 16:58:29
 */
import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/',
    component: '../layouts/main',
    routes: [
      {exact: true, path: '/home', component: 'home'},
    ]
  }
]

export default routes;
