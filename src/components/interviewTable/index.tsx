import React from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PersonInfoType } from '../PersonInfo';
// import { UserOutlined } from '@ant-design/icons';

export function InterviewToCh(num?: number) {
  switch (num) {
    case 0:
      return '一面';
    case 1:
      return '二面';
    default:
      return '三面';
  }
}

interface TableType {
  level?: string;
  appraise?: string;
  store?: number;
}

const columns: ColumnsType<TableType> = [
  {
    key: 'level',
    title: '面试',
    dataIndex: 'level',
    width: 50
  },
  {
    key: 'store',
    title: '分数',
    dataIndex: 'store',
    width: 50
  },
  {
    key: 'appraise',
    title: '面评',
    dataIndex: 'appraise',
    width: 350
  }
];

const InterviewTable: React.FC<{ interviewTableInfo: PersonInfoType[] }> = ({
  interviewTableInfo
}) => {
  const data: TableType[] = [];
  for (const item of interviewTableInfo) {
    const obj: TableType = {
      level: InterviewToCh(item.level),
      appraise: item.appraise,
      store: 0
    };

    if (item.level == 0) {
      obj.store = item.firstScore;
    } else if (item.level == 1) {
      obj.store = item.secondScore;
    } else if (item.level == 2) {
      obj.store = item.thirdScore;
    } else {
      continue;
    }
    data.push(obj);
  }
  return (
    <>
      <Table
        columns={columns}
        dataSource={data.map((item, index) => ({ ...item, key: index }))}
        size="small"
        pagination={false}
        bordered
        locale={{ emptyText: '暂无面试数据' }}
      />
    </>
  );
};

export default InterviewTable;
