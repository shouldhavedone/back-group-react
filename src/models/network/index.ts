/*
 * @Description: 
 * @version: 1.0.0
 * @Author: wutao
 * @Date: 2021-07-19 11:15:54
 * @LastEditTime: 2021-07-19 11:20:49
 */

import { StringOrNot } from "@/types.barry";

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