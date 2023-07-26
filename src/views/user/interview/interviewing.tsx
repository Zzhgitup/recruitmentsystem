import React, { memo, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { message, Card, Form, Radio, Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { userInfo, resumeById, setInterview, setScore, getScore } from '@/service/modules/user';
import PersonInfo, { PersonInfoType } from '@/components/PersonInfo';
import ResumeCard, { ResumeInfoType } from '@/components/ResumeCard';
import jwtDecode from 'jwt-decode';
// import { useAppselect } from '@/store';
interface IProps {
  children?: ReactNode;
}
const scoreArr = [
  ['attitude', '态度', true],
  ['know', '小组了解程度', true],
  ['communicationSkills', '沟通能力分', true],
  ['psychologicalQualities', '心理素质分', true],
  ['expressiveSkill', '表达能力', true],
  ['selfEvaluation', '自我评价', true],
  ['resilience', '应变能力', true],
  ['selfLearning', '自学能力', true],
  ['teamworkSkills', '团队合作能力', true],
  ['thinkingPersonality', '思维性格分数', true]
];
const Interviewing: FC<IProps> = () => {
  // const userinfo = useAppselect((state) => state.user);
  // console.log(userinfo);
  const [userForm, setuserForm] = useState<PersonInfoType>({
    id: 1,
    claas: 'Class A',
    username: 'John Doe',
    sex: 1,
    status: 1,
    firstScore: 90,
    secondScore: 90,
    thirdScore: 90,
    level: 2
  });
  const [resume, setresume] = useState<ResumeInfoType>({
    id: '1',
    userId: 123,
    createTime: '2021-08-01 10:00:00'
  });
  const navigator = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    const userID = sessionStorage.getItem('interviewUserId');
    if (userID) {
      getUserForm(parseInt(userID));
    } else {
      navigator('../interview', { replace: false });
    }
  }, []);
  const getUserForm = async (eId: number) => {
    const dataAll = await Promise.all([userInfo({ id: eId }), resumeById({ userId: eId })]);
    if (dataAll[0].status == 200) {
      setuserForm(dataAll[0].data);
    } else {
      message.error('获取信息失败！');
    }
    if (dataAll[1].status == 200) {
      if (dataAll[1].data == '无数据') {
        dataAll[1].data = {
          id: '1',
          userId: 123,
          createTime: '2021-08-01 10:00:00'
        };
      }
      setresume(dataAll[1].data);
    } else {
      messageApi.open({
        type: 'error',
        content: '获取信息失败！'
      });
    }
  };
  const validateMessages = {
    required: '请填写您要添加的${label}!'
  };
  const [scoreForm] = Form.useForm();
  const endInterview = async () => {
    const userinfo: any = jwtDecode(localStorage.getItem('ZXtoken') as string);
    const level = userForm.status - 2;
    const userId = userForm.id;
    const setInterviewData = {
      interviewerId: userinfo.id,
      intervieweeId: userId,
      level: level
    };
    scoreForm.setFieldValue('level', level);
    scoreForm.setFieldValue('intervieweeId', userId);
    try {
      const result1 = await setInterview(setInterviewData);
      console.log(result1);

      const result2 = await setScore({
        ...scoreForm.getFieldsValue(),
        intervieweeId: userId,
        level: level
      });
      console.log(result2);

      const result3 = await getScore({ id: userId, level: level });
      console.log(result3);

      if (result1.status == 200 && result2.status == 200 && result3.status == 200) {
        message.success('评分成功！');
      } else {
        message.error('评分失败！');
      }
      // ... 其他异步操作
    } catch (error) {
      console.error(error);
    }
    console.log(setInterviewData);

    console.log({ ...scoreForm.getFieldsValue(), intervieweeId: userId, level: level });
  };
  const [openConfirm, setopenConfirm] = useState(false);
  return (
    <div>
      {contextHolder}
      <Modal
        title="进入面试"
        open={openConfirm}
        onOk={endInterview}
        onCancel={() => setopenConfirm(false)}
        okText="确认"
        cancelText="取消"
      >
        <p>
          你确认结束 <span style={{ color: '#1677FF' }}>{userForm.username}</span> 的面试吗？
        </p>
      </Modal>
      <Card title="面试者信息">
        <div className="userCard" style={{ display: 'flex' }}>
          <PersonInfo personInfo={userForm} />
          <ResumeCard resumeInfo={resume} />
        </div>
      </Card>
      <Card title="面试评分">
        <Form
          layout="horizontal"
          form={scoreForm}
          size="large"
          style={{ marginBottom: '10px' }}
          labelCol={{ span: 4 }}
          validateMessages={validateMessages}
          name="scoreFormName"
          onFinish={() => setopenConfirm(true)}
        >
          {scoreArr.map((item) => {
            return (
              <Form.Item
                rules={[{ required: item[2] as boolean }]}
                label={item[1]}
                key={item[0] as string}
                name={item[0] as string}
              >
                <Radio.Group>
                  {Array.from({ length: 11 }, (v, i) => i).map((itemx) => {
                    return (
                      <Radio value={itemx} key={itemx}>
                        {itemx}
                      </Radio>
                    );
                  })}
                </Radio.Group>
              </Form.Item>
            );
          })}
          <Form.Item>
            <Button
              type="primary"
              style={{ marginLeft: '80px' }}
              // icon={<SearchOutlined />}
              htmlType="submit"
            >
              结束面试
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default memo(Interviewing);
