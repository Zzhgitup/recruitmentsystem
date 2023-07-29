import React from 'react';
//新生报名页面
const StudentApply = React.lazy(() => import('@/views/studentApply'));
//用户登录页面
const Login = React.lazy(() => import('@/views/login'));
//面试官页面
const User = React.lazy(() => import('@/views/user'));
//面试问题管理
const QuestionBank = React.lazy(() => import('@/views/user/questionBank'));
//面试问题分类管理
const Category = React.lazy(() => import('@/views/user/questionBank/category'));
//面试管理
const Interview = React.lazy(() => import('@/views/user/interview'));
//简历管理
const Resume = React.lazy(() => import('@/views/user/resume'));
//面试者管理
const Interviewee = React.lazy(() => import('@/views/user/interviewee'));
//简历管理
const Excel = React.lazy(() => import('@/views/user/interview/excel'));
//简历管理
const Interviewing = React.lazy(() => import('@/views/user/interview/interviewing'));
//电脑端
const PCreact = React.lazy(() => import('@/views/PCreact'));
//通知界面
const Success = React.lazy(() => import('@/views/studentApply/c-child/success'));
export {
  PCreact,
  Success,
  StudentApply,
  Login,
  User,
  Excel,
  QuestionBank,
  Category,
  Interview,
  Resume,
  Interviewee,
  Interviewing
};
