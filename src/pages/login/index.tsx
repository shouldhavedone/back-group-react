/*
 * @Description: 
 * @version: 1.0.0
 * @Author: wutao
 * @Date: 2021-07-16 16:33:47
 * @LastEditTime: 2021-07-21 10:33:02
 */
import React from 'react';
import { Form, Input, Row, Col, Checkbox, Button } from 'antd';
import { useAccountModel } from "@/models/account/account";
import routes from "../../../config/routes";
import { reqSuccess } from "@/utils/request";
import { history } from 'umi';
import styles from './index.less';
import LOGO from '../../../public/images/login/logo.png'

export const LoginPage: React.FC = () => {
  const { login, loginLoading } = useAccountModel();
  const onFinish = function (values: any) {
    login(values).then((res) => {
      if (reqSuccess(res)) {
        let path: string = '';
        if (routes && routes.length && routes[0].routes) {
          path = routes[0].routes[0].path || '';
        }
        history.push(path);
      }
    });
  };

  return (
    <div className={styles.container}>
      <Row className={styles.content_box}>
        <Col xs={{ span: 24 }} md={{ span: 24 }} xl={{ span: 15 }}>
          <div className={styles.left}>
            <img src={LOGO} alt="logo" />
            <div>SBMS统一后台管理系统</div>
          </div>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 24 }} xl={{ span: 9 }}>
          <div className={styles.right}>
            <div className={styles.login_box}>
              <div>登录</div>
              <Form
                name="loginForm"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
                autoComplete="off"
              >
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name="username"
                      rules={[{ required: true, message: '请输入账户名！' }]}
                    >
                      <Input
                        prefix={<i className='icon iconfont iconuser1'></i>}
                        placeholder='账户名'
                        allowClear
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name="password"
                      rules={[{ required: true, message: '请输入密码！' }]}
                    >
                      <Input.Password
                        prefix={<i className='icon iconfont iconpassword'></i>}
                        placeholder='密码'
                        allowClear
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 24 }} sm={{ span: 12 }} className={styles.remember}>
                    <Form.Item
                      name="remember"
                    >
                      <Checkbox >下次自动登录</Checkbox>
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 12 }} className={styles.forget}>
                    <Button type="link">
                      忘记密码？
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item>
                      <Button block type='primary' htmlType="submit" loading={loginLoading} shape="round" size='large'>登录</Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div >
  );
}