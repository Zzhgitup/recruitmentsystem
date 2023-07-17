import React, { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
interface Props {
  children?: ReactNode;
  requireAuth?: 'admin' | 'superadmin';
}

const AuthRequire: FC<Props> = ({ children, requireAuth }) => {
  /*  const { islogin } = useAppselect((state) => ({
    userinfo: state.user.userinfo,
    islogin: state.user.islogin
  })); */
  const location = useLocation(); // 记录当前页面
  if (!localStorage.getItem('ZXtoken')) {
    console.log('没有token');
    return <Navigate to={'/login'} replace state={{ from: location }} />;
  }
  const jwtdecode: any = jwtDecode(localStorage.getItem('ZXtoken') as string);
  //token是否过期
  if (Date.now() / 1000 - jwtdecode.iat < 86400) {
    if (requireAuth === 'admin' || requireAuth === 'superadmin') {
      return <>{children}</>;
      // eslint-disable-next-line no-dupe-else-if
    } else if (requireAuth === 'superadmin' && !isSuperAdmin()) {
      return <Navigate to={'/user/interview'} replace state={{ from: location }} />;
    }
  } else {
    //过期之后则需要重新登录
    return <Navigate to={'/login'} replace state={{ from: location }} />;
  }
  return <>{children}</>;
};

function isSuperAdmin() {
  // 判断是否是超级管理员
  return true;
}

export default React.memo(AuthRequire);
