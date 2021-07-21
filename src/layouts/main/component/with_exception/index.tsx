/*
 * @Description: 
 * @version: 1.0.0
 * @Author: wutao
 * @Date: 2021-07-16 16:33:47
 * @LastEditTime: 2021-07-20 17:10:24
 */
import React, { useState } from 'react';
import { getMatchMenu } from '@umijs/route-utils';
import Exception404 from './404';
import Exception403 from './403';
import DidCatch from './did_catch';
import { IRoute } from 'umi';
import { Spin } from 'antd';

import { useCreation, useMount } from 'ahooks';

interface IWithExceptionProps {
  routes: IRoute[];
  pathname: string;
}

export const layoutLoadingEvent = new CustomEvent('setLoading');

interface IlayoutLoadingEvent extends Event {
  loading?: boolean
}

const WithException: React.FC<IWithExceptionProps> = function ({ children, pathname, routes }) {
  const currentPathConfig = useCreation(() => {
    // 动态路由匹配
    return getMatchMenu(pathname, routes).pop();
  }, [pathname, routes]);

  const [loading, setLoading] = useState(false);
  useMount(() => {
    const temp: Boolean[] = [];
    addEventListener('setLoading', (e: IlayoutLoadingEvent) => {
      if (e.loading) {
        temp.push(e.loading);
        setLoading(true)
      } else {
        temp.splice(0, 1);
        if (temp.length === 0) {
          setLoading(false)
        }
      }
      console.log(temp)
    })
  })


  if (!currentPathConfig) {
    return <Exception404 />;
  }
  if (currentPathConfig.unaccessible) {
    return <Exception403 />;
  }

  return <Spin spinning={loading}><DidCatch>{children}</DidCatch></Spin>;
}

export default WithException;