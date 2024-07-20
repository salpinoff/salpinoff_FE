'use client';

import { ChangeEventHandler, useEffect } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { cva } from 'class-variance-authority';

import FormControlLabel from '@components/common/FormControlLabel';
import Tooltip from '@components/common/Tooltip';

import cn from '@utils/cn';

import { EMOTION } from '@api/schema/monster';

import type { UserInfo } from '../../../../(auth)/signup/context/context.type';

import useMonsterLayout from '../hooks/useMonsterLayout';

const EMOTIONS = [
  {
    id: EMOTION.ANGER,
    label: '분노!!',
    className: 'has-[:checked]:bg-[#E6067B] bg-[url("/images/angry.png")]',
  },
  {
    id: EMOTION.DEPRESSION,
    label: '우울...',
    className: 'has-[:checked]:bg-[#086AFD] bg-[url("/images/depressed.png")]',
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
  const { setBtnDisabled } = useMonsterLayout();
  const {
    control,
    formState: { errors },
  } = useFormContext<UserInfo>();

  const selectedId = useWatch({ control, name: 'emotion' });

  useEffect(() => {
    setBtnDisabled(!!errors.emotion || selectedId === '');
  }, [selectedId, errors]);

  return (
    <fieldset className="flex h-[calc(100%+95px)] w-full flex-col">
      <Tooltip
        open
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
          <Controller
            key={id}
            name="emotion"
            control={control}
            render={({ field: { onChange } }) => {
              const handleChange: ChangeEventHandler = () => {
                onChange(id);
              };

              return (
                <FormControlLabel
                  id={id}
                  name="emotion"
                  label={label}
                  checked={selectedId === id}
                  className={cn(buttonStyle(), className)}
                  control={
                    <input
                      type="radio"
                      className="a11yHidden"
                      onChange={handleChange}
                    />
                  }
                />
              );
            }}
          />
        ))}
      </div>
    </fieldset>
  );
}

export default SelectEmotion;
