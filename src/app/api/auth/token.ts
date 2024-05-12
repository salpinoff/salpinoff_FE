import axiosInstance from '@api/api.config';

import type { Providers } from '@type/auth';

export interface Response {
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

type Props = {
  code: string;
  provider: Providers;
};

const requestUserToken = ({ code, provider }: Props) => {
  const path = `/api/v1/members/login/${provider}`;

  return axiosInstance.post<Response>(path, { code });
};

export default requestUserToken;
