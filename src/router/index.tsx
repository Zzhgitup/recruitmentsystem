//配置所有路由
import React from 'react';
import { RouteObject } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';
import { StudentApply } from './modules/routes';
const routes: RouteObject[] = [
  // {
  //   path: '/',
  //   element: <Navigate to="/users" />
  // },
  {
    path: '/studentApply',
    element: <StudentApply />
  }
];
export default routes;
