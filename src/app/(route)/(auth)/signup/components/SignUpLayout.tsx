import { useState, type MouseEvent, type MouseEventHandler } from 'react';

import { motion } from 'framer-motion';

import Button from '@components/common/Button';
import BaseText from '@components/common/Text/BaseText';

import cn from '@utils/cn';
import stringToElement from '@utils/string-to-element';

import InitialUserState from './InitialUserState';
import { SignUpProvider } from '../context/layout.context';

interface Props extends Omit<React.ComponentProps<'div'>, 'title'> {
  title?: string | string[];
  goNext: MouseEventHandler;
  goPrev?: MouseEventHandler;
}

type Callback = (event: MouseEvent<Element>) => Promise<boolean> | void;
type RegisterCallback = (callback: Callback) => void;

function SignUpLayout({ className, children, title, goPrev, goNext }: Props) {
  const [disabled, setBtnDisabled] = useState(true);
  const [callback, setCallback] = useState<Callback>(() => {
    return (e: MouseEvent) => {
      goNext(e);
    };
  });

  const registerCallback: RegisterCallback = (cb) => {
    setCallback(() => cb);
  };

  const handleNext: MouseEventHandler = (e) => {
    callback(e)?.then((status) => {
      if (status) goNext(e);
    });
  };

  return (
    <InitialUserState>
      <div
        className={cn(
          'flex w-full flex-1 flex-col justify-between bg-black pt-[30px]',
          className,
        )}
      >
        <motion.p
          className={cn('touch-auto', 'pb-32', {
            hidden: !title,
          })}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
          }}
        >
          <BaseText
            component="span"
            weight="semibold"
            variant="heading-1"
            color="strong"
          >
            {title && stringToElement(title)}
          </BaseText>
        </motion.p>

        <SignUpProvider value={{ setBtnDisabled, registerCallback }}>
          {children}
        </SignUpProvider>
      </div>
      <div className="flex w-full touch-none gap-8">
        <Button
          className={cn({ hidden: !goPrev })}
          size="medium"
          variant="secondary"
          onMouseDown={goPrev}
        >
          이전으로
        </Button>
        <Button className="w-full" disabled={disabled} onMouseDown={handleNext}>
          다음으로
        </Button>
      </div>
    </InitialUserState>
  );
}

export default SignUpLayout;
