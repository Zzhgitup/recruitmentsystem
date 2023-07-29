import React from 'react';
import { Image, Empty } from 'antd';

export interface ResumeInfoType {
  id: string;
  userId: number;
  filePath1?: string;
  filePath2?: string;
  createTime: string;
}
interface Props {
  resumeInfo: ResumeInfoType;
}
const ResumeCard: React.FC<Props> = ({ resumeInfo }) => {
  return (
    // <Card title="简历" style={{ marginBottom: 16, width: 450 }}>
    <div style={{ display: 'flex' }}>
      {!resumeInfo.filePath1 && <Empty description="该用户暂无简历" />}
      <Image.PreviewGroup>
        {resumeInfo.filePath1 && (
          <>
            <Image height={150} style={{ paddingRight: 10 }} src={resumeInfo.filePath1} />
          </>
        )}
        {resumeInfo.filePath2 && (
          <>
            <Image height={150} src={resumeInfo.filePath2} />
          </>
        )}
      </Image.PreviewGroup>
    </div>
    //    <p>Created Time: {resumeInfo.createTime}</p>
    //    <p>User ID: {resumeInfo.userId}</p>
    // </Card>
  );
};

export default ResumeCard;
