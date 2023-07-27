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
    // <Card style={{ width: 300 }} title="面试者信息">
    <Card.Meta
      style={{ marginRight: 30 }}
      // avatar={<Avatar icon={<UserOutlined />} />}
      title={personInfo.username}
      description={
        <>
          <Tag color={personInfo.sex === 1 ? 'blue' : 'pink'}>
            {personInfo.sex === 1 ? '男' : '女'}
          </Tag>
          <Tag color={personInfo.status === 0 ? 'green' : 'grey'}>
            {statusToCh(personInfo.status)}
          </Tag>
          <p>班级：{personInfo.claas}</p>
          {personInfo.firstScore == undefined || <p>一面成绩：{personInfo.firstScore}</p>}
          {personInfo.secondScore == undefined || <p>二面成绩：{personInfo.secondScore}</p>}
          {personInfo.thirdScore == undefined || <p>三面成绩：{personInfo.thirdScore}</p>}
          {personInfo.level == undefined || <p>等级：{personInfo.level}</p>}
        </>
      }
    />
    // </Card>
  );
};

export default PersonInfo;
