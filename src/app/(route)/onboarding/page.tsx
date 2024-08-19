'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { findIndex } from 'lodash';

import Button from '@components/common/Button';
import Text from '@components/common/Text';
import DotsPagination from '@components/DotsPagination';

import useFunnel from '@hooks/useFunnel';

import cn from '@utils/cn';

import { init } from '@api/init';

import { funnel } from './constants/funnel';

type OnBoardPages = (typeof funnel)[number]['name'];
type OnBoardFunnelProps = React.PropsWithChildren<{
  name: OnBoardPages;
  description?: string;
}>;

const getIdx = (step: OnBoardPages) => findIndex(funnel, ['name', step]);

function OnBoardingPage() {
  const { push } = useRouter();
  const { Funnel, setStep, step } = useFunnel<OnBoardPages, OnBoardFunnelProps>(
    funnel[0].name,
  );

  const [dir, setDir] = useState(1);
  const [exit, setExit] = useState(false);

  const orderItem = funnel.map(({ name: id }) => ({ id }));

  const goIdx = (idx: number) => {
    if (exit) return;

    if (idx >= 0) {
      if (idx > funnel.length - 1) {
        init().then(() => push('/signin'));
        return;
      }

      setExit(true);
      setStep(funnel[idx].name);
    }
  };

  const goPrev = () => {
    setDir(-1);
    goIdx(getIdx(step) - 1);
  };
  const goNext = () => {
    setDir(+1);
    goIdx(getIdx(step) + 1);
  };

  return (
    <section className="flex h-full w-full select-none flex-col bg-cool-neutral-5">
      <DotsPagination
        activeId={step}
        className="my-[28px] ml-auto w-full flex-none px-20"
        orderItems={orderItem}
        dir={dir ? 'forward' : 'backward'}
      />
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => setExit(false)}
      >
        <motion.div
          key={`${step}_container`}
          className="h-full w-full flex-initial"
          initial={{ x: dir * 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -dir * 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Funnel>
            {funnel.map(
              ({ name, title, image: { src, alt, width, height } }) => (
                <Funnel.Step key={name} name={name}>
                  <Text
                    className="whitespace-pre-line"
                    component="h3"
                    variant="headline-2"
                    weight="semibold"
                    align="center"
                    color="normal"
                    wrap
                  >
                    {title}
                  </Text>
                  <div className="relative flex h-full w-full items-center justify-center px-[56px]">
                    <div className="absolute flex w-auto flex-1 justify-center">
                      <Image
                        className="w-full min-w-max"
                        src={src}
                        alt={alt}
                        width={width}
                        height={height}
                      />
                    </div>
                  </div>
                </Funnel.Step>
              ),
            )}
          </Funnel>
        </motion.div>
      </AnimatePresence>
      <nav className="z-10 flex w-full gap-8 p-[20px]">
        <Button
          className={cn('grow font-medium', {
            hidden: getIdx(step) === 0,
          })}
          size="medium"
          variant="secondary"
          onMouseDown={goPrev}
        >
          이전으로
        </Button>
        <Button
          className="grow font-semibold"
          size="medium"
          onMouseDown={goNext}
        >
          {getIdx(step) === funnel.length - 1 ? '시작하기' : '다음으로'}
        </Button>
      </nav>
    </section>
  );
}

export default OnBoardingPage;
