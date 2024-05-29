'use client';

import Button from '@components/common/Button';

import cn from '@utils/cn';

import signIn from '../utils/signIn';

type Props = {
  className?: string;
};

function KakaoLoginBtn({ className }: Props) {
  const handleLogin = () => signIn('kakao');

  return (
    <Button
      type="button"
      onClick={handleLogin}
      className={cn('w-full bg-[#FEE500]', className)}
    >
      카카오톡 로그인
    </Button>
  );
}

export default KakaoLoginBtn;
