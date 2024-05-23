type JWT = {
  lastPasswordResetDate: string;
  sub: string;
  userStatus: number;
  auth: {
    authority: string;
  }[];
  deviceOs: 0 | 1 | 2;
  nickName: string;
  userTypeCd: string;
  storeSeq: number;
  type: number;
  typeDetail: 'APP' | 'WEB';
  userStatusCd: string; // NORMAL
  userSeq: number;
  profileImgUrl: string;
  userType: number;
  exp: number;
  device: string;
  iat: number;
  jti: string;
};

const jwtParse = (jwt: string): JWT => {
  const base64 = Buffer.from(jwt.split('.')[1], 'base64').toString();
  return JSON.parse(base64);
};

export default jwtParse;
