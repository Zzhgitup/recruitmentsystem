import { Hyrequire2 } from '@/service';
export function login(password: string, studentID: string) {
  return Hyrequire2.post({
    url: '/user/login',
    params: {
      password: password,
      studentId: studentID
    }
  });
}
