import { useFormContext, useWatch, Control } from 'react-hook-form';

import TextField from '@components/common/TextField';

import { validationPatterns } from '@utils/validate/validationPatterns';

const FORM_FIELD_PROPS = {
  id: 'content',
  label: '응원 메세지',
  placeholder: '짧은 응원도 친구에게 큰 힘이 됩니다',
  required: true,
  maxLength: 500,
} as const;

const REGISTER_NAME = FORM_FIELD_PROPS.id;

const REGISTER_OPTIONS = {
  required: FORM_FIELD_PROPS.required,
  pattern: validationPatterns.encourageMessage,
};

/**
 * Re-rendering 컴포넌트 분리
 */
function HelperText({ control }: { control: Control }) {
  const content = useWatch({
    control,
    name: REGISTER_NAME,
  });

  return (
    <span className="ml-auto block">
      {content.length}/{FORM_FIELD_PROPS.maxLength}
    </span>
  );
}

export default function EncouragementMessageFormField() {
  const { register, control } = useFormContext();

  return (
    <div>
      <TextField
        multiline
        fullWidth
        className="h-[144px]"
        helperText={<HelperText control={control} />}
        {...FORM_FIELD_PROPS}
        {...register(REGISTER_NAME, REGISTER_OPTIONS)}
      />
    </div>
  );
}
