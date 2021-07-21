import React from 'react';
import { UseRequestProvider } from 'ahooks';
import request from '@/utils/request';
import 'antd/dist/antd.css';
import UseRequestContext from '@ahooksjs/use-request/es/configContext';

// hox的组件数是独立的，为了同步顶层组件共享数据，在2.0之前的临时解决方案
// @ts-ignore
UseRequestContext._currentValue2.requestMethod = requestMethod;
// @ts-ignore
UseRequestContext._currentValue2.throwOnError = true;
// @ts-ignore
UseRequestContext._currentValue2.manual = true;

// @ts-ignore
UseRequestContext._currentValue.requestMethod = requestMethod;
// @ts-ignore
UseRequestContext._currentValue.throwOnError = true;
// @ts-ignore
UseRequestContext._currentValue.manual = true;


export function rootContainer(container: React.ReactElement) {
  const props = {
    value: {
      throwOnError: true,
      manual: true,
      requestMethod
    }
  }
  return React.createElement(UseRequestProvider, props, container);
}

function requestMethod(service: any) {
  switch (typeof service) {
    case 'string':
      return request.get(service);
    case 'object':
      const { url, ...opt } = service;
      return request(url, opt);
    default:
      throw new Error('异步请求参数异常！');
  }
}