/*
 * @Description: 
 * @version: 1.0.0
 * @Author: wutao
 * @Date: 2021-07-16 16:33:47
 * @LastEditTime: 2021-07-26 14:45:08
 */
import { Result, Button } from 'antd';
import { history } from 'umi';
import React from 'react';
class DidCatch extends React.PureComponent {
  state = {
    hasError: false,
    error: null
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <Result
        status="error"
        title="系统错误"
        subTitle="系统内部执行错误，请联系管理员."
        extra={[
          <Button type="primary" onClick={() => history.goBack()}>
            返回
          </Button>
        ]}
      />;
    }
    return this.props.children;
  }
}


export default DidCatch;