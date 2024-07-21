'use client';

import { useEffect } from 'react';
import { Control, Controller, useFormContext, useWatch } from 'react-hook-form';

import TextField from '@components/common/TextField';

import { UserInfo } from '../../../../(auth)/signup/context/context.type';
import useMonsterLayout from '../hooks/useMonsterLayout';

const MAX_LENGTH = 500;

/**
 * Re-rendering 컴포넌트 분리
 */
function HelperText({ control }: { control: Control }) {
  const content = useWatch({
    control,
    name: 'story',
  });

  return (
    <span className="ml-auto block">
      {content.length}/{MAX_LENGTH}
    </span>
  );
}

function WriteStory() {
  const { setBtnDisabled } = useMonsterLayout();

  const {
    control,
    formState: {
      errors: { story },
    },
  } = useFormContext<UserInfo>();

  useEffect(() => {
    setBtnDisabled(!!story);
  }, [story]);

  return (
    <Controller
      name="story"
      rules={{ required: true }}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <TextField
            id="story"
            value={value}
            label="스트레스 상황"
            className="h-[144px]"
            helperText={<HelperText control={control} />}
            placeholder="ex. 오늘도 야근 실화임..? 월세 아까워"
            onChange={onChange}
            maxLength={MAX_LENGTH}
            fullWidth
            multiline
          />
        );
      }}
    />
  );
}

export default WriteStory;
