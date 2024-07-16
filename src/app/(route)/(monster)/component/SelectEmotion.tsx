'use client';

import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { cva } from 'class-variance-authority';

import FormLabel from '@components/common/FormLabel';
import Tooltip from '@components/common/Tooltip';

import cn from '@utils/cn';

import { Emotion } from '@api/schema/monster';

import type { UserInfo } from '../../(auth)/signup/context/context.type';

import useSignUpContext from '../../(auth)/signup/hooks/useSignUpContext';

const EMOTIONS = [
  {
    id: Emotion.ANGER,
    label: '분노!!',
    className: 'has-[:checked]:bg-[#F450A6]',
  },
  {
    id: Emotion.DEPRESSION,
    label: '우울...',
    className: 'has-[:checked]:bg-blue-60',
  },
];

const gridStyles = cva('grid', {
  variants: {
    row: {
      1: 'grid-rows-1',
      2: 'grid-rows-2',
    },
    column: {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
    },
  },
});

const buttonStyle = cva(
  [
    'cursor-pointer select-none transition-colors	',
    'w-full h-[160px] rounded-20 p-[48px]',
    'flex items-center',
    // default
    'bg-[#70737C1F] text-cool-neutral-90A',
    // :has[:checked]
    'has-[:checked]:!font-bold has-[:checked]:bg-blue-60 has-[:checked]:text-white',
    // important
    '!title-3-regular',
  ],
  {
    variants: {},
    defaultVariants: {},
  },
);

function SelectEmotion() {
  const { setBtnDisabled } = useSignUpContext();
  const {
    register,
    control,
    getValues,
    formState: { errors },
  } = useFormContext<UserInfo>();

  const selectedId = useWatch({ control, name: 'emotion' });

  useEffect(() => {
    setBtnDisabled(!!errors.emotion || getValues('emotion') === '');
  }, [errors]);

  return (
    <fieldset className="flex h-[calc(100%+95px)] w-full flex-col">
      <Tooltip
        label="나의 감정"
        content={`스트레스가 높을수록 퇴사몬을 \n 클리어하기 위해 더 많은 탭이 필요해요`}
        className="mb-12"
      >
        <Tooltip.Label className="flex-none" />
        <Tooltip.Content className="p-3" />
      </Tooltip>

      <div
        className={cn(
          gridStyles({
            row: 2,
            column: 1,
          }),
          'w-full gap-8',
        )}
      >
        {EMOTIONS.map(({ label, id, className }) => (
          <FormLabel key={id} id={id} className={cn(buttonStyle(), className)}>
            {label}
            <input
              id={id}
              type="radio"
              value={id}
              className="a11yHidden"
              checked={selectedId === id}
              {...register('emotion', {
                required: true,
              })}
            />
          </FormLabel>
        ))}
      </div>
    </fieldset>
  );
}

export default SelectEmotion;
