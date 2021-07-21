/*
 * @Description: 
 * @version: 1.0.0
 * @Author: wutao
 * @Date: 2021-07-19 10:17:55
 * @LastEditTime: 2021-07-19 10:17:55
 */

import React from 'react'
import { Spin } from 'antd'
// import style from "@/layouts/main/index.less";

export const Loading: React.FC<{ tip?: string }> = ({ tip = '加载中...' }) => <div ><Spin tip={tip} /></div>