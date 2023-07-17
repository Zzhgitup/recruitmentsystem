//配置所有路由
import React from 'react';
import { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import {
  StudentApply,
  Login,
  User,
  Users,
  QuestionBank,
  Category,
  Resume,
  Interview,
  Interviewee,
  Success,
  PCreact,
  Excel
} from './modules/routes';
//懒加载组件
const lazyLoad = (moduleName: string) => {
  const Module = React.lazy(() => import(`@/views/${moduleName}`));
  return <Module />;
};
// 路由鉴权组件（核心代码 ）
// children-是props中的属性解构出来的 是组件内部包裹的内容 类似于（Vue中插槽中的内容）
const Appraisal = ({ children }: any) => {
  const token = localStorage.getItem('ZXtoken');
  console.log(token);
  return token != null ? children : <Navigate to="/login" />;
};
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/login" />
  },
  {
    path: '/studentApply',
    element: <StudentApply />
  },
  {
    path: '/pc',
    element: <Appraisal>{lazyLoad('PCreact')}</Appraisal>
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/success',
    element: <Success />
  },
  {
    path: '/user',
    element: <User />,
    children: [
      {
        path: '/user',
        element: <Navigate to="/user/questionBank" />
      },
      {
        path: '/user/questionBank',
        element: <QuestionBank />
      },
      {
        path: '/user/category',
        element: <Category />
      },
      {
        path: '/user/resume',
        element: <Resume />
      },
      {
        path: '/user/interview',
        element: <Interview />
      },
      {
        path: '/user/interviewee',
        element: <Interviewee />
      },
      {
        path: '/user/excel',
        element: <Excel />
      }
    ]
  },
  {
    path: '/users',
    element: <Users />
  }
];
export default routes;
