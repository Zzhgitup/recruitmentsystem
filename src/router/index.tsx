//配置所有路由
import React from 'react';
import { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { StudentApply } from './modules/routes';
import PCreact from '@/views/PCreact';
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/studentApply" />
  },
  {
    path: '/studentApply',
    element: <StudentApply />
  },
  {
    path: '/PC',
    element: <PCreact />
  }
];
export default routes;
