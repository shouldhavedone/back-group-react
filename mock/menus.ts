/*
 * @Description: 
 * @version: 1.0.0
 * @Author: wutao
 * @Date: 2021-07-19 10:08:52
 * @LastEditTime: 2021-07-19 13:37:29
 */
import { RawMenuElement } from "@/layouts/main/component/menus/menu";

export const MENU_DATA_MOCK: RawMenuElement[] = [
  {
    id: '1',
    pid: '',
    name: 'test1',
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
    name: 'test2',
    icon: 'icon-test',
    path: '/test2',
    sort: 1,
    status: 1,
    description: '我是一个测试的菜单',
    createtime: new Date(),
  }
]