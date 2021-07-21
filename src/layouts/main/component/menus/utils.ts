import { IRoute } from 'umi';

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
  const result:IResultMenus = {
    path: {}
  };
  const mounts: IRoute[] = [];
  result.menus = cycleMenus(routes, (menu: IRoute): void=>{
    if(menu.mount) {
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
  for(let i=0; i<mounts.length; i++) {
    result.path[mounts[i].path!] = result.path[mounts[i].mount];
  }
  return result;
}

function cycleMenus(routes: IRoute[], cb: Function, key = '') {
  const menus: IRoute[] = [];
  for(let i = 0; i< routes.length; i++) {
    const route = routes[i];
    if(route.name && route.showMenu !== false && !route.unaccessible) {
      const menu = {
        ...route,
        key: key + i
      };
      if(menu.routes) {
        menu.routes = cycleMenus(menu.routes, cb, key+i+'_');
        if(menu.routes.length === 0) {
          delete menu.routes;
        }
      }
      cb(menu);
      menus.push(menu);
      continue;
    }
    // 自动子项往上提
    if(route.routes) {
      const flatMenu = cycleMenus(route.routes, cb, key+i+'_');
      if(flatMenu.length > 0) {
        menus.push(...flatMenu);
      }
      continue;
    }
    // 处理挂载
    if(route.mount) {
      const mountMenu = {
          ...route,
          key: key + i
        };
      cb(mountMenu);
    }
  }
  return menus;
}