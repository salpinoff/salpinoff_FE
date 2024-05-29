export const enum MemberStatusCode {
  New = 100,
  NameAdded = 101,
  MonsterCreated = 102,
}

export interface Member {
  memberId: number;
  accessToken: string;
  refreshToken: string;
  username: string;
  code: keyof typeof MemberStatusCode;
}
