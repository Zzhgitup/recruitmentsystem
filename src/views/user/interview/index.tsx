import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const Interview: FC<IProps> = () => {
  return <div>interview</div>;
};

export default memo(Interview);
