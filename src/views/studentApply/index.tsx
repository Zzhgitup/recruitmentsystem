import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { Continer } from './style';
import './css/index.less';
interface IProps {
  children?: ReactNode;
}
const StudentApply: FC<IProps> = () => {
  return (
    <Continer>
      <button className="bt">加速</button>
    </Continer>
  );
};
export default memo(StudentApply);
