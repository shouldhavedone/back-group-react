import React, { useEffect } from 'react';
import { IRouteProps } from 'umi';
import { TOKEN, useAccountModel } from "@/models/account/account";
import { LoginPage } from "../../pages/login";
import { LOGIN_ROUTE } from "@/constants/config";
import { ConfigProvider, notification } from "antd";
import { Loading } from "@/layouts/main/component/loading";
import 'moment/locale/zh-cn';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
moment.locale('zh-cn');

const LayoutComponent: React.FC<IRouteProps> = (props) => {

  const { getUserInfo, loginStatus, setRawMenus, setLoginStatus, loading } = useAccountModel()
  const { pathname } = props.location;

  useEffect(() => {
    if (pathname === LOGIN_ROUTE) {
      localStorage.clear()
      setLoginStatus(false)
      setRawMenus([])
      notification.success({
        message: '操作成功',
        description: '已成功从系统登出'
      })
    }
  }, [pathname])

  useEffect(() => {
    const hasToken = !!localStorage.getItem(TOKEN);
    if (hasToken) {
      pathname !== LOGIN_ROUTE && getUserInfo();
    } else {
      loginStatus && setLoginStatus(false)
    }
  }, [])

  if (loading) return <Loading />

  return (
    <ConfigProvider locale={zh_CN}>
      {
        loginStatus ? <h1>我是系统首页</h1> : <LoginPage />
      }
    </ConfigProvider>
  )
}

export default LayoutComponent;