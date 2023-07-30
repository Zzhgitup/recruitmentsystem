import React, { memo, useRef } from 'react';
import { FC, ReactNode } from 'react';
import useDanerceHook from '@/hooks/useDancer';
interface Props {
  children?: ReactNode;
}
const Testdancer: FC<Props> = () => {
  const button1 = useRef<HTMLButtonElement>(null);
  const { setDanceshow } = useDanerceHook(button1);
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <button ref={button1} style={{ height: '50px', width: '100px', margin: 'auto' }}>
        测试按钮
      </button>
    </div>
  );
};
export default memo(Testdancer);
