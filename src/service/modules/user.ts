import { Hyrequire } from '..';

//题库分类
export function getTypeById(data: any) {
  return Hyrequire.get({
    url: '/types/type',
    params: data
  });
}

export function getAllType() {
  return Hyrequire.get({
    url: '/types/type'
  });
}

export function typeAdd(data: any) {
  return Hyrequire.post({
    url: '/types/type',
    params: data
  });
}

export function typeUpload(data: any) {
  return Hyrequire.put({
    url: '/types/type',
    params: data
  });
}

export function deleteType(data: any) {
  return Hyrequire.delete({
    url: `/types/type?${data}`
  });
}

//题库管理
export function getQuestionById(data: any) {
  return Hyrequire.get({
    url: '/questions/question',
    params: data
  });
}

export function getAllQuestion(data: any) {
  return Hyrequire.get({
    url: '/questions/page',
    params: data
  });
}

export function QuestionAdd(data: any) {
  return Hyrequire.post({
    url: '/questions/question',
    params: data
  });
}

export function QuestionUpload(data: any) {
  return Hyrequire.put({
    url: '/questions/question',
    params: data
  });
}

export function deleteQuestion(data: any) {
  return Hyrequire.delete({
    url: `/questions/question?${data}`
  });
}

export function randomQuestion(data: any) {
  return Hyrequire.get({
    url: '/questions/random',
    params: data
  });
}

//简历管理
export function allResumePage(data: any) {
  return Hyrequire.get({
    url: '/resume/querry',
    params: data
  });
}

export function resumeById(data: any) {
  return Hyrequire.get({
    url: '/resume/resume',
    params: data
  });
}

export function resumeAdd(params: any, data: any) {
  return Hyrequire.post({
    url: '/resume/resumes',
    params: params,
    data: data
  });
}

export function resumeUpload(params: any, data: any) {
  return Hyrequire.put({
    url: '/resume/resume',
    params: params,
    data: data
  });
}

export function resumeDelete(data: any) {
  return Hyrequire.delete({
    url: `/questions/question?${data}`
  });
}

//面试人员管理
export function allPage(data: any) {
  return Hyrequire.get({
    url: '/admin/allPage',
    params: data
  });
}

export function intervieweeAdd(data: any) {
  return Hyrequire.post({
    url: '/admin/users',
    params: data
  });
}

export function intervieweeUpload(data: any) {
  return Hyrequire.put({
    url: '/admin/users',
    params: data
  });
}

export function intervieweeDelete(data: any) {
  return Hyrequire.delete({
    url: '/admin/users',
    params: data
  });
}

export function usersAddByfile(data: any) {
  return Hyrequire.post({
    url: '/admin/users',
    data: data
  });
}

//普通用户
export function userInfo(data: any) {
  return Hyrequire.get({
    url: '/user/userInfo',
    params: data
  });
}

//面试管理
export function allInterviewPage(data: any) {
  return Hyrequire.get({
    url: '/user/allPeople',
    params: data
  });
}

export function getUserInfoById(data: any) {
  return Hyrequire.get({
    url: '/user/aboutInfo',
    params: data
  });
}

// export function intervieweeAdd( data: any) {
//   return Hyrequire.post({
//     url: '/user/interviewee',
//     data: data,
//   });
// }

export function interviewStatusUpload(params: any) {
  return Hyrequire.put({
    url: '/user/status',
    params: params
  });
}
export function interviewPlaceUpload(params: any) {
  return Hyrequire.put({
    url: '/user/updatePlaceAndTime',
    params: params
  });
}

// export function resumeDelete(data: any) {
//   return Hyrequire.delete({
//     url: `/questions/question?${data}`
//   });
// }

//excel管理
