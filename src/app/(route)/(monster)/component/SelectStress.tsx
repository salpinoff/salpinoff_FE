'use client';

import { ChangeEvent, useEffect } from 'react';

import FormHelperText from '@components/common/TextField/FormHelperText';
import Slider from '@components/Slider';

import useSignUpContext from '../../(auth)/signup/hooks/useSignUpContext';
import useUserInfoContext from '../../(auth)/signup/hooks/useUserInfoContext';
import useUserInfoDispatchContext from '../../(auth)/signup/hooks/useUserInfoDispatchContext';

const slider = {
  step: 1,
  min: 1,
  max: 100,
};

function SelectStress() {
  const { min, max, step } = slider;
  const { stress } = useUserInfoContext();
  const { update } = useUserInfoDispatchContext();

  const { setBtnDisabled } = useSignUpContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { value } = target;

    update({ stress: Number(value) });
  };

  useEffect(() => {
    setBtnDisabled(false);
  }, []);

  return (
    <div>
      <FormHelperText className="mb-[30px] block">스트레스 정도</FormHelperText>
      <Slider
        min={min}
        max={max}
        step={step}
        displayInterval
        defaultValue={stress}
        className="mb-48"
        onChange={handleChange}
      />

      <span className="m-auto flex h-[180px] w-[180px] items-center justify-center rounded-circular bg-[var(--color-base-cool-neutral-7)]">
        <span className="display-1-bold text-white">{stress}</span>
      </span>
    </div>
  );
}

export default SelectStress;
