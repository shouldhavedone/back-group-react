/*
 * @Description: 
 * @version: 1.0.0
 * @Author: wutao
 * @Date: 2021-07-20 16:54:26
 * @LastEditTime: 2021-07-23 17:23:57
 */
import React from 'react';
import { Skeleton } from 'antd';

export const HomePage: React.FC = () => {
  return (
    <Skeleton active avatar paragraph={{ rows: 4 }} />
  )
}