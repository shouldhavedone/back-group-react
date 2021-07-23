/*
 * @Description: 
 * @version: 1.0.0
 * @Author: wutao
 * @Date: 2021-07-16 16:33:47
 * @LastEditTime: 2021-07-22 15:25:23
 */
import { IRoute } from 'umi';
import { IndexOfPaths } from "@/layouts/main/component/menus/menu";

interface IResultMenus {
  menus?: IRoute[];
  path: {
    [key: string]: {
      opened: string[],
      selected: string[]
    }
  }
}

export const parseMenus = function (routes: IRoute[]) {
  const result: IResultMenus = {
    path: {}
  };
  const mounts: IRoute[] = [];
  result.menus = cycleMenus(routes, (menu: IRoute): void => {
    if (menu.mount) {
      mounts.push(menu);
      return;
    }
    result.path[menu.path!] = {
      opened: [],
      selected: [menu.key]
    }
    const openKeys = menu.key.split('_');
    let keystr = '';
    for (let i = 0; i < openKeys.length - 1; i++) {
      if (i !== 0) {
        keystr += '_';
      }
      keystr += openKeys[i];
      result.path[menu.path!].opened.push(keystr);
    }
  });
  for (let i = 0; i < mounts.length; i++) {
    result.path[mounts[i].path!] = result.path[mounts[i].mount];
  }
  return result;
}

function cycleMenus(routes: IRoute[], cb: Function, key = '') {
  const menus: IRoute[] = [];
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    if (route.name && route.showMenu !== false && !route.unaccessible) {
      const menu = {
        ...route,
        key: key + i
      };
      if (menu.routes) {
        menu.routes = cycleMenus(menu.routes, cb, key + i + '_');
        if (menu.routes.length === 0) {
          delete menu.routes;
        }
      }
      cb(menu);
      menus.push(menu);
      continue;
    }
    // 自动子项往上提
    if (route.routes) {
      const flatMenu = cycleMenus(route.routes, cb, key + i + '_');
      if (flatMenu.length > 0) {
        menus.push(...flatMenu);
      }
      continue;
    }
    // 处理挂载
    if (route.mount) {
      const mountMenu = {
        ...route,
        key: key + i
      };
      cb(mountMenu);
    }
  }
  return menus;
}

/**
 * 计算路径并返回
 * @param pathIndex
 * @param pathname
 */
export function computePathInfo(pathIndex: IndexOfPaths, pathname: string) {
  const pathKeys = [], pathData = [];
  let current = pathIndex[pathname];
  while (current) {
    pathKeys.unshift(current.id);
    pathData.unshift(current);
    current = current.parent;
  }
  return { pathKeys, pathData };
}


