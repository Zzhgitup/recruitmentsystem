import React from 'react';
import { Card, Tag } from 'antd';
// import { UserOutlined } from '@ant-design/icons';
export interface PersonInfoType {
  id: number;
  claas: string;
  username: string;
  sex: number;
  status: number;
  firstScore?: number;
  secondScore?: number;
  thirdScore?: number;
  level?: number;
  appraise?: string;
}
export function statusToCh(num: number) {
  switch (num) {
    case 0:
      return '待笔试';
    case 1:
      return '笔试未通过';
    case 2:
      return '待面试';
    case 3:
      return '进入二面';
    case 4:
      return '进入三面';
    case 5:
      return '已录取';
    default:
      return '面试未通过';
  }
}
const PersonInfo: React.FC<{ personInfo: PersonInfoType }> = ({ personInfo }) => {
  // console.log(personInfo);

  return (
    <Card.Meta
      style={{ paddingRight: 20, marginRight: 20, borderRight: '1px black dotted' }}
      title={personInfo.username}
      description={
        <>
          <p>
            性别：
            <Tag color={personInfo.sex === 1 ? 'blue' : 'pink'}>
              {personInfo.sex === 1 ? '男' : '女'}
            </Tag>
          </p>
          <p>
            面试：
            <Tag color={personInfo.status === 0 ? 'green' : 'grey'}>
              {statusToCh(personInfo.status)}
            </Tag>
          </p>
          <p>
            班级：<strong>{personInfo.claas}</strong>
          </p>
        </>
      }
    />
  );
};

export default PersonInfo;
