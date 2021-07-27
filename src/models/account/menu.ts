/*
 * @Description: 
 * @version: 1.0.0
 * @Author: wutao
 * @Date: 2021-07-26 15:58:58
 * @LastEditTime: 2021-07-27 10:40:52
 */
import { useState } from 'react'
import { useRequest } from 'ahooks';
import { reqSuccess } from "@/utils/request";
import { RawMenuElement } from "@/layouts/main/component/menus/menu";
import { createModel } from 'hox';

function useMenu() {
  const [subMenus, setSubMenus] = useState<RawMenuElement[]>([])

  const getSubMenus = useRequest((data = {}) => {
    return {
      url: '/api-auth/oauth/menu/getSubmenu',
      method: "post",
      data
    }
  }, {
    onSuccess(res: any) {
      if(reqSuccess(res)) {
        setSubMenus(res.data.Menus)
      }
    }
  })

  return {
    subMenus,
    setSubMenus,
    getSubMenus: getSubMenus.run,
  }
}

export const useMenuModel = createModel(useMenu)