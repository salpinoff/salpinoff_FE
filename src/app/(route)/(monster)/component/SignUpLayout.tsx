import { MouseEventHandler, PropsWithChildren, useState } from 'react';

import BaseButton from '@components/common/Button/BaseButton';
import BaseText from '@components/common/Text/BaseText';
import FixedBottom from '@components/FixedBottom';

import cn from '@utils/cn';
import stringToElement from '@utils/string-to-element';

import useFixedBottom from 'src/app/hooks/useFixedBottom';

import { SignUpProvider } from '../../(auth)/signup/context/layout.context';

type Props = PropsWithChildren<{
  title?: string | string[];
  goNext: MouseEventHandler;
  goPrev?: MouseEventHandler;
  className?: string;
}>;

function SignUpLayout({ children, title, goPrev, goNext, className }: Props) {
  const [bottom] = useFixedBottom();
  const [disabled, setBtnDisabled] = useState(true);

  return (
    <div className={cn('flex flex-1 flex-col bg-black p-20', className)}>
      <BaseText
        weight="semibold"
        variant="heading-1"
        className={cn('touch-none pb-32 text-white', {
          hidden: !title,
        })}
      >
        {title && stringToElement(title)}
      </BaseText>

      <SignUpProvider value={{ setBtnDisabled }}>{children}</SignUpProvider>

      <FixedBottom
        className="flex touch-none space-x-8 p-5"
        style={{ bottom: `${bottom}px` }}
      >
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
          onMouseDown={goNext}
        >
          다음으로
        </BaseButton>
      </FixedBottom>
    </div>
  );
}

export default SignUpLayout;
