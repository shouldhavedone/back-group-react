import React from 'react';
import { Result, Button } from 'antd';
import { history } from 'umi';

const Exception404 = function () {
  return <Result
    status="404"
    title="404"
    subTitle="你访问的页面不存在。"
    extra={
      <Button type="primary" onClick={()=>history.goBack()}>
        返回
      </Button>
    }
  />
}

export default Exception404;