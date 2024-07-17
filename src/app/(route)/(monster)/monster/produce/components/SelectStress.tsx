'use client';

import { useEffect } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { match } from 'ts-pattern';

import FormHelperText from '@components/common/TextField/FormHelperText';
import Tooltip from '@components/common/Tooltip';
import Slider from '@components/Slider';

import { UserInfo } from '../../../../(auth)/signup/context/context.type';
import useSignUpContext from '../../../../(auth)/signup/hooks/useSignUpContext';

const slider = {
  step: 1,
  min: 1,
  max: 100,
};

const helperText = (stress: number): string => {
  return match(stress)
    .when(
      (value) => value >= 1 && value <= 20,
      () => '살짝 짜증',
    )
    .when(
      (value) => value >= 21 && value <= 40,
      () => '슬슬 지침',
    )
    .when(
      (value) => value >= 41 && value <= 60,
      () => '많이 힘듦',
    )
    .when(
      (value) => value >= 61 && value <= 80,
      () => '한계 도달',
    )
    .otherwise(() => '퇴사 결심');
};

function SelectStress() {
  const { min, max, step } = slider;
  const { setBtnDisabled } = useSignUpContext();
  const { control, getValues } = useFormContext<UserInfo>();

  const stress = useWatch({ control, name: 'stress' });

  useEffect(() => {
    setBtnDisabled(false);
  }, []);

  return (
    <div className="h-[calc(100%+95px)]">
      <Tooltip
        label="스트레스 정도"
        content={`스트레스가 높을수록 퇴사몬을 \n 클리어하기 위해 더 많은 탭이 필요해요`}
        className="mb-[30px]"
      >
        <Tooltip.Label className="flex-none" />
        <Tooltip.Content className="z-10 p-3" />
      </Tooltip>

      <Controller
        name="stress"
        control={control}
        render={({ field: { onChange } }) => {
          return (
            <Slider
              step={step}
              displayInterval
              defaultValue={getValues('stress')}
              onChange={onChange}
              className="mb-48"
              min={min}
              max={max}
            />
          );
        }}
      />

      <span className="m-auto flex h-[180px] w-[180px] flex-col items-center justify-center rounded-circular bg-[var(--color-base-cool-neutral-7)]">
        <span className="display-1-bold text-white">{stress}</span>
        <FormHelperText>{helperText(stress)}</FormHelperText>
      </span>
    </div>
  );
}

export default SelectStress;
