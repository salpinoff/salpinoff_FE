'use client';

import { ChangeEventHandler, useState } from 'react';

import { cva } from 'class-variance-authority';

import BaseButton from '@components/common/Button/BaseButton';
import BaseText from '@components/common/Text/BaseText';
import FormHelperText from '@components/common/TextField/FormHelperText';
import FixedBottom from '@components/FixedBottom';

import cn from '@utils/cn';

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
  const [selectedId, setSelectedId] = useState('');

  const handleChange: ChangeEventHandler = (e) => {
    const target = e.target as HTMLInputElement;
    const { id } = target;

    setSelectedId(id);
  };

  return (
    <div className="full-height flex flex-col space-y-32">
      <BaseText variant="heading-1" weight="semibold" className="text-white">
        <span className="block">회사일로 스트레스 받을때</span>
        <span>나의 감정은 어땠나요?</span>
      </BaseText>

      <fieldset className="flex flex-col">
        <FormHelperText component="legend" className="mb-12">
          나의 감정
        </FormHelperText>

        <label
          htmlFor="angry"
          className={buttonStyle({
            variant: 'top',
            selected: selectedId === 'angry',
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
            selected: selectedId === 'depressed',
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

      <FixedBottom className="flex space-x-8 p-5">
        <BaseButton className="flex-1">뒤로가기</BaseButton>
        <BaseButton className="flex-1" primary disabled={selectedId === ''}>
          다음으로
        </BaseButton>
      </FixedBottom>
    </div>
  );
}

export default SelectEmotion;
