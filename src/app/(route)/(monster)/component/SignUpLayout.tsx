import { MouseEventHandler, PropsWithChildren, useState } from 'react';

import BaseButton from '@components/common/Button/BaseButton';
import BaseText from '@components/common/Text/BaseText';
import FixedBottom from '@components/FixedBottom';

import cn from '@utils/cn';
import stringToElement from '@utils/string-to-element';

import { SignUpProvider } from '../../(auth)/signup/context/layout.context';

type Props = PropsWithChildren<{
  title?: string | string[];
  goNext: MouseEventHandler;
  goPrev?: MouseEventHandler;
  className?: string;
}>;

type RegisterCallback = (callback: MouseEventHandler) => void;

function SignUpLayout({ children, title, goPrev, goNext, className }: Props) {
  const [disabled, setBtnDisabled] = useState(true);
  const [callback, setCallback] = useState<MouseEventHandler>(() => {
    return () => {};
  });

  const registerCallback: RegisterCallback = (cb) => {
    setCallback(() => cb);
  };

  const handleNext: MouseEventHandler = (e) => {
    goNext(e);
    callback(e);
  };

  return (
    <div
      className={cn('flex flex-1 flex-col bg-black p-20 pt-[58px]', className)}
    >
      <BaseText
        weight="semibold"
        variant="heading-1"
        className={cn('touch-auto', 'pb-32 text-white', {
          hidden: !title,
        })}
      >
        {title && stringToElement(title)}
      </BaseText>

      <SignUpProvider value={{ setBtnDisabled, registerCallback }}>
        {children}
      </SignUpProvider>

      <FixedBottom className="flex touch-none gap-8 p-5">
        <BaseButton
          className={cn('flex-1', { hidden: !goPrev })}
          onMouseDown={goPrev}
        >
          뒤로가기
        </BaseButton>
        <BaseButton
          primary
          className="flex-1"
          disabled={disabled}
          onMouseDown={handleNext}
        >
          다음으로
        </BaseButton>
      </FixedBottom>
    </div>
  );
}

export default SignUpLayout;
