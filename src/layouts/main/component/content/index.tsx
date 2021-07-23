/*
 * @Description: 
 * @version: 1.0.0
 * @Author: wutao
 * @Date: 2021-07-21 10:53:20
 * @LastEditTime: 2021-07-23 17:26:20
 */

import React, { createContext, useState, useEffect } from 'react'
import { Layout, notification } from 'antd'
import { IRouteProps, history } from 'umi'
// import { useCreation } from "ahooks";
import { useAccountModel } from "@/models/account/account";
import { transformRoute } from '@umijs/route-utils'
import { PathInfo } from '@/layouts/main/component/menus/menu'
import { RequestEvent, useNetworkModel } from "@/models/network";
import styles from '../../index.less'
import LOGO from '../../../../../public/images/login/logo.png'
import WithException from "@/layouts/main/component/with_exception";

import { Menus, MENU_MODE } from '../menus'

const { Header, Content } = Layout;

interface RootContentValue extends PathInfo {
  [index: string]: any,
  [number: number]: any,
}

export const RootContext = createContext<RootContentValue>({
  pathData: [],
  pathKeys: [],
})

export const ContentPage: React.FC<IRouteProps> = ({ children, route, location: { pathname } }) => {

  const { rawMenus, fromLogin, setFromLogin } = useAccountModel()
  const { setNetworkInfo } = useNetworkModel();
  const [pathInfo, setPathInfo] = useState<PathInfo>({
    pathKeys: [],
    pathData: [],
  })

  const context: RootContentValue = {
    ...pathInfo
  }
  console.log('route：', route)

  const { menuData: routeData } = transformRoute(
    route.routes,
    undefined,
    undefined,
    true,
  );

  // const { } = useCreation(() => parseMenus(rawMenus), [rawMenus]);

  const PATH_INDEX = {
    '/home': {
      id: 'f1e54755-264e-43ee-8c66-a603b4da5a13',
      name: '首页',
      path: '/home',
      icon: 'iconhome',
      status: 1,
      createtime: new Date(),
    },
    '/blog': {
      id: 'fc747510-d768-41c3-82a8-afbe20bc0921',
      name: '博客系统',
      path: '/blog',
      icon: 'iconblog',
      status: 1,
      createtime: new Date(),
    },
    '/quan_xian': {
      id: '4511ae0f-7b5a-46c5-a8d4-a23f453a59d8',
      name: '权限管理系统',
      path: '/quan_xian',
      icon: 'iconquanxian',
      status: 1,
      createtime: new Date(),
    },
  }

  useEffect(() => {
    if (fromLogin) {
      setFromLogin(false);
      history.replace('/home');
      notification.success({
        message: '登录成功',
        description: '欢迎使用本系统'
      })
    }
    const event = RequestEvent.getInstance();
    addEventListener(RequestEvent.NAME, () => {
      if (event.inRequest) {
        event.count++;
        setNetworkInfo({
          drawerLoading: event.drawerLoading,
          inRequest: true,
          modalLoading: event.modalLoading,
          hideLoading: event.hideLoading,
          loadingContent: event.loadingContent,
        });
      } else {
        event.count--;
        if (event.count <= 0) {
          setNetworkInfo({
            drawerLoading: false,
            inRequest: false,
            modalLoading: false,
            hideLoading: false,
            loadingContent: '',
          });
          event.count = 0;
        }
      }
    })
  }, [])

  console.log('children:', children)

  return (
    <RootContext.Provider value={context}>
      <Layout className={styles.layout_box}>
        <Header className={styles.header}>
          <img src={LOGO} alt="logo" width={200} height={40} />

          <Menus mode={MENU_MODE.HORIZONTAL} data={rawMenus} pathIndex={PATH_INDEX} pathname={pathname} onChange={params => setPathInfo(params)} />

          <div className={styles.logout} onClick={() => {
            history.push({
              pathname: '/login'
            })
          }}>
            <i className="icon iconfont iconlog-out"></i>
            <span>退出系统</span>
          </div>
        </Header>
        <Layout>
          <WithException backendRoutes={PATH_INDEX} pathname={pathname} routes={routeData}>
            <Content>
              {children}
            </Content>
          </WithException>
        </Layout>
      </Layout>
    </RootContext.Provider>

  )
}