'use client';

import { ChangeEventHandler, useEffect } from 'react';

import { cva } from 'class-variance-authority';

import FormControlLabel from '@components/common/FormControlLabel';
import Tooltip from '@components/common/Tooltip';

import cn from '@utils/cn';

import { Emotion } from '@api/schema/monster';

import useSignUpContext from '../../(auth)/signup/hooks/useSignUpContext';
import useUserInfoContext from '../../(auth)/signup/hooks/useUserInfoContext';
import useUserInfoDispatchContext from '../../(auth)/signup/hooks/useUserInfoDispatchContext';

const EMOTIONS = [
  {
    id: Emotion.ANGER,
    label: '분노!!',
    className: 'has-[:checked]:bg-[#F450A6] bg-[url("/images/angry.png")]',
  },
  {
    id: Emotion.DEPRESSION,
    label: '우울...',
    className: 'has-[:checked]:bg-blue-60 bg-[url("/images/depressed.png")]',
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
    'relative overflow-hidden cursor-pointer select-none transition-colors',
    'w-full h-[160px] rounded-20 p-[48px]',
    'flex items-center',
    // default
    'isolate bg-[#70737C1F] bg-no-repeat	bg-contain bg-right-bottom text-cool-neutral-80A',
    'after:content-[""] after:absolute after:-z-10 after:opacity-90 after:bg-cool-neutral-15',
    // :has[:checked]
    'has-[:checked]:!font-bold has-[:checked]:bg-blue-60 has-[:checked]:text-white after:w-full after:h-full after:inset-0 has-[:checked]:after:content-none',
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
    const id = target.id as keyof typeof Emotion;

    update({ emotion: id });
  };

  useEffect(() => {
    setBtnDisabled(emotion === '');
  }, [emotion]);

  return (
    <fieldset className="flex h-[calc(100%+95px)] w-full flex-col">
      <Tooltip
        label="나의 감정"
        content={`나의 감정 상태에 따라\n다른 형태의 퇴사몬이 등장해요`}
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
          <FormControlLabel
            key={id}
            id={id}
            name="emotion"
            className={cn(buttonStyle(), className)}
            label={label}
            checked={emotion === id}
            control={
              <input
                type="radio"
                className="a11yHidden"
                onChange={handleChange}
              />
            }
          />
        ))}
      </div>
    </fieldset>
  );
}

export default SelectEmotion;
