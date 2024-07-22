import Image from 'next/image';

import cn from '@utils/cn';

import CsrfTokenInitializer from './components/csrf-initializer';
import KakaoLoginBtn from './components/kakao-login-btn';

const getBgData = () => {
  return Math.random() > 0.5
    ? {
        src: '/images/login_mad.png',
        backgroundColor: 'bg-[#E6057B]',
      }
    : {
        src: '/images/login_sad.png',
        backgroundColor: 'bg-[#4485FD]',
      };
};

function SignIn() {
  const { src, backgroundColor } = getBgData();

  return (
    <div
      className={cn(
        'flex h-dvh w-dvw flex-1 flex-col justify-end p-20',
        'bg-[length:245px_430px] bg-center bg-no-repeat	',
        backgroundColor,
      )}
    >
      <div className="flex h-full w-full flex-col justify-between">
        <Image
          width={245}
          height={430}
          src={src}
          alt="배경 이미지"
          className="m-auto"
        />
        <CsrfTokenInitializer>
          {/* max-w-[iPhone 14 Pro Max] */}
          <KakaoLoginBtn className="mx-auto max-w-[430px]" />
        </CsrfTokenInitializer>
      </div>
    </div>
  );
}

export default SignIn;
