import { Hyrequire } from '@/service';
export function login(password: string, studentID: string) {
  return Hyrequire.post({
    url: '/user/login',
    params: {
      password: password,
      studentId: studentID
    }
  });
}
