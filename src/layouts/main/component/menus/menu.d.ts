/*
 * @Description: 
 * @version: 1.0.0
 * @Author: wutao
 * @Date: 2021-07-19 10:00:54
 * @LastEditTime: 2021-07-19 10:06:13
 */
export interface RawMenuElement {
  id: string,
  name: string,
  path: string,
  sort: number,
  icon: string,
  status: number,
  pid: string,
  description: string,
  createtime: Date,
}