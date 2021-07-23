/*
 * @Description: 
 * @version: 1.0.0
 * @Author: wutao
 * @Date: 2021-07-23 15:33:01
 * @LastEditTime: 2021-07-23 16:08:32
 */
import React from 'react'
import { TreeMenuElement } from './menu'
import { Menu } from 'antd'
import { Link } from 'umi'

const { SubMenu } = Menu;

// 创建MenuItem
const makeItem = (menu: TreeMenuElement) => {
  let icon = menu.icon ? `icon iconfont  ${menu.icon}` : ''
  return (
    <Menu.Item key={menu.id}>
      {/* {icon ? <i className={icon} /> : null} */}
      {menu.path ? <Link to={menu.path}>{menu.name}</Link> : undefined}
    </Menu.Item>
  )
}

// 创建Menu组件
export const makeMenus = (menus: TreeMenuElement[], onSubMenuClick?:(menu: TreeMenuElement)=>void) => {
  return menus.map((menu: TreeMenuElement) => {
    if (menu.children?.length) {
      return <SubMenu key={menu.id} title={menu.name} onTitleClick={() => onSubMenuClick?.(menu)}>
        {
          makeMenus(menu.children, onSubMenuClick)
        }
      </SubMenu>
    } else {
      return makeItem(menu)
    }
  })
}