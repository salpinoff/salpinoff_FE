'use client';

import { ChangeEventHandler, useEffect } from 'react';

import { cva } from 'class-variance-authority';

import FormLabel from '@components/common/FormLabel';
import Tooltip from '@components/common/Tooltip';

import cn from '@utils/cn';

import { EMOTION } from '@api/schema/monster';

import useSignUpContext from '../../(auth)/signup/hooks/useSignUpContext';
import useUserInfoContext from '../../(auth)/signup/hooks/useUserInfoContext';
import useUserInfoDispatchContext from '../../(auth)/signup/hooks/useUserInfoDispatchContext';

const EMOTIONS = [
  {
    id: EMOTION.ANGER,
    label: '분노!!',
    className: 'has-[:checked]:bg-[#F450A6]',
  },
  {
    id: EMOTION.DEPRESSION,
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
  const { emotion } = useUserInfoContext();
  const { update } = useUserInfoDispatchContext();

  const { setBtnDisabled } = useSignUpContext();

  const handleChange: ChangeEventHandler = (e) => {
    const target = e.target as HTMLInputElement;
    const id = target.id as keyof typeof EMOTION;

    update({ emotion: id });
  };

  useEffect(() => {
    setBtnDisabled(emotion === '');
  }, [emotion]);

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
              type="radio"
              id={id}
              name="emotion"
              className="a11yHidden"
              onChange={handleChange}
              checked={emotion === id}
            />
          </FormLabel>
        ))}
      </div>
    </fieldset>
  );
}

export default SelectEmotion;
