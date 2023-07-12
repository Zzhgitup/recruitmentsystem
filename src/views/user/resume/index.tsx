import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const Resume: FC<IProps> = () => {
  return <div>resume</div>;
};

export default memo(Resume);
