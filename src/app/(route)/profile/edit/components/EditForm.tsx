'use client';

import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';

import Button from '@components/common/Button';
import TextField from '@components/common/TextField';
import FixedBottom from '@components/FixedBottom';

import { modifyUserName } from '@api/auth/nickname';

function EditContent() {
  const { replace } = useRouter();

  const {
    register,
    handleSubmit,

    formState: {
      isSubmitting,
      errors: { name },
    },
  } = useForm<{ name: string }>({
    mode: 'all',
    defaultValues: { name: '' },
  });

  const handlModify = handleSubmit(async ({ name: userName }) => {
    try {
      await modifyUserName(userName);
      replace('/');
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <form
      onSubmit={handlModify}
      className="flex h-full w-full flex-col justify-between"
    >
      <TextField
        id="nickName"
        label="닉네임"
        placeholder="닉네임을 입력해주세요"
        helperText="닉네임은 2~6자 아내로 입력해주세요"
        error={!!name}
        {...register('name', { minLength: 2, maxLength: 6, required: true })}
      />

      <FixedBottom className="left-1/2 flex max-w-[375px] -translate-x-1/2 touch-none gap-8 p-5">
        <Button
          type="submit"
          size="medium"
          disabled={!!name}
          className="flex-1"
          variant="primary"
          loading={isSubmitting}
        >
          수정 완료
        </Button>
      </FixedBottom>
    </form>
  );
}

export default EditContent;
