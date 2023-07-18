import React, { FC, ReactNode, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Button, Result } from 'antd';
interface Props {
  children?: ReactNode;
  requireAuth?: '0' | '1' | '2';
  title?: string;
}

const AuthRequire: FC<Props> = ({ children, requireAuth, title = '未来招新系统' }) => {
  useEffect(() => {
    document.title = title;
  }, []);
  const navgate = useNavigate();
  const location = useLocation(); // 记录当前页
  function backhome() {
    navgate('/user');
  }
  if (requireAuth == '2') {
    //无权限 未登录
    return <>{children}</>;
  }
  if (!localStorage.getItem('ZXtoken')) {
    console.log('没有token');
    return <Navigate to={'/login'} replace state={{ from: location }} />;
  }
  const jwtdecode: any = jwtDecode(localStorage.getItem('ZXtoken') as string);
  //token是否过期
  if (Date.now() / 1000 - jwtdecode.iat < 86400) {
    if (jwtdecode.power === requireAuth || jwtdecode.power == '1') {
      console.log(jwtdecode.power);
      return <>{children}</>;
    }
  } else {
    //过期之后则需要重新登录
    return <Navigate to={'/login'} replace state={{ from: location }} />;
  }
  return (
    <>
      <Result
        status="403"
        title="403"
        subTitle="大二的可能无权限访问此页面"
        extra={
          <Button
            onClick={() => {
              backhome();
            }}
            type="primary"
          >
            返回主页
          </Button>
        }
      />
    </>
  );
};

export default AuthRequire;
