/*
 * @Description: 
 * @version: 1.0.0
 * @Author: wutao
 * @Date: 2021-07-16 16:33:47
 * @LastEditTime: 2021-07-26 14:33:21
 */
import React from 'react'
import { MenuProps } from './menu'
import { MenuHorizontal } from './type.horizontal'
import { MenuInline } from './type.inline'

export enum MENU_MODE {
  INLINE = 'inline',
  HORIZONTAL = 'horizontal',
}

interface Props extends MenuProps {
  mode: MENU_MODE,
}

export function Menus(props: Props) {
  const { mode } = props
  return mode === MENU_MODE.HORIZONTAL ? <MenuHorizontal {...props} /> : <MenuInline {...props} />
}