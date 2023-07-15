import { Hyrequire } from '@/service';
interface Icommit {
  claas: string;
  email: string;
  qqNumber: string;
  sex: number;
  studentId: string;
  username: string;
}
export const commituse = (obj: Icommit) => {
  return Hyrequire.post({
    url: '/user/interviewee',
    params: {
      claas: obj.claas,
      email: obj.email,
      qqNumber: obj.qqNumber,
      sex: obj.sex,
      studentId: obj.studentId,
      username: obj.username
    }
  });
};
