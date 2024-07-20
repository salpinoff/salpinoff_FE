import { useCallback, useEffect } from 'react';
import { SubmitHandler, useFormContext, useFormState } from 'react-hook-form';

import Button from '@components/common/Button';
import BaseText from '@components/common/Text/BaseText';

import stringToElement from '@utils/string-to-element';

import { SendEncouragementRequest } from '@api/encouragement/types';

import EncouragementMessageFormField from './forms/encouragement-message/EncouragementMessageFormField';
import SenderFormField from './forms/sender/SenderFormField';

type FieldValues = Omit<SendEncouragementRequest, 'never'>;

type IncouragementStepProps = {
  goPrev: (data: FieldValues) => void;
  goNext: (data: FieldValues) => void;
};

export default function EncouragementStep({
  goPrev,
  goNext,
}: IncouragementStepProps) {
  const { control, reset, getValues, handleSubmit } =
    useFormContext<FieldValues>();

  const { isValid, isSubmitting, isSubmitSuccessful } = useFormState({
    control,
  });

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    (data) => goNext(data),
    [goNext],
  );

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <section className="flex h-full w-full flex-col items-center justify-between gap-[28px] p-[20px] pt-[36px]">
      <div className="max-w-dvw h-full w-[375px] w-full">
        <BaseText
          className="align-left mb-[40px]"
          component="h3"
          color="normal"
          variant="heading-1"
          weight="semibold"
        >
          {stringToElement(['친구를 위한', '응원 메시지 작성하기'])}
        </BaseText>
        <form
          className="flex w-full flex-col gap-[40px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <SenderFormField />
          <EncouragementMessageFormField />
        </form>
      </div>
      <nav className="flex gap-8">
        <Button variant="secondary" onClick={() => goPrev(getValues())}>
          <BaseText variant="body-2" weight="medium">
            뒤로가기
          </BaseText>
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={!isValid || isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          <BaseText variant="body-2" weight="semibold">
            전송하기
          </BaseText>
        </Button>
      </nav>
    </section>
  );
}
