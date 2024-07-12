const tokenPrefix = (token: 'accessToken' | 'refreshToken' | 'csrfToken') => {
  return process.env.NODE_ENV === 'development' ? token : `__Host_${token}`;
};

export default tokenPrefix;
