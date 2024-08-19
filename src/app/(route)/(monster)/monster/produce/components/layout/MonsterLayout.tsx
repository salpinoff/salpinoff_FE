import { useState, type MouseEvent, type MouseEventHandler } from 'react';

import { motion } from 'framer-motion';

import Button from '@components/common/Button';
import Text from '@components/common/Text';
import FixedBottom from '@components/FixedBottom';

import cn from '@utils/cn';
import stringToElement from '@utils/string-to-element';

import { MonsterLayoutProvider } from '../../context/layout.context';

interface Props extends Omit<React.ComponentProps<'div'>, 'title'> {
  title?: string | string[];
  goNext: MouseEventHandler;
  goPrev?: MouseEventHandler;
  control?: [string, string] | [string];
}

type Callback = (event: MouseEvent<Element>) => Promise<boolean> | void;
type RegisterCallback = (callback: Callback) => void;

function MonsterLayout({
  className,
  children,
  title,
  goPrev,
  goNext,
  control,
}: Props) {
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

  const buttonLabels = control || ['이전으로', '다음으로'];

  return (
    <>
      <div
        className={cn(
          'flex w-full flex-1 flex-col justify-between bg-black p-20 pt-[58px]',
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
          <Text
            component="span"
            weight="semibold"
            variant="heading-1"
            color="strong"
          >
            {title && stringToElement(title)}
          </Text>
        </motion.p>

        <MonsterLayoutProvider value={{ setBtnDisabled, registerCallback }}>
          {children}
        </MonsterLayoutProvider>
      </div>

      <FixedBottom className="left-1/2 flex max-w-[375px] -translate-x-1/2 touch-none gap-8 py-5">
        <Button
          className={cn('flex-1', { hidden: control?.length === 1 })}
          size="medium"
          variant="secondary"
          onMouseDown={goPrev}
        >
          <Text variant="body-2" weight="medium">
            {buttonLabels[0]}
          </Text>
        </Button>
        <Button
          className="w-full flex-1"
          size="medium"
          disabled={disabled}
          onMouseDown={handleNext}
        >
          <Text variant="body-2" weight="semibold">
            {buttonLabels[buttonLabels.length - 1]}
          </Text>
        </Button>
      </FixedBottom>
    </>
  );
}

export default MonsterLayout;
