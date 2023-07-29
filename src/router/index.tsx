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
import AuthRequired from '@/components/Auth/AuthRequired';
import Testview from '@/views/testview';
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/login" />
  },
  {
    path: '/studentApply',
    element: (
      <AuthRequired requireAuth="2" title="未来软件工作室">
        <StudentApply />
      </AuthRequired>
    )
  },
  {
    path: '/pc',
    element: (
      <AuthRequired requireAuth="2" title="请移步移动端">
        <PCreact />
      </AuthRequired>
    )
  },
  {
    path: '/login',
    element: (
      <AuthRequired requireAuth="2" title="登录后台">
        <Login />
      </AuthRequired>
    )
  },
  {
    path: '/success',
    element: (
      <AuthRequired requireAuth="2" title="报名成功">
        <Success />
      </AuthRequired>
    )
  },
  {
    path: '/textview',
    element: <Testview />
  },
  {
    path: '/user',
    element: (
      <AuthRequired requireAuth="0">
        <User />
      </AuthRequired>
    ),
    children: [
      {
        path: '/user',
        element: (
          <AuthRequired requireAuth="0">
            <QuestionBank />
          </AuthRequired>
        )
      },
      {
        path: '/user/questionBank',
        element: (
          <AuthRequired requireAuth="0">
            <QuestionBank />
          </AuthRequired>
        )
      },
      {
        path: '/user/category',
        element: (
          <AuthRequired requireAuth="0">
            <Category />
          </AuthRequired>
        )
      },
      {
        path: '/user/resume',
        element: (
          <AuthRequired requireAuth="0">
            <Resume />
          </AuthRequired>
        )
      },
      {
        path: '/user/interview',
        element: (
          <AuthRequired requireAuth="0">
            <Interview />
          </AuthRequired>
        )
      },
      {
        path: '/user/interviewee',
        element: (
          <AuthRequired requireAuth="1">
            <Interviewee />
          </AuthRequired>
        )
      },
      {
        path: '/user/excel',
        element: (
          <AuthRequired requireAuth="0">
            <Excel />
          </AuthRequired>
        )
      }
    ]
  },
  {
    path: '/users',
    element: (
      <AuthRequired requireAuth="0">
        <Users />
      </AuthRequired>
    )
  }
];
export default routes;
