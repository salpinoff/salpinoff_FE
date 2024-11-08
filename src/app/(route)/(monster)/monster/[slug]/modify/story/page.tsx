'use client';

import { useRouter } from 'next/navigation';

import { useCallback, useEffect } from 'react';
import { useForm, useWatch, Control } from 'react-hook-form';

import { pick, isEqual } from 'lodash';

import Button from '@components/common/Button';
import Text from '@components/common/Text';
import TextField from '@components/common/TextField';

import useModal from '@hooks/useModal';

import { Adapter } from '@utils/client/adapter';
import transformMonster from '@utils/client/transform-monster';
import { validationPatterns } from '@utils/validate/validationPatterns';

import { useModifyMonster, useMonster } from '@api/monster/query/hooks';
import { ModifyMonsterRequest } from '@api/monster/types';

import ConfirmModal from './components/ConfirmModal';

const FORM_FIELD_PROPS = {
  id: 'content',
  label: '스트레스 상황',
  placeholder: 'ex. 오늘도 야근 실화임..? 월세 아까워',
  required: true,
  maxLength: 500,
} as const;

type FormValues = Omit<ModifyMonsterRequest, 'never'>;

/**
 * Re-rendering 컴포넌트 분리
 */
function HelperText({ control }: { control: Control<FormValues> }) {
  const content = useWatch({
    control,
    name: FORM_FIELD_PROPS.id,
  });

  return (
    <span className="ml-auto block">
      {content.length}/{FORM_FIELD_PROPS.maxLength}
    </span>
  );
}

export default function ModifyStoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug: monsterId } = params;

  const { data: monster } = useMonster(monsterId, {
    select: (data) => Adapter.from(data.data).to(transformMonster),
  });
  const { mutate: modify } = useModifyMonster(monsterId);

  const { replace } = useRouter();

  const { reset, register, handleSubmit, control } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      content: monster?.content || '',
    },
  });

  const { openModal, closeModal } = useModal(() => (
    <ConfirmModal
      onConfirm={() => {
        closeModal();
        replace('/');
      }}
      onCancel={closeModal}
    />
  ));

  const onSubmit = useCallback((data: FormValues) => {
    if (!isEqual(data, pick(monster, ['content'])))
      modify(data, {
        onError: (err) => {
          // TODO
          console.log(err);
        },
      });

    replace('/');
  }, []);

  useEffect(() => {
    if (monster) {
      reset(pick(monster, ['content']));
    }
  }, [monster, reset]);

  return (
    <section className="flex h-full w-full flex-col items-center justify-between gap-[28px] p-20">
      <Text
        component="h3"
        variant="headline-1"
        weight="semibold"
        color="normal"
        align="center"
      >
        내용 수정하기
      </Text>
      <form className="w-full grow" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          multiline
          fullWidth
          className="h-[220px]"
          helperText={<HelperText control={control} />}
          {...FORM_FIELD_PROPS}
          {...register(FORM_FIELD_PROPS.id, {
            required: FORM_FIELD_PROPS.required,
            pattern: validationPatterns.encourageMessage,
          })}
        />
      </form>
      <nav className="flex w-full gap-8">
        <Button variant="secondary" size="medium" onClick={() => openModal()}>
          나가기
        </Button>
        <Button
          variant="primary"
          size="medium"
          onClick={handleSubmit(onSubmit)}
        >
          수정완료
        </Button>
      </nav>
    </section>
  );
}
