export const enum MemberStatusCode {
  New = 100,
  NameAdded = 101,
  MonsterCreated = 102,
}

export type MemberStatusCodes =
  (typeof MemberStatusCode)[keyof typeof MemberStatusCode];

export interface Member {
  memberId: number;
  accessToken: string;
  refreshToken: string;
  username: string;
  code: MemberStatusCodes;
}
