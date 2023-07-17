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
    element: (
      <AuthRequired requireAuth="admin">
        <User />
      </AuthRequired>
    ),
    children: [
      {
        path: '/user',
        element: (
          <AuthRequired requireAuth="admin">
            <QuestionBank />
          </AuthRequired>
        )
      },
      {
        path: '/user/questionBank',
        element: (
          <AuthRequired requireAuth="admin">
            <QuestionBank />
          </AuthRequired>
        )
      },
      {
        path: '/user/category',
        element: (
          <AuthRequired requireAuth="admin">
            <Category />
          </AuthRequired>
        )
      },
      {
        path: '/user/resume',
        element: (
          <AuthRequired requireAuth="admin">
            <Resume />
          </AuthRequired>
        )
      },
      {
        path: '/user/interview',
        element: (
          <AuthRequired requireAuth="admin">
            <Interview />
          </AuthRequired>
        )
      },
      {
        path: '/user/interviewee',
        element: (
          <AuthRequired requireAuth="admin">
            <Interviewee />
          </AuthRequired>
        )
      },
      {
        path: '/user/excel',
        element: (
          <AuthRequired requireAuth="admin">
            <Excel />
          </AuthRequired>
        )
      }
    ]
  },
  {
    path: '/users',
    element: (
      <AuthRequired requireAuth="admin">
        <Users />
      </AuthRequired>
    )
  }
];
export default routes;
