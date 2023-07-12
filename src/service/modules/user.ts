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
    url: '/types/type',
    params: data
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
    url: '/questions/question',
    params: data
  });
}
