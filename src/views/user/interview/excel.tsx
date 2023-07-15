import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const Excel: FC<IProps> = () => {
  return <div>Excel</div>;
};

export default memo(Excel);
