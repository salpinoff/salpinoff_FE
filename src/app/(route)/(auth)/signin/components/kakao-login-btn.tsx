'use client';

import BaseButton from '@components/common/Button/BaseButton';

import cn from '@utils/cn';

import signIn from '../utils/signIn';

type Props = {
  className?: string;
};

function KakaoLoginBtn({ className }: Props) {
  const handleLogin = () => signIn('kakao');

  return (
    <BaseButton
      primary
      type="button"
      onClick={handleLogin}
      className={cn('w-full bg-[#FEE500]', className)}
    >
      카카오톡 로그인
    </BaseButton>
  );
}

export default KakaoLoginBtn;
