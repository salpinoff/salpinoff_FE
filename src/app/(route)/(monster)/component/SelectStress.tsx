'use client';

import { ChangeEvent, useEffect } from 'react';

import FormHelperText from '@components/common/TextField/FormHelperText';
import Slider from '@components/Slider';

import useSignUpContext from '../../(auth)/signup/hooks/useSignUpContext';
import useUserInfoContext from '../../(auth)/signup/hooks/useUserInfoContext';

const slider = {
  step: 1,
  min: 1,
  max: 100,
};

function SelectStress() {
  const { min, max, step } = slider;
  const {
    state: { stress },
    updater,
  } = useUserInfoContext();

  const { setBtnDisabled } = useSignUpContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { value } = target;

    updater({ payload: { stress: Number(value) } });
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

      <span className="m-auto flex h-[48vw] w-[48vw] items-center justify-center rounded-circular bg-[var(--color-base-cool-neutral-7)]">
        <span className="display-1-bold text-white">{stress}</span>
      </span>
    </div>
  );
}

export default SelectStress;
