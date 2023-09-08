import React, { memo } from 'react';
import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Select, message } from 'antd';
import JSConfetti from 'js-confetti';
import { commituse } from '../../server';
import { useFunDebounce } from '@/hooks';
import './css/index.less';
const { Option } = Select;
interface Props {
  childern?: ReactNode;
}
const Information: FC<Props> = () => {
  const confetti = new JSConfetti();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const success = (text: string) => {
    messageApi.open({
      type: 'success',
      content: text,
      style: {
        marginTop: '40vh'
      }
    });
    confetti.addConfetti({
      emojis: ['😍', '🎁', '💕', '🌹'],
      confettiNumber: 30
    });
  };
  const error = () => {
    messageApi.open({
      type: 'warning',
      content: '出现错误了',
      style: {
        marginTop: 40 + 'vh'
      }
    });
  };
  const onFinishFailed = useFunDebounce(
    (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    },
    { delay: 500, leading: true }
  );
  const onFinish = useFunDebounce(
    (values: any) => {
      console.log('Success:', values);
      commituse({
        claas: values.class,
        email: values.email,
        sex: Number(values.select),
        studentId: values.studentcode,
        username: values.username,
        qqNumber: values.qqNumber
      })
        .then((data) => {
          if (data.status == 500) {
            success('已经报过名了哦🧡');
            setTimeout(() => {
              navigate('/success', {
                state: { title: '重复报名', flag: 'info', text: '已经报过名了' }
              });
            }, 700);
          } else {
            success('报名成功');
            setTimeout(() => {
              navigate('/success', {
                state: {
                  title: '报名成功',
                  flag: 'success',
                  text: '报名成功！，扫描下方二维码加入群聊'
                }
              });
            }, 700);
          }
        })
        .catch((err) => {
          error();

          console.log(err);
        });
    },
    { delay: 500, leading: true }
  );
  return (
    <div className="Information">
      {contextHolder}
      <div className="title">
        <img src="https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/baomingmsg.gif" alt="" />
      </div>
      <div className="commitmsg">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 390 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="姓名"
            name="username"
            rules={[{ required: true, message: '请输入名字' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="学号"
            name="studentcode"
            rules={[
              {
                required: true,
                pattern: /^\d{11}$/,
                message: '请输入正确的学号'
              }
            ]}
            validateStatus="success"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="select"
            label="性别"
            hasFeedback
            rules={[{ required: true, message: '请选择性别' }]}
          >
            <Select placeholder="请填写性别">
              <Option value="1">男</Option>
              <Option value="0">女</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="班级"
            hasFeedback
            name="class"
            rules={[{ required: true, message: '请输入班级' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              {
                required: true,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: '请输入正确的邮箱'
              }
            ]}
            validateStatus="success"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="QQ号"
            name="qqNumber"
            rules={[
              {
                required: true,
                message: '请输入QQ',
                pattern: /^[1-9][0-9]{4,10}$/
              }
            ]}
            validateStatus="success"
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
            <Button type="primary" htmlType="submit" style={{ width: '155px', height: '45px' }}>
              提交信息
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default memo(Information);
