const tokenPrefix = (token: 'accessToken' | 'refreshToken' | 'csrfToken') => {
  // return token;
  return process.env.NODE_ENV === 'development' ? token : `__Secure_${token}`;
};

export default tokenPrefix;
