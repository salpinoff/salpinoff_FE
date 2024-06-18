import { useFormContext, useFormState } from 'react-hook-form';

import TextField from '@components/common/TextField';

import { validationPatterns } from '@utils/validate/validationPatterns';

const FORM_FIELD_PROPS = {
  id: 'sender',
  label: '나의 닉네임',
  placeholder: '친구에게 보여질 닉네임을 입력해주세요',
  helperText: '닉네임은 2~6자 이내로 입력해주세요',
  required: true,
} as const;

const REGISTER_NAME = FORM_FIELD_PROPS.id;

const REGISTER_OPTIONS = {
  required: FORM_FIELD_PROPS.required,
  pattern: validationPatterns.name,
};

export default function SenderFormField() {
  const { control, register } = useFormContext();

  const { dirtyFields, errors } = useFormState({
    control,
  });

  return (
    <TextField
      {...FORM_FIELD_PROPS}
      {...register(REGISTER_NAME, REGISTER_OPTIONS)}
      error={!!dirtyFields[REGISTER_NAME] && !!errors[REGISTER_NAME]}
    />
  );
}
