import React, { memo } from 'react';
import { FC, ReactNode } from 'react';
import { Result, Space, QRCode } from 'antd';
import { useLocation } from 'react-router-dom';
import './css/index.less';
interface Props {
  childern?: ReactNode;
}
const Success: FC<Props> = () => {
  const {
    state: { flag, text, title }
  } = useLocation();
  /*   const [text, setText] = React.useState('https://ant.design/'); */
  return (
    <div className="success">
      <Result status={flag} title={title} subTitle={text} extra={[]} />
      <div className="successQR">
        <Space direction="vertical" align="center">
          <QRCode value="https://ant.design/" />
          {/*  <Input
            placeholder="-"
            maxLength={60}
            value={text}
            onChange={(e) => setText(e.target.value)}
          /> */}
        </Space>
      </div>
    </div>
  );
};
export default memo(Success);
