export interface TokenResponse {
  memberId: number;
  accessToken: string;
  refreshToken: string;
  username: string;
  /**
   * @description
   * 100 닉네임 설정 false & 몬스터 생성 false
   * 101 닉네임 설정 true & 몬스터 설정 false
   * 102 닉네임 설정 true & 몬스터 설정 true
   */
  code: 100 | 101 | 102;
}

export type Response = {
  accessToken: string;
};

export type Session = Response & {
  status: 'authenticated' | 'unauthenticated' | 'expired';
  userInfo: {
    memberId?: number;
    username?: string;
  };
};
