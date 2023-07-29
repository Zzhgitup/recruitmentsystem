import React, { memo, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { message, Card, Form, Radio, Button, Modal, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  userInfo,
  resumeById,
  setInterview,
  setScore,
  getScore,
  interviewStatusUpload,
  setcomment
} from '@/service/modules/user';
import PersonInfo, { PersonInfoType, statusToCh } from '@/components/PersonInfo';
import ResumeCard, { ResumeInfoType } from '@/components/ResumeCard';
import jwtDecode from 'jwt-decode';
import InterviewTable from '@/components/interviewTable';
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
  const [userForms, setuserForms] = useState<PersonInfoType[]>([]);
  const [resume, setresume] = useState<ResumeInfoType>({
    id: '1',
    userId: 123,
    createTime: '2021-08-01 10:00:00'
  });
  const navigator = useNavigate();
  const [formADD] = Form.useForm();
  const [openADD, setOpenADD] = useState(false);
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
    // console.log(dataAll);

    if (dataAll[0].status == 200) {
      setuserForms(dataAll[0].data);
      setuserForm(dataAll[0].data[0]);
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
    required: '请填写您要添加的${label}!',
    string: {
      range: '${label} 应该在 ${min} 到 ${max} 之间'
    }
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
    const { comment } = scoreForm.getFieldsValue();
    try {
      const result1 = await setInterview(setInterviewData);
      console.log(result1);

      const result2 = await setScore({
        ...scoreForm.getFieldsValue(),
        intervieweeId: userId,
        level: level
      });
      console.log(result2);
      if (result2.status != 200) throw new Error(result2.msg);
      const result3 = await getScore({ id: userId, level: level });
      console.log(result3);
      if (result3.status != 200) throw new Error(result3.msg);
      const result4 = await setcomment({ id: userId, comment, level: level });
      if (result4.status != 200) throw new Error(result4.msg);
      console.log(result4);
      setopenConfirm(false);
      setOpenADD(true);
      message.success('面试成功！');
      // ... 其他异步操作
    } catch (error) {
      message.success('面试出错！');
      console.error(error);
    }
  };
  const [openConfirm, setopenConfirm] = useState(false);
  const onAddOk = async () => {
    const { status } = formADD.getFieldsValue();
    const id = userForm.id;
    if (!status) {
      message.info('请填写他的动向！');
    }
    const changeStatusForm = { id, status };
    console.log(changeStatusForm);
    try {
      const res2 = await interviewStatusUpload(changeStatusForm);
      console.log(res2);
      if (res2.status == 200) {
        message.success('面试成功！');
        setOpenADD(false);
        navigator('/user/interview');
      } else {
        message.error('添加失败！');
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };
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
      <Modal
        title="动向"
        centered
        open={openADD}
        onOk={onAddOk}
        onCancel={() => navigator('/user/interview')}
        maskClosable={false}
        width={450}
        cancelText="结束面试"
        okText="添加动向"
      >
        <Form
          layout="horizontal"
          form={formADD}
          size="large"
          style={{ marginBottom: '10px' }}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          name="addFormName"
        >
          <Form.Item
            label="动向"
            extra="您的选择将左右面试者的去留，请谨慎选择！"
            rules={[{ required: true }]}
            name="status"
          >
            <Radio.Group>
              <Radio.Button value={5}>录取</Radio.Button>
              <Radio.Button value={6}>淘汰</Radio.Button>
              {userForm.status == 4 || (
                <Radio.Button value={userForm.status + 1}>
                  {statusToCh(userForm.status + 1)}
                </Radio.Button>
              )}
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
      <Card title="面试者信息" style={{ marginBottom: 10 }}>
        <div className="userCard" style={{ display: 'flex', paddingBottom: 10 }}>
          <PersonInfo personInfo={userForm} />
          <InterviewTable interviewTableInfo={userForms} />
        </div>
      </Card>
      <Card title="面试者简历" style={{ marginBottom: 10 }}>
        <ResumeCard resumeInfo={resume} />
      </Card>
      <Card title="面试评分">
        <Form
          layout="horizontal"
          form={scoreForm}
          size="large"
          style={{ marginBottom: '10px' }}
          labelCol={{ span: 3 }}
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
          <Form.Item
            label="面评"
            name="comment"
            rules={[{ required: true }, { type: 'string', min: 2, max: 200 }]}
          >
            <Input.TextArea placeholder="请填写面评" style={{ maxWidth: '500px' }} />
          </Form.Item>
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
