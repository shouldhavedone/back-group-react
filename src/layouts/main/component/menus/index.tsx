import { Menu } from 'antd';
import { useCreation } from 'ahooks';
import { Link, IRoute } from 'umi';
import { endsWith } from 'lodash';
import React, { useState, useEffect } from 'react';
import { parseMenus } from './utils';
import MenuIcon from '../icon';

const { SubMenu } = Menu;

interface menuProps {
  routes: IRoute[],
  pathname: string
}

const MenuComponent:React.FC<menuProps> = function ({routes, pathname}) {
  const data = useCreation(() => {
    return parseMenus(routes!);
  }, [routes]);

  const [menuSelected, setMenuSelect] = useState<string[]>([]);
  const [menuOpened, setMenuOpen] = useState<any[]>([]);

  useEffect(()=>{
    if(pathname.length > 1 && endsWith(pathname, '/')) {
      pathname = pathname.substr(0, pathname.length - 1);
    }
    const key = data.path[pathname];
    if(key) {
      setMenuSelect(key.selected);
      setMenuOpen(key.opened);
    }
  }, [pathname, routes])

  return <Menu
    mode="inline"
    style={{height: '100%', borderRight: 0}}
    selectedKeys={menuSelected}
    onOpenChange={(openkey) => setMenuOpen(openkey)}
    openKeys={menuOpened}
    >
      {
        makeMenus(data.menus!)
      }
    </Menu>;

}

function makeMenus(menus: any[]) {
  return menus.map(function (menu) {
    if (menu.routes) {
      return <SubMenu key={menu.key} icon={<MenuIcon icon={menu.icon}/>} title={menu.name}>
        {
          makeMenus(menu.routes)
        }
      </SubMenu>
    } else {
      return <Menu.Item key={menu.key} icon={<MenuIcon icon={menu.icon}/>}>
        <Link to={menu.path}>{menu.name}</Link>
      </Menu.Item>;
    }
  });
}

export default MenuComponent;