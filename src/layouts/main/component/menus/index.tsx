/*
 * @Description: 
 * @version: 1.0.0
 * @Author: wutao
 * @Date: 2021-07-16 16:33:47
 * @LastEditTime: 2021-07-22 15:34:43
 */
import React from 'react'
import { MenuProps } from './menu'
import { MenuHorizontal } from './type.horizontal'

export enum MENU_MODE {
  INLINE = 'inline',
  HORIZONTAL = 'horizontal',
}

interface Props extends MenuProps {
  mode: MENU_MODE,
}

export function Menus(props: Props) {
  const { mode } = props
  return mode === MENU_MODE.HORIZONTAL ? <MenuHorizontal {...props} /> : <></>
}