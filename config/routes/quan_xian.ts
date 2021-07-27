/*
 * @Description: 
 * @version: 1.0.0
 * @Author: wutao
 * @Date: 2021-07-27 10:44:30
 * @LastEditTime: 2021-07-27 10:56:41
 */
import { IRoute } from 'umi';

export const quan_xian_routes: IRoute = {
  exact: true,
  name: '权限管理系统',
  routes: [
    { exact: true, path: '/quan_xian/test', component: 'quan_xian/test' },
    { exact: true, path: '/quan_xian/cai_dan_guan_li', component: 'quan_xian/cai_dan_guan_li' },
    { exact: true, path: '/quan_xian/yong_hu_guan_li', component: 'quan_xian/yong_hu_guan_li' },
    { exact: true, path: '/quan_xian/zhang_hu_guan_li', component: 'quan_xian/zhang_hu_guan_li' },
    { exact: true, path: '/quan_xian/zi_dian_guan_li', component: 'quan_xian/zi_dian_guan_li' },
  ]
}