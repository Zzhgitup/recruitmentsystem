import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { Container } from './style';
interface IProps {
  children?: ReactNode;
}

const Login: FC<IProps> = () => {
  return <Container>我是User</Container>;
};
export default memo(Login);
