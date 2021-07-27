/*
 * @Description: 
 * @version: 1.0.0
 * @Author: wutao
 * @Date: 2021-07-19 10:00:54
 * @LastEditTime: 2021-07-27 14:16:03
 */
export interface RawMenuElement {
  id: string,
  name: string,
  path: string,
  sort?: number,
  icon: string,
  status: number,
  pid?: string,
  description?: string,
  createtime: Date,
}

export interface TreeMenuElement extends RawMenuElement {
  Menus?: TreeMenuElement[],
  parent?: TreeMenuElement[],
}

export interface PathInfo {
  pathKeys: string[],
  pathData: TreeMenuElement[]
}

export interface IndexOfPaths {
  [pathname: string]: TreeMenuElement,
}

export interface MenuProps {
  data: TreeMenuElement[],
  pathname: string,
  pathIndex: IndexOfPaths,
  onChange: (arg: PathInfo) => void
}