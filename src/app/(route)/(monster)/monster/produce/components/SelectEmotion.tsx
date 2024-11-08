'use client';

import { ChangeEventHandler, useEffect, useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { cva } from 'class-variance-authority';
import { LazyMotion, domAnimation, m } from 'framer-motion';

import FormControlLabel from '@components/common/FormControlLabel';
import Tooltip from '@components/common/Tooltip';

import cn from '@utils/cn';

import { visible, hidden } from '@constant/animation';

import { EMOTION, DECORATION_TYPE } from '@api/schema/monster';

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

const DEFAULT_BG = {
  [EMOTION.ANGER]: {
    decorationType: DECORATION_TYPE.BACKGROUND_COLOR,
    decorationValue: '#F450A6',
  },
  [EMOTION.DEPRESSION]: {
    decorationType: DECORATION_TYPE.BACKGROUND_COLOR,
    decorationValue: '#4485FD',
  },
};

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
    'relative overflow-hidden cursor-pointer select-none',
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
    setValue,
    formState: { errors, dirtyFields },
  } = useFormContext<UserInfo>();

  const selectedId = useWatch({ control, name: 'emotion' });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setBtnDisabled(!!errors.emotion || selectedId === '');
  }, [selectedId, errors]);

  useEffect(() => {
    if (selectedId) setValue('decorations', [DEFAULT_BG[selectedId]]);
  }, [selectedId]);

  // 선택 이후 앞/뒤로가기 시 툴팁 미노출
  useEffect(() => {
    if (!dirtyFields.emotion) setOpen(true);
  }, []);

  return (
    <fieldset className="flex h-[calc(100%+95px)] w-full flex-col">
      <Tooltip
        open={open}
        label="나의 감정"
        content={`나의 감정 상태에 따라\n다른 형태의 퇴사몬이 등장해요`}
        className="mb-12"
      >
        <Tooltip.Label className="flex-none" />
        <Tooltip.Content className="p-3" />
      </Tooltip>

      <LazyMotion features={domAnimation}>
        <div
          className={cn(
            gridStyles({
              row: 2,
              column: 1,
            }),
            'w-full gap-16',
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
                  // 감정별 기본 배경 색상 지정
                  setValue('decorations', [DEFAULT_BG[id]]);
                };

                return (
                  <m.div
                    initial={open ? 'visible' : 'hidden'}
                    animate="visible"
                    variants={{
                      hidden: { ...hidden, y: 10 },
                      visible: {
                        ...visible,
                        transition: { duration: 0.3 },
                      },
                    }}
                  >
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
                  </m.div>
                );
              }}
            />
          ))}
        </div>
      </LazyMotion>
    </fieldset>
  );
}

export default SelectEmotion;
