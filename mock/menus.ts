/*
 * @Description: 
 * @version: 1.0.0
 * @Author: wutao
 * @Date: 2021-07-19 10:08:52
 * @LastEditTime: 2021-07-21 16:26:46
 */
import { RawMenuElement } from "@/layouts/main/component/menus/menu";

export const MENU_DATA_MOCK: RawMenuElement[] = [
  {
    id: '1',
    pid: '',
    name: '首页',
    icon: 'icon-test',
    path: '/test',
    sort: 1,
    status: 1,
    description: '我是一个测试的菜单',
    createtime: new Date(),
  },
  {
    id: '2',
    pid: '',
    name: '博客管理系统',
    icon: 'icon-test',
    path: '/test2',
    sort: 1,
    status: 1,
    description: '我是一个测试的菜单',
    createtime: new Date(),
  },
  {
    id: '3',
    pid: '',
    name: '系统设置',
    icon: 'icon-test',
    path: '/test3',
    sort: 1,
    status: 1,
    description: '我是一个测试的菜单',
    createtime: new Date(),
  }
]