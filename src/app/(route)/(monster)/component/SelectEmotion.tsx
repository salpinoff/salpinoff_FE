'use client';

import { ChangeEventHandler, useEffect } from 'react';

import { cva } from 'class-variance-authority';

import FormLabel from '@components/common/FormLabel';
import FormHelperText from '@components/common/TextField/FormHelperText';

import cn from '@utils/cn';

import { Emotion } from '@api/schema/monster';

import useSignUpContext from '../../(auth)/signup/hooks/useSignUpContext';
import useUserInfoContext from '../../(auth)/signup/hooks/useUserInfoContext';
import useUserInfoDispatchContext from '../../(auth)/signup/hooks/useUserInfoDispatchContext';

const EMOTIONS = [
  ['분노', Emotion.ANGER],
  ['우울', Emotion.DEPRESSION],
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
    'w-full h-[160px] rounded-20',
    'flex justify-center items-center',
    // default
    'bg-[#70737C1F] text-cool-neutral-90A',
    // :has[:checked]
    'has-[:checked]:bg-blue-60 has-[:checked]:text-white',
    // important
    '!heading-1-semibold',
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
    <fieldset className="flex h-max w-full flex-col">
      <FormHelperText component="legend" className="mb-12">
        나의 감정
      </FormHelperText>
      <div
        className={cn(
          gridStyles({
            row: 2,
            column: 1,
          }),
          'h-full w-full gap-8',
        )}
      >
        {EMOTIONS.map(([text, id]) => (
          <FormLabel key={id} id={id} className={buttonStyle()}>
            {text}
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
