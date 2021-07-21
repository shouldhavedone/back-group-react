/*
 * @Description: 
 * @version: 1.0.0
 * @Author: wutao
 * @Date: 2021-07-16 17:14:34
 * @LastEditTime: 2021-07-20 16:52:50
 */
import { useState } from "react";
import { createModel } from 'hox';
import { useRequest } from 'ahooks';
import { reqSuccess, RequestData } from "@/utils/request";
import { RawMenuElement } from "@/layouts/main/component/menus/menu";
import { MENU_DATA_MOCK } from "../../../mock/menus";

export const TOKEN = 'USER_TOKEN';

function useAccount() {
  const [userInfo, setUserInfo] = useState<any>({})
  const [rawMenus, setRawMenus] = useState<RawMenuElement[]>([])
  const [fromLogin, setFromLogin] = useState<boolean>(false)
  const [loginStatus, setLoginStatus] = useState<boolean>(false)

  const userLogin = useRequest(data => ({
    url: '/api-auth/oauth/user/token',
    method: 'post',
    data
  }), {
    onSuccess(res: any) {
      if (reqSuccess(res)) {
        localStorage.setItem(TOKEN, 'Bearer ' + res.data);
        setFromLogin(true);
        setLoginStatus(true);
        getUserInfo.run()
      } else {
        setLoginStatus(false)
      }
    }
  })

  const getUserInfo = useRequest(() => ({
    url: '/api-auth/oauth/user/getUserInfo',
    method: 'post',
  }), {
    onSuccess(res: RequestData) {
      if (reqSuccess(res)) {
        const rawMenus = MENU_DATA_MOCK;
        // delete res.data.sysMenus;
        setUserInfo(res.data);
        setRawMenus(rawMenus)
        setLoginStatus(true)
      } else {
        setLoginStatus(false)
      }
    }
  })

  return {
    login: userLogin.run,
    loginLoading: userLogin.loading,
    getUserInfo: getUserInfo.run,
    loginStatus,
    fromLogin,
    userInfo,
    rawMenus,
    setFromLogin,
    setRawMenus,
    setLoginStatus,
    loading: getUserInfo.loading,
  }
}

export const useAccountModel = createModel(useAccount)