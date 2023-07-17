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
    element: <PCreact />
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
