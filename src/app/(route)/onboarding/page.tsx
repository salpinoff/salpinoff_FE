'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { TouchEventHandler, useState } from 'react';

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
  const [prevPageX, setPrevPageX] = useState<number | null>(null);

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

  const handleTouchMove: TouchEventHandler = (event) => {
    event.preventDefault();

    const touch = event.touches[0]!;

    if (!prevPageX) {
      setPrevPageX(touch.pageX);
    } else if (prevPageX > touch.pageX) {
      // 시작하기 스와이프 X
      if (getIdx(step) !== funnel.length - 1) {
        goNext();
      }
    } else {
      goPrev();
    }
  };

  const handleTouchEnd = () => setPrevPageX(null);

  return (
    <section className="flex h-full w-full select-none flex-col bg-cool-neutral-5">
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => setExit(false)}
      >
        <motion.div
          key={`${step}_container`}
          className="flex h-full w-full grow flex-col items-center justify-center"
          initial={{ x: dir * 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -dir * 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Funnel>
            {funnel.map(({ name, title, image: { src, alt } }) => (
              <Funnel.Step key={name} name={name}>
                <Text
                  className="mt-[55px] whitespace-pre-line leading-[1.6]"
                  component="h3"
                  variant="headline-1"
                  weight="semibold"
                  align="center"
                  color="normal"
                  wrap
                >
                  {title}
                </Text>
                <div className="relative mb-12 mt-16 h-[52.5%] w-full">
                  <Image
                    className="mx-auto object-contain"
                    src={src}
                    alt={alt}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                    priority
                  />
                </div>
              </Funnel.Step>
            ))}
          </Funnel>
        </motion.div>
      </AnimatePresence>
      <DotsPagination
        activeId={step}
        className="mb-[45px] justify-center"
        orderItems={orderItem}
        dir={dir ? 'forward' : 'backward'}
      />
      <nav className="z-10 flex w-full gap-8 p-[20px] pt-0">
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
