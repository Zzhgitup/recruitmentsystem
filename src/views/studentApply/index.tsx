import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
interface IProps {
  children?: ReactNode;
}

const StudentApply: FC<IProps> = () => {
  return <div>我是StudentApply</div>;
};
export default memo(StudentApply);
