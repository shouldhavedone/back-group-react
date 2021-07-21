import React from 'react';
import { Result, Button } from 'antd';
import { history } from 'umi';

const Exception404 = function () {
  return <Result
    status="403"
    title="403"
    subTitle="你没有此页面的访问权限。"
    extra={
      <Button type="primary" onClick={()=>history.goBack()}>
        返回
      </Button>
    }
  />
}

export default Exception404;