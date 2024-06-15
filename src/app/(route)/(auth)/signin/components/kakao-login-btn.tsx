'use client';

import KakaoSVG from '@public/icons/kakao.svg';

import Button from '@components/common/Button';

import cn from '@utils/cn';

import signIn from '../utils/signIn';

type Props = {
  className?: string;
};

function KakaoLoginBtn({ className }: Props) {
  const handleLogin = () => signIn('kakao');

  return (
    /** kakao_login_medium_wide */
    <Button
      size="small"
      type="button"
      onClick={handleLogin}
      className={cn(
        'flex h-[45px] w-full items-center bg-[#FEE500] px-[14px]',
        className,
      )}
    >
      <KakaoSVG width={18} height={17} />
      <div className="w-full">카카오톡 로그인</div>
    </Button>
  );
}

export default KakaoLoginBtn;
