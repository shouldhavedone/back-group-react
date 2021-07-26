/*
 * @Description: 
 * @version: 1.0.0
 * @Author: wutao
 * @Date: 2021-07-16 16:33:47
 * @LastEditTime: 2021-07-26 14:45:49
 */
import React from 'react';
import { getMatchMenu } from '@umijs/route-utils';
import Exception404 from './404';
import Exception403 from './403';
import DidCatch from './did_catch';
import { IRoute } from 'umi';
import { Spin } from 'antd';

import { useCreation } from 'ahooks';
import {IndexOfPaths} from "@/layouts/main/component/menus/menu";
import {useNetworkModel} from "@/models/network";

interface IWithExceptionProps {
  routes: IRoute[];
  pathname: string;
  backendRoutes:IndexOfPaths;
}

const WithException:React.FC<IWithExceptionProps> = function({children, pathname, routes, backendRoutes}) {
  const {networkInfo}=useNetworkModel();
  const currentPathConfig = useCreation(() => {
    // 动态路由匹配
    return getMatchMenu(pathname, routes).pop();
  }, [pathname, routes]);

  //umi路由匹配函数找不到路径 提示404
  if(!currentPathConfig) {
    return <Exception404 />;
  }

  //前端routes存在该路径 而后端routes没有 提示非法访问403
  if(!backendRoutes[pathname]) {
    return <Exception403 />;
  }
  const {inRequest,modalLoading,hideLoading,loadingContent}=networkInfo;
  return <Spin spinning={!hideLoading && inRequest && !modalLoading} tip={loadingContent}><DidCatch>{children}</DidCatch></Spin>
}

export default WithException;
