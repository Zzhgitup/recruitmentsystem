import React, { memo, useEffect, useRef } from 'react';
import type { ElementRef, FC, ReactNode } from 'react';
import { Container } from './style';
import { Button, Form, Input, message } from 'antd';
import { usedispatch } from '@/store';
import { fetchlogin } from './store';
import { useNavigate } from 'react-router-dom';
import useDanerceHook from '@/hooks/useDancer';
interface IProps {
  children?: ReactNode;
}
interface Idancer {
  setDanceshow: (show: boolean) => void;
}
const Login: FC<IProps> = () => {
  const buttonref = useRef<HTMLButtonElement>(null);
  const { setDanceshow } = useDanerceHook<Idancer>(buttonref);
  const dispath = usedispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    //登录
    dispath(fetchlogin({ password: values.password, studentID: values.username })).then(
      (result: any) => {
        console.log(result);
        if (result.payload.code == 200) {
          messageApi
            .open({
              type: 'success',
              content: '登录成功'
            })
            .then(() => {
              navigate('/user');
            });
        } else {
          messageApi.open({
            type: 'error',
            content: '登陆失败'
          });
        }
      }
    );
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Container>
      {contextHolder}
      <div className="loginleft">
        <img src="https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/Saly-3@2x.png" alt="" />
      </div>
      <div className="login">
        <div className="title">Welcome to future</div>
        <h1 className="logintext">登录</h1>
        <div className="form">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            size="large"
            layout="vertical"
            initialValues={{ remember: true }}
            style={{ width: '100%' }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: '请输入你的用户名！！！！' }]}
            >
              <Input
                className="myselfinpuit"
                onInput={() => {
                  setDanceshow(false);
                  buttonref.current?.classList.add('mysplice');
                }}
              />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入你的密码！！！！' }]}
            >
              <Input.Password
                className="myselfinpuit"
                onInput={() => {
                  setDanceshow(false);
                  buttonref.current?.classList.add('mysplice');
                }}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
              <Button type="primary" ref={buttonref} htmlType="submit" className="myselfsub">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      <div className="loginright">
        <img src="https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/Saly-2@2x.png" alt="" />
      </div>
    </Container>
  );
};
export default memo(Login);
