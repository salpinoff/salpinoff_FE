import { useCallback } from 'react';
import { SubmitHandler, useFormContext, useFormState } from 'react-hook-form';

import { motion } from 'framer-motion';

import Button from '@components/common/Button';

import type { FormData } from '../context/form.context';

import EncouragementMessageFormField from './forms/encouragement-message/EncouragementMessageFormField';
import SenderFormField from './forms/sender/SenderFormField';

type IncouragementStepProps = {
  goPrev: () => void;
  goNext: (data: FormData) => void;
};

export default function EncouragementStep({
  goPrev,
  goNext,
}: IncouragementStepProps) {
  const { control, handleSubmit } = useFormContext<FormData>();

  const { isValid, isSubmitting } = useFormState({
    control,
  });

  const handleBack = () => {
    goPrev();
  };

  const onSubmit: SubmitHandler<FormData> = useCallback(
    (data) => goNext(data),
    [goNext],
  );

  const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };

  return (
    <section className="flex h-full w-full flex-col justify-between p-[20px]">
      <div className="h-full w-full">
        <motion.h3
          className="mb-[40px] mt-[36px]"
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          variants={{ visible: { transition: { staggerChildren: 0.5 } } }}
        >
          <motion.span
            className="heading-1-semibold block text-cool-neutral-99"
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible,
            }}
          >
            친구를 위한
          </motion.span>
          <motion.span
            className="heading-1-semibold block text-cool-neutral-99"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible,
            }}
          >
            응원 메시지 작성하기
          </motion.span>
        </motion.h3>
        <form
          className="flex w-full flex-col gap-[40px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <SenderFormField />
          <EncouragementMessageFormField />
        </form>
      </div>
      <nav className="flex w-full gap-8">
        <Button
          className="grow font-medium"
          variant="secondary"
          onClick={handleBack}
        >
          뒤로가기
        </Button>
        <Button
          className="grow font-semibold"
          type="submit"
          variant="primary"
          loading={isSubmitting}
          disabled={!isValid || isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          전송하기
        </Button>
      </nav>
    </section>
  );
}
