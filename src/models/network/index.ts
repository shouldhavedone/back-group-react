/*
 * @Description: 
 * @version: 1.0.0
 * @Author: wutao
 * @Date: 2021-07-19 11:15:54
 * @LastEditTime: 2021-07-21 14:25:38
 */
import { useState } from "react";
import { StringOrNot } from "@/types.barry";
import { createModel } from "hox";

interface Params {
  modalLoading: boolean;
  drawerLoading: boolean;
  hideLoading: boolean;
  inRequest: boolean;
  loadingContent: StringOrNot;
}

/**
 * 请求事件监听对象 [单例模式]
 */
export class RequestEvent {
  static NAME = 'RequestEvent';
  static _instance: RequestEvent;
  static getInstance() {
    if (!this._instance) {
      this._instance = new RequestEvent();
    }
    return this._instance;
  }

  count = 0;
  inRequest: boolean = false;
  modalLoading: boolean = false;
  drawerLoading: boolean = false;
  hideLoading: boolean = false;
  loadingContent: StringOrNot;
  target: CustomEvent = new CustomEvent(RequestEvent.NAME);
}

function networkModel() {
  const [networkInfo, setNetworkInfo] = useState<Params>({
    modalLoading: false,
    drawerLoading: false,
    hideLoading: false,
    inRequest: false,
    loadingContent: '',
  })
  return {
    networkInfo,
    setNetworkInfo,
  }
}


export const useNetworkModel = createModel(networkModel)