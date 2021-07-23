/*
 * @Description: 
 * @version: 1.0.0
 * @Author: wutao
 * @Date: 2021-07-21 16:37:52
 * @LastEditTime: 2021-07-23 17:11:20
 */

import React, { useState, useEffect } from 'react'
import { MenuProps } from './menu'
import { Menu } from 'antd'
import { computePathInfo } from "./utils";
import { makeMenus } from './common'

export function MenuHorizontal(props: MenuProps) {
  const { data, pathIndex, pathname, onChange } = props;
  const [init, setInit] = useState(false)
  const [instance, setInstance] = useState(0)
  const [isItemClick, setIsItemClick] = useState(false)
  const [defaultOpenKeys, setDefaultOpenKeys] = useState<string[]>([])

  // useEffect(() => {
  //   const { pathKeys, pathData } = computePathInfo(pathIndex, pathname);
  //   onChange({ pathKeys, pathData });
  //   if (isItemClick) setIsItemClick(false)
  //   else {
  //     setDefaultOpenKeys(pathKeys);
  //     setInstance(instance + 1);
  //   }
  // }, [pathname, pathIndex])

  if (!data.length) return <></>

  // if (!init) {
  //   setDefaultOpenKeys(computePathInfo(pathIndex, pathname).pathKeys)
  //   setInit(true)
  // }

  // function onItemClick() {
  //   setIsItemClick(true)
  // }

  return (
    <Menu
      key={instance}
      mode="horizontal"
      defaultSelectedKeys={defaultOpenKeys}
    // onClick={onItemClick}
    >
      {makeMenus(data)}
    </Menu>
  )
}