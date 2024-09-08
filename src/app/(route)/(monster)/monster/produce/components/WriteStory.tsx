'use client';

import { useEffect } from 'react';
import { Control, useFormContext, useWatch } from 'react-hook-form';

import TextField from '@components/common/TextField';

import { validationPatterns } from '@utils/validate/validationPatterns';

import { UserInfo } from '../../../../(auth)/signup/context/context.type';
import useMonsterLayout from '../hooks/useMonsterLayout';

const FORM_FIELD_PROPS = {
  id: 'story',
  label: '스트레스 상황',
  placeholder: 'ex. 오늘도 야근 실화임..? 월세 아까워',
  required: true,
  maxLength: 500,
} as const;

const REGISTER_OPTIONS = {
  required: FORM_FIELD_PROPS.required,
  pattern: validationPatterns.encourageMessage,
};

/**
 * Re-rendering 컴포넌트 분리
 */
function HelperText({ control }: { control: Control<UserInfo> }) {
  const content = useWatch({
    control,
    name: 'story',
  });

  return (
    <span className="ml-auto block">
      {content.length}/{FORM_FIELD_PROPS.maxLength}
    </span>
  );
}

function WriteStory() {
  const { setBtnDisabled } = useMonsterLayout();

  const {
    register,
    control,
    formState: {
      errors: { story },
    },
  } = useFormContext<UserInfo>();

  const storyValue = useWatch({ control, name: 'story' });

  useEffect(() => {
    setBtnDisabled(!storyValue || !!story);
  }, [storyValue]);

  return (
    <TextField
      className="h-[144px]"
      helperText={<HelperText control={control} />}
      fullWidth
      multiline
      {...FORM_FIELD_PROPS}
      {...register(FORM_FIELD_PROPS.id, REGISTER_OPTIONS)}
    />
  );
}

export default WriteStory;
