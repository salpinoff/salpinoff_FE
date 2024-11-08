type JWT = {
  sub: string;
  username: string;
  authority: 'USER';
  iat: number;
  exp: number;
};

const jwtParse = (jwt: string): JWT => {
  const base64 = Buffer.from(jwt.split('.')[1], 'base64').toString();
  return JSON.parse(base64);
};

export default jwtParse;
