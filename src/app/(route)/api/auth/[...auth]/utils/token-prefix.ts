const tokenPrefix = (token: 'accessToken' | 'refreshToken') => {
  return process.env.NODE_ENV === 'development' ? token : `__Host_${token}`;
};

export default tokenPrefix;
