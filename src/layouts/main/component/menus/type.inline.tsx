/*
 * @Description: 
 * @version: 1.0.0
 * @Author: wutao
 * @Date: 2021-07-23 16:16:04
 * @LastEditTime: 2021-07-27 15:01:20
 */
import React, { useState, useEffect } from 'react'
import { makeMenus } from './common'
import { MenuProps, TreeMenuElement } from "@/layouts/main/component/menus/menu";
import { Menu } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import styles from '../../index.less'
import { computePathInfo } from "./utils";
import { kickOut } from "@/utils/utils.barry";

export function MenuInline(props: MenuProps) {

  const { data, pathname, pathIndex } = props;
  const [instance, setInstance] = useState(0)
  const [isItemClick, setIsItemClick] = useState(false)
  const [openKeys, setOpenKeys] = useState<string[]>([])

  useEffect(() => {
    const { pathKeys, pathData } = computePathInfo(pathIndex, pathname);
    if (isItemClick) setIsItemClick(false)
    else {
      setOpenKeys(pathKeys);
      setInstance(instance + 1);
    }
  }, [pathname, pathIndex])

  function onItemClick(params: MenuInfo) {
    setOpenKeys(params.keyPath as string[])
  }

  if (!data.length) return <></>

  //SubMenu点击事件
  function onSubmenuClick(menu: TreeMenuElement) {
    let current: TreeMenuElement | undefined = menu;
    while (current) {
      if (!openKeys.includes(menu.id)) {
        openKeys.push(menu.id);
      } else {
        kickOut(openKeys, menu.id);
      }
      current = current.parent;
    }

    setOpenKeys(openKeys);
  }

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      selectedKeys={openKeys}
      onClick={onItemClick}
      className={styles.layout_left_menu}
    >
      {makeMenus(data, true, onSubmenuClick)}
    </Menu>
  )
}