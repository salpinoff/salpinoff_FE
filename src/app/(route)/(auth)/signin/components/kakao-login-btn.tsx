'use client';

import KakaoSVG from '@public/icons/kakao.svg';

import Button from '@components/common/Button';

import cn from '@utils/cn';

import useSignIn from '../hooks/useSignin';

type Props = {
  className?: string;
};

function KakaoLoginBtn({ className }: Props) {
  const { mutate: signIn, isPending } = useSignIn('kakao');

  const handleLogin = () => signIn();

  return (
    <Button
      size="medium"
      type="button"
      loading={isPending}
      onClick={handleLogin}
      className={cn(
        'flex w-full items-center bg-[#FEE500] text-[#000000]/85',
        className,
      )}
      aria-label="카카오톡 로그인"
    >
      <KakaoSVG width={18} height={17} />
      <div className="w-full">카카오톡 로그인</div>
    </Button>
  );
}

export default KakaoLoginBtn;
