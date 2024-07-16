'use client';

import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import TextField from '@components/common/TextField';

import { UserInfo } from '../../(auth)/signup/context/context.type';
import useSignUpContext from '../../(auth)/signup/hooks/useSignUpContext';

const MAX_LENGTH = 500;

function WriteStory() {
  const { setBtnDisabled } = useSignUpContext();

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
            helperText={`${value.length}/${MAX_LENGTH}`}
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
