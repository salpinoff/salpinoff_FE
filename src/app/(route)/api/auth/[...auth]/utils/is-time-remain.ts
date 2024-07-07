import jwtParse from '@utils/jwt-parse';

const isTimeRemain = (token: string) => {
  const { exp } = jwtParse(token);
  const timeRemaing = exp - Math.floor(new Date().getTime() / 1000);

  return timeRemaing > 0;
};

export default isTimeRemain;
