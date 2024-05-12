'use client';

import { AxiosError } from 'axios';

import requestSignIn from '@api/auth/signin';

function KakaoLoginBtn() {
  const handleLogin = async () => {
    requestSignIn({ provider: 'kakao' })
      .then(({ data: { url } }) => {
        window.location.href = url;
      })
      .catch((error: AxiosError<{ errorMessage: string }>) => {
        const errorMessage = error.response?.data.errorMessage;
        console.log(errorMessage);
      });
  };

  return (
    <button
      type="button"
      onClick={handleLogin}
      className="bg-white text-black px-2 py-3"
    >
      카카오톡 로그인
    </button>
  );
}

export default KakaoLoginBtn;
