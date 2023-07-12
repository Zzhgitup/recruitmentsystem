import React from 'react';
//新生报名页面
const StudentApply = React.lazy(() => import('@/views/studentApply'));
//用户登录页面
const Login = React.lazy(() => import('@/views/login'));
//面试官页面
const User = React.lazy(() => import('@/views/user'));
//管理员页面
const Users = React.lazy(() => import('@/views/users'));
//面试问题管理
const QuestionBank = React.lazy(() => import('@/views/user/questionBank'));
//面试问题分类管理
const Category = React.lazy(() => import('@/views/user/questionBank/category'));
//面试管理
const Interview = React.lazy(() => import('@/views/user/interview'));
//简历管理
const Resume = React.lazy(() => import('@/views/user/resume'));
export { StudentApply, Login, User, Users, QuestionBank, Category, Interview, Resume };
