'use client';

import { ChangeEventHandler, useEffect } from 'react';

import { cva } from 'class-variance-authority';

import FormHelperText from '@components/common/TextField/FormHelperText';

import cn from '@utils/cn';

import useSignUpContext from '../hooks/useSignUpContext';
import useUserInfoContext from '../hooks/useUserInfoContext';

const buttonStyle = cva(
  cn(
    'w-full bg-[#70737C1F] rounded-20 aspect-[335/160] h-auto heading-1-semibold block text-center',
    'flex justify-center items-center',
  ),
  {
    variants: {
      variant: {
        top: 'mb-8',
        bottom: 'mt-8',
      },
      selected: {
        true: 'text-white bg-blue-60',
        false: 'text-cool-neutral-90A',
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

function SelectEmotion() {
  const {
    state: { emotion },
    updater,
  } = useUserInfoContext();

  const { setBtnDisabled } = useSignUpContext();

  const handleChange: ChangeEventHandler = (e) => {
    const target = e.target as HTMLInputElement;
    const id = target.id as 'depressed' | 'angry';

    updater({ payload: { emotion: id } });
  };

  useEffect(() => {
    setBtnDisabled(emotion === '');
  }, [emotion]);

  return (
    <fieldset className="flex flex-col">
      <FormHelperText component="legend" className="mb-12">
        나의 감정
      </FormHelperText>

      <label
        htmlFor="angry"
        className={buttonStyle({
          variant: 'top',
          selected: emotion === 'angry',
        })}
      >
        <span>분노</span>
        <input
          type="radio"
          id="angry"
          name="emotion"
          className="a11yHidden"
          onChange={handleChange}
        />
      </label>

      <label
        htmlFor="depressed"
        className={buttonStyle({
          variant: 'bottom',
          selected: emotion === 'depressed',
        })}
      >
        <span>우울</span>
        <input
          type="radio"
          id="depressed"
          name="emotion"
          className="a11yHidden"
          onChange={handleChange}
        />
      </label>
    </fieldset>
  );
}

export default SelectEmotion;
