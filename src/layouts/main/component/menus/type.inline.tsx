/*
 * @Description: 
 * @version: 1.0.0
 * @Author: wutao
 * @Date: 2021-07-23 16:16:04
 * @LastEditTime: 2021-07-26 14:37:07
 */
import React, { useState } from 'react'
import { makeMenus } from './common'
import { MenuProps, TreeMenuElement } from "@/layouts/main/component/menus/menu";
import { Menu } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import styles from '../../index.less'


export function MenuInline(props: MenuProps) {

  const { data, pathname, pathIndex } = props;

  const [openKeys, setOpenKeys] = useState<string[]>([])

  function onItemClick(params:MenuInfo) {
    setOpenKeys(params.keyPath as string[])
  }

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      selectedKeys={openKeys}
      onClick={onItemClick}
      className={styles.layout_left_menu}
    >
      {makeMenus(data)}
    </Menu>
  )
}