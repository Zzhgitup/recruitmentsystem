import { useAppselect } from '@/store';
import React, { memo } from 'react';
import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
interface Props {
  children?: ReactNode;
  requireAuth?: string;
}
const AuthRequire: FC<Props> = (props) => {
  const { children, requireAuth } = props;
  const { islogin } = useAppselect((state) => ({
    userinfo: state.user.userinfo,
    islogin: state.user.islogin
  }));
  const location = useLocation(); //记录当前页面
  if (!islogin) {
    if (requireAuth == 'admin' || requireAuth == 'superadmin') {
      return <Navigate to={'/login'} replace state={{ form: location }} />;
    }
    if (requireAuth == 'superadmin') {
      return <Navigate to={'/user/interview'} replace state={{ form: location }} />;
    }
  }
  return <>{props.children}</>;
};
export default memo(AuthRequire);
