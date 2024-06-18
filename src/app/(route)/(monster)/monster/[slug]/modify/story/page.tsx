'use client';

import { useRouter } from 'next/navigation';

import { useCallback, useEffect } from 'react';
import { useForm, useWatch, Control } from 'react-hook-form';

import { useAtomValue, useSetAtom } from 'jotai';

import { merge, pick, isEqual } from 'lodash';

import Button from '@components/common/Button';
import BaseText from '@components/common/Text/BaseText';
import TextField from '@components/common/TextField';

import useModal from '@hooks/useModal';

import { getQueryClient } from '@utils/query';
import { validationPatterns } from '@utils/validate/validationPatterns';

import { useModifyMonster } from '@api/monster/queries';
import { ModifyMonsterRequest } from '@api/monster/types';

import { idAtom, monsterAtom } from '@store/monsterAtom';

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

  const setId = useSetAtom(idAtom);
  const { data: monster } = useAtomValue(monsterAtom);

  const { replace } = useRouter();

  const { reset, register, handleSubmit, control } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      content: '',
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

  const { mutate: modify } = useModifyMonster(monsterId, {
    onSuccess: (_, variables) => {
      const queryClient = getQueryClient();
      const queryKey = ['monster', monsterId];

      queryClient.setQueryData(queryKey, (oldData: object) =>
        merge(oldData, {
          data: variables,
        }),
      );

      replace('/');
    },
    onError: (error) => {
      // [TODO] 업데이트 에러 처리 (toast...)
      console.log('error :: 업데이트에 실패했어요.', error);
    },
  });

  const onSubmit = useCallback((data: FormValues) => {
    if (isEqual(data, pick(monster, ['content']))) replace('/');
    else modify(data);
  }, []);

  useEffect(() => setId(monsterId));

  useEffect(() => {
    if (monster) {
      reset(pick(monster, ['content']));
    }
  }, [monster, reset]);

  return (
    <>
      <BaseText
        component="h3"
        variant="headline-1"
        weight="semibold"
        color="normal"
        align="center"
      >
        내용 수정하기
      </BaseText>
      <form className="h-full w-full" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          multiline
          fullWidth
          className="h-[144px]"
          helperText={<HelperText control={control} />}
          {...FORM_FIELD_PROPS}
          {...register(FORM_FIELD_PROPS.id, {
            required: FORM_FIELD_PROPS.required,
            pattern: validationPatterns.encourageMessage,
          })}
        />
      </form>
      <nav className="flex gap-8">
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
    </>
  );
}
