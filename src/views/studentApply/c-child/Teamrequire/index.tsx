import React, { memo } from 'react';
import { FC, ReactNode } from 'react';
import './css/index.less';
interface Props {
  childern?: ReactNode;
}
const Teamrequire: FC<Props> = () => {
  return (
    <div className="Teamrequire">
      <div className="title">
        <img src="https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/newperson.gif" alt="" />
      </div>
      <div className="backimg"></div>
    </div>
  );
};
export default memo(Teamrequire);
